import React from "react";

import "./course.css";
import {getCourse, getSemester, addNewCourse} from "../../api/course-api";
import {notification} from "../../utils/noti";
import Modal from "../modal/modal";


export default class Course extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.selectSemester = this.selectSemester.bind(this);
        this.selectSemesterInAdd = this.selectSemesterInAdd.bind(this);
        this.handleGetSemester = this.handleGetSemester.bind(this);
        this.handleGetCourseByIdSemester = this.handleGetCourseByIdSemester.bind(this);
        this.handleAddNewCourse = this.handleAddNewCourse.bind(this);
        this.getListCourseBySearchText = this.getListCourseBySearchText.bind(this);

        this.state = {
            courses: [],
            semesters: [],
            idSemester: "1",

            nameCourse: "",
            idCourse: "",
            fileCourse: "",
            idClassCourse: "",
            idSemesterSelect: "",

            checkChangeListCourse: false,

            textSearch: "",
            checkSearch: false

        };
        this.delayTime = null;
    }

    handleChange(e) {
        let nam = e.target.name;
        let val = e.target.value;
        this.setState({[nam]: val})
    }

    selectSemester(event) {
        const idSems = event.target[event.target.selectedIndex].value;
        this.setState({idSemester: idSems, textSearch: ""});
    }

    selectSemesterInAdd(event) {
        const idSems = event.target[event.target.selectedIndex].value;
        this.setState({idSemesterSelect: idSems});
    }

    async handleGetSemester() {
        let res = await getSemester();
        if (res.success) {
            this.setState({
                semesters: res.data.semesters
            });
        } else {
            console.log(res.message)
        }
    }

    handleGetCourseByIdSemester = async ()=>{
        const {idSemester} = this.state;
        const res = await getCourse(idSemester, "");
        if (res.success) {
            this.setState({
                courses: res.data.courses
            });
        } else {
            console.log(res.message)
        }
    };

    async handleAddNewCourse() {
        const {nameCourse, idCourse, fileCourse, idClassCourse, idSemesterSelect} = this.state;
        if (nameCourse && idCourse && fileCourse && idClassCourse && idSemesterSelect) {
            let form_data = new FormData();
            form_data.append("semester", idSemesterSelect);
            form_data.append("course_name", nameCourse);
            form_data.append("id_course", idCourse);
            form_data.append("file_import", fileCourse);
            form_data.append("class_number", idClassCourse);
            const res = await addNewCourse(form_data);
            if (res.success) {
                notification("success", "Thêm mới khóa học thành công");
                this.setState({checkChangeListCourse: true})
            } else
                console.log(res.message)
        } else {
            notification("warning", "Xin điền đủ thông tin ")
        }
    }

    getListCourseBySearchText() {
        const {textSearch, idSemester} = this.state;
        clearTimeout(this.delayTime);
        this.delayTime = setTimeout(async () => {
            const res = await getCourse(idSemester, textSearch);
            if (res.success) {
                this.setState({
                    courses: res.data.courses
                });
                console.log(this.state.courses)
            } else {
                console.log(res.message)
            }
        }, 500);

    }

    componentDidMount() {
        this.handleGetSemester();
        this.handleGetCourseByIdSemester();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.idSemester !== prevState.idSemester) {
            this.handleGetCourseByIdSemester();
        }
        if (this.state.checkChangeListCourse) {
            this.handleGetCourseByIdSemester();
            this.setState({checkChangeListCourse: false})
        }
        if (this.state.textSearch !== prevState.textSearch) {
            this.getListCourseBySearchText();
        }
    }

    render() {
        return (
            <div className="course">
                <div className="title">
                    Quản lý danh sách khóa học
                </div>
                <div className="course-header">

                    <div className="course-header-left">
                        <div className="header-items">
                            <input className="input-find" type="text" placeholder="Nhập mã/tên khóa học "
                                   name="textSearch" onChange={this.handleChange} value={this.state.textSearch}/>
                        </div>
                        <div className="header-items">
                            Học kì
                            <select className="select-item" onChange={this.selectSemester}>
                                {
                                    this.state.semesters.map((e, index) => {
                                        return (
                                            <option key={e.id_semester} value={e.id_semester}>{e.value}</option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="course-header-right">
                        <button type="button" className="btn btn-primary btn-size header-items" data-toggle="modal"
                                data-target="#modalAddNewCourse">
                            <i className="fas fa-plus"></i>
                            Thêm mới khóa học
                        </button>
                    </div>
                </div>
                <div className="course-content">
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã số khóa học</th>
                            <th>Tên khóa học</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.courses.length === 0
                                ?
                                <tr key={0}>
                                    <td colSpan={3}><i>Không có kết quả tìm tiếm nào phù hợp</i></td>
                                </tr>
                                :

                                    this.state.courses.map((e, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{++index}</td>
                                                <td>{e.id_course}</td>
                                                <td>{e.course_name}</td>
                                            </tr>
                                        );
                                    })

                        }
                        </tbody>
                    </table>
                    <Modal
                        idModal="modalAddNewCourse"
                        title="Thêm mới khóa học "
                        brandButton="Thêm mới "
                        acceptButton={this.handleAddNewCourse}
                        childrenContent={
                            <div>
                                <div className="form-group">
                                    <label>Tên khóa học :</label>
                                    <input type="text" className="form-control" name="nameCourse"
                                           onChange={this.handleChange}/>
                                </div>
                                <div className="form-group">
                                    <label>Mã khóa học :</label>
                                    <input type="text" className="form-control" name="idCourse"
                                           onChange={this.handleChange}/>
                                </div>
                                <div className="form-group">
                                    <label>Tệp danh sách khóa học:</label>
                                    <input type="file" className="form-control-file border" name="fileCourse"
                                           onChange={this.handleChange}/>
                                </div>
                                <div className="form-group">
                                    <label>Mã số lớp học:</label>
                                    <input type="text" className="form-control" name="idClassCourse"
                                           onChange={this.handleChange}/>
                                </div>
                                <div className="form-group">
                                    <label>Học kì:</label>
                                    <div className="dropdown">
                                        <select className="select-item-form" onChange={this.selectSemesterInAdd}>
                                            <option key="" value="">---</option>
                                            {
                                                this.state.semesters.map((e, index) => {
                                                    return (
                                                        <option key={e.id_semester}
                                                                value={e.id_semester}>{e.value}</option>
                                                    );
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        }
                    />
                </div>
            </div>
        );
    }
};
