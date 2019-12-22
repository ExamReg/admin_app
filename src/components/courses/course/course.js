import React from "react";
import {NavLink} from "react-router-dom";
import "./course.css";
import qs from "query-string";
import ModelCustom from "../../modal/modal";
import {getCourseInfo, getStudentInCourse, postStudentNotEnoughCondition} from "../../../api/course-api";
import {notification} from "../../../utils/noti";

export default class Course extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id_cs: "",
            course: {
                course_name: ""
            },
            fileStudentEnoughCondition: "",
            students: [],
            reload: false
        };
    }

    async componentDidMount() {
        let a = this.props.location.search;
        let parsed = qs.parse(a);
        const res = await getCourseInfo(parsed.id_cs);
        if (res.success) {
            const result = await getStudentInCourse(parsed.id_cs);
            this.setState({
                id_cs: parsed.id_cs,
                course: res.data.course,
                students: result.data.students
            });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleChange = e => {
        if (e.target.name === "fileStudentEnoughCondition") {
            this.setState({
                [e.target.name]: e.target.files[0]
            });
        } else {
            this.setState({
                [e.target.name]: e.target.value
            });
        }
    };
    handleEditInfoStudent = () => {
        console.log(this.state);
    };
    handleImportFile = async () => {
        if (!this.state.fileStudentEnoughCondition) {
            notification("warning", "Vui lòng chọn 1 file");
        } else {
            let form_data = new FormData();
            form_data.append("file_import", this.state.fileStudentEnoughCondition);
            let result = await postStudentNotEnoughCondition(this.state.id_cs, form_data);
            if (result.success) {
                await this.reloadPage();
                notification("success","Import danh sách sinh viên không đủ điều kiện dự thi thành công.")
            } else {
                notification("error", result.message)
            }
        }
    };

    reloadPage = async () => {
        const result = await getStudentInCourse(this.state.id_cs);
        this.setState({
            students: result.data.students
        });
    };

    render() {
        return (
            <div className="container-course">
                <div className="title">
                    <NavLink to="/dashboard/setting">Quản lý danh sách khóa học </NavLink>

                    <span>/ {this.state.course.course_name}</span>
                    <span className="semester-of-course">
                        {this.state.course.semester}
                    </span>
                </div>
                <div className="course-header">
                    <div className="course-header-left">
                        <div className="header-items">
                            <input
                                className="input-find"
                                type="text"
                                placeholder="Nhập mã/tên sinh viên "
                            />
                        </div>
                        <div className="header-items">
                            <button
                                type="button"
                                className="btn btn-primary btn-size"
                                data-toggle="modal"
                                data-target="#modalImportFile"
                            >
                                <i className="fas fa-plus"/>
                                Nhập file sinh viên
                            </button>
                        </div>
                    </div>
                </div>
                <div className="course-body">
                    <div className="tbl-course">
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th>STT</th>
                                <th>MSSV</th>
                                <th>Họ và tên</th>
                                <th>Trạng thái</th>
                                <th>Hoạt động</th>
                            </tr>
                            </thead>
                            <tbody>
                            {(this.state.students || []).map((e, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{++index}</td>
                                        <td>{e.id_student}</td>
                                        <td>{e.name}</td>
                                        <td>
                                            {e.is_eligible === 1 ? (
                                                <span className="badge badge-success">
                          Đủ điều kiện
                        </span>
                                            ) : (
                                                <span className="badge badge-danger">
                          Không đủ điều kiện
                        </span>
                                            )}
                                        </td>
                                        <td style={{display: "inline-block"}}>
                                            <button className="btn btn-secondary btn-sm btn-space-right">
                                                Kích hoạt
                                            </button>
                                            <button className="btn btn-danger btn-sm btn-space-right">
                                                <i className="fas fa-trash-alt"/>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <ModelCustom
                    acceptButton={this.handleImportFile}
                    idModal="modalImportFile"
                    title="Nhập file danh sách sinh viên đủ điều kiện dự thi"
                    brandButton="Thêm "
                    childrenContent={
                        <div className="form-group">
                            <label>Danh sách sinh viên:</label>
                            <input
                                type="file"
                                className="form-control-file border"
                                name="fileStudentEnoughCondition"
                                onChange={this.handleChange}
                            />
                            <br/>
                            <i style={{color: "red"}}>
                                *Các định dạng cho phép: .xlsx .csv{" "}
                            </i>
                        </div>
                    }
                />
            </div>
        );
    }
}
