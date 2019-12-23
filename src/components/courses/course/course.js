import React from "react";
import {NavLink} from "react-router-dom";
import "./course.css";
import qs from "query-string";
import ModelCustom from "../../modal/modal";
import {
    getCourseInfo,
    getStudentInCourse,
    postStudentNotEnoughCondition,
    addStudentToCourse
} from "../../../api/course-api";
import {notification} from "../../../utils/noti";
import {
    changeStatusStudentInCourse,
    removeStudentFromCourse
} from "../../../api/student-api";
import ConfirmModal from "../../confirmModal/confirmModal";

export default class Course extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id_cs: "",
            course: {
                course_name: ""
            },
            textSearch: "",
            fileStudentEnoughCondition: "",
            students: [],
            reload: false,
            keyInput: Math.random().toString(36),
            isOpenImportFileModal: false,
            isOpenCreateStudentModal: false,


            isOpenConfirm:false,
            isStudentDel:"",

            idStuAdd:""
        };
        this.delayTime = null;
    }

    async componentDidMount() {
        let a = this.props.location.search;
        let parsed = qs.parse(a);
        const res = await getCourseInfo(parsed.id_cs);
        if (res.success) {
            const result = await getStudentInCourse(parsed.id_cs, {});
            this.setState({
                id_cs: parsed.id_cs,
                course: res.data.course,
                students: result.data.students
            });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.reload) {
            this.reloadPage();
        }
        if (this.state.textSearch !== prevState.textSearch) {
            this.handleTimeOut(300);
        }
    }

    addStudent = async () => {
        let {idStuAdd} = this.state;
        if (!idStuAdd) {
            notification("warning", "Vui lòng điền đầy đủ thông tin.");
        } else {
            let data = {
                id_student: this.state.idStuAdd
            };
            const res2 = await addStudentToCourse(this.state.id_cs,data);
            if(res2.success){
                notification("success","Thêm sinh viên thành công")
                this.reloadPage();
            }
        }
    };

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
    changeStatus = async (id_student, is_eligible) => {
        let result = await changeStatusStudentInCourse(
            {
                id_student,
                id_cs: this.state.id_cs
            },
            {is_eligible: !is_eligible}
        );
        if (result.success) {
            this.setState({
                reload: true
            });
        }
    };


    handleImportFile = async () => {
        if (!this.state.fileStudentEnoughCondition) {
            notification("warning", "Vui lòng chọn 1 file");
        } else {
            this.setState({loading: true});
            let form_data = new FormData();
            form_data.append("file_import", this.state.fileStudentEnoughCondition);
            let result = await postStudentNotEnoughCondition(
                this.state.id_cs,
                form_data
            );
            if (result.success) {
                this.setState({loading: false});
                await this.reloadPage();
                notification(
                    "success",
                    "Import danh sách sinh viên không đủ điều kiện dự thi thành công."
                );
            } else {
                notification("error", result.message);
            }
        }
    };
    reloadPage = async () => {
        const result = await getStudentInCourse(this.state.id_cs, {text: this.state.textSearch});
        this.setState({
            students: result.data.students,
            reload: false,
            isOpenImportFileModal: false,
            isOpenCreateStudentModal: false
        });
    };

    handleTimeOut = timeDelay => {
        clearTimeout(this.delayTime);
        this.delayTime = setTimeout(async () => {
            this.setState({
                reload: true
            });
        }, timeDelay);
    };
    toggleExit = () =>{
        this.setState({
            isOpenConfirm: !this.state.isOpenConfirm
        });
    };
    toggleConfirmDel = (id_student) =>{
        this.setState({
            idStudentDel: id_student,
            isOpenConfirm: !this.state.isOpenConfirm
        });
    };
    deleteData = () => {
        this.setState({
            fileStudentEnoughCondition: null,
            keyInput: Math.random().toString(36),
            isOpenImportFileModal: false,
            isOpenCreateStudentModal: false
        });
    };


    removeStudentFromCourse = async () => {
        const {idStudentDel} = this.state;
        let result = await removeStudentFromCourse({
            id_student: idStudentDel,
            id_cs: this.state.id_cs
        });
        if (result.success) {
            notification("success", "Xoá sinh viên ra khỏi môn học thành công.");
            this.setState({
                reload: true,
                isOpenConfirm: false
            });
        } else {
            notification("error", result.message);
        }
    };

    render() {
        return (
            <div className="container-course">
                <div className="title">
                    <NavLink to="/dashboard/setting">Quản lý danh sách khóa học </NavLink>

                    <span>/ {this.state.course.course_name}</span>
                    <span className="semester-of-course">{this.state.course.semester}</span>
                </div>
                <div className="course-header">
                    <div className="course-header-left">
                        <div className="header-items">
                            <input
                                className="input-find"
                                type="text"
                                placeholder="Nhập mã/tên sinh viên "
                                value={this.state.textSearch}
                                onChange={this.handleChange}
                                name="textSearch"
                            />
                        </div>
                        <div className="header-items">
                            <button
                                type="button"
                                className="btn btn-primary btn-size"
                                onClick={() => this.setState({isOpenImportFileModal: true})}
                            >
                                <i className="fas fa-plus"/>
                                Nhập file sinh viên
                            </button>
                        </div>
                    </div>
                    <div className="course-header-right">
                        <div className="header-items">
                            <button
                                type="button"
                                className="btn btn-primary btn-size"
                                onClick={() => this.setState({isOpenCreateStudentModal: true})}
                            >
                                <i className="fas fa-plus"/>
                                Thêm sinh viên
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
                                            <button
                                                className="btn btn-secondary btn-sm btn-space-right"
                                                onClick={() => {
                                                    this.changeStatus(e.id_student, e.is_eligible);
                                                }}
                                            >
                                                Đổi trạng thái
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm btn-space-right"
                                                onClick={() => {
                                                    this.toggleConfirmDel(e.id_student);
                                                }}
                                            >
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
                    idModal="modalAddStudent"
                    title="Nhập thông tin sinh viên"
                    brandButton="Thêm"
                    acceptButton={this.addStudent}
                    cancelButton={this.deleteData}
                    isOpen={this.state.isOpenCreateStudentModal}
                    childrenContent={
                        <div>
                            <div className="form-group">
                                <label>MSSV :</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="idStuAdd"
                                    onChange={this.handleChange}
                                    value={this.state.idStuAdd}/>
                            </div>
                        </div>
                    }
                />

                <ModelCustom
                    acceptButton={this.handleImportFile}
                    idModal="modalImportFile"
                    title="Nhập file danh sách sinh viên đủ điều kiện dự thi"
                    brandButton="Thêm"
                    cancelButton={this.deleteData}
                    isOpen={this.state.isOpenImportFileModal}
                    loading={this.state.loading}
                    childrenContent={
                        <div className="form-group">
                            <label>Danh sách sinh viên:</label>
                            <input
                                type="file"
                                className="form-control-file border"
                                name="fileStudentEnoughCondition"
                                onChange={this.handleChange}
                                key={this.state.keyInput}
                                disabled={this.state.loading}
                            />
                            <br/>
                            <i style={{color: "red"}}>
                                *Các định dạng cho phép: .xlsx .csv{" "}
                            </i>
                        </div>
                    }
                />
                <ConfirmModal onClose={this.toggleExit}
                              onPress={this.removeStudentFromCourse}
                              brandButton={"Đồng ý "}
                              show={this.state.isOpenConfirm}
                              childrenContent={
                                  <div className="modal-contentt">
                                      <div>Bạn có chắc chắn xóa không?</div>
                                      <i className="fas fa-times-circle" style={{color:"red", fontSize:"30px"}}></i>
                                  </div>
                              }
                />
            </div>
        );
    }
}
