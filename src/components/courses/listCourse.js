import React from "react";

import "./listCourse.css";
import {getCourse, getSemester, addNewCourse} from "../../api/course-api";
import {notification} from "../../utils/noti";
import ModelCustom from "../modal/modal";
import Pagination from "../pagination/pagination";
import GetByNumberPages from "../getByNumberPages/getByNumberPages";
import {redirect_to} from "../../utils/redirector";

export default class ListCourse extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            courses: [],
            semesters: [],
            idSemester: "",

            nameCourse: "",
            idCourse: "",
            fileCourse: "",
            idClassCourse: "",
            idSemesterSelect: "",

            checkChangeListCourse: false,

            textSearch: "",
            checkSearch: false,

            page_size: 20,
            page_number: 1,
            page_count: 1,
            next_page: false,
            change_page_size: false,
            keyInput: Math.random().toString(36),
            isOpenAddCourseModal: false,
            loading: false
        };
        this.delayTime = null;
    }

    handleChange = async (e) => {
        if(e.target.name === "fileCourse"){
            this.setState({
                [e.target.name]: e.target.files[0]
            });
        }else{
            this.setState({
                [e.target.name]: e.target.value
            });
        }
    };

    selectSemester = (event)  => {
        const idSems = event.target[event.target.selectedIndex].value;
        this.setState({idSemester: idSems, textSearch: ""});
    };

    selectSemesterInAdd = (event) => {
        const idSems = event.target[event.target.selectedIndex].value;
        this.setState({idSemesterSelect: idSems});
    };
    deleteData = () =>{
        this.setState({
            nameCourse: "",
            idCourse: "",
            fileCourse: "",
            idClassCourse: "",
            idSemesterSelect: "",
            keyInput: Math.random().toString(36),
            isOpenAddCourseModal: false
        });
    };
    handleGetSemester = async () => {

    };

    handleAddNewCourse = async () => {
        const {nameCourse, idCourse, fileCourse, idClassCourse, idSemesterSelect} = this.state;
        this.setState({
            loading: true
        });
        if (nameCourse && idCourse && fileCourse && idClassCourse && idSemesterSelect) {
            let form_data = new FormData();
            form_data.append("id_semester", idSemesterSelect);
            form_data.append("course_name", nameCourse);
            form_data.append("id_course", idCourse);
            form_data.append("file_import", fileCourse);
            form_data.append("class_number", idClassCourse);
            const res = await addNewCourse(form_data);
            if (res.success) {
                notification("success", "Thêm mới khóa học thành công");
                this.setState({
                    checkChangeListCourse: true,
                    nameCourse: "",
                    idCourse: "",
                    fileCourse: "",
                    idClassCourse: "",
                    idSemesterSelect: "",
                    loading: false,
                    isOpenAddCourseModal: false
                })
            } else {
                notification("error", res.message);
            }
        } else {
            notification("warning", "Xin điền đủ thông tin ")
        }
    };

    handleGetCourse = () => {
        const {textSearch, idSemester, page_size, page_number} = this.state;
        clearTimeout(this.delayTime);
        this.delayTime = setTimeout(async () => {
            const res = await getCourse({
                text: textSearch,
                id_semester: idSemester,
                page_number: page_number - 1,
                page_size: page_size
            });
            if (res.success) {
                this.setState({
                    courses: res.data.courses,
                    page_number: 1,
                    page_count: Math.ceil(res.data.count / page_size),
                    checkChangeListCourse: false,

                });
            } else {
                console.log(res.message)
            }
        }, 500);

    };

    async componentDidMount() {
        let result = await getSemester();
        if (result.success && result.data.semesters.length > 0) {
            const res = await getCourse({
                id_semester: result.data.semesters[0].id_semester,
                page_number: this.state.page_number - 1,
                page_size: this.state.page_size
            });
            if (res.success) {
                this.setState({
                    courses: res.data.courses,
                    page_number: 1,
                    page_count: Math.ceil(res.data.count / this.state.page_size),
                    semesters: result.data.semesters,
                    idSemester: result.data.semesters[0].id_semester
                });
            } else {
                console.log(res.message)
            }
        } else {
            console.log(result.message)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ((this.state.idSemester !== prevState.idSemester && this.state.semesters.length === prevState.semesters.length) || this.state.textSearch !== prevState.textSearch) {
            this.handleGetCourse();
        }
        if (this.state.next_page) {
            this.reloadWhenNextPage()
        }
        if (this.state.checkChangeListCourse) {
            this.handleGetCourse();
        }
        if (this.state.change_page_size) {
            this.reloadWhenChangePageSize();
        }
    }
    changePageSize = (event) => {
        this.setState({
            page_size: event.target.value,
            change_page_size: true,
            page_number: 1
        })
    };
    chosePage = (event) => {
        this.setState({
            page_number: Number(event.target.id),
            next_page: true
        });
    };
    reloadWhenNextPage = async () => {
        let query = {
            page_size: this.state.page_size,
            page_number: this.state.page_number - 1,
            text: this.state.textSearch,
            id_semester: this.state.idSemester
        };
        const response = await getCourse(query);
        if (response.success) {
            this.setState({
                courses: response.data.courses,
                next_page: false,
            });
        } else {
            console.log(response.message);
        }
    };

    reloadWhenChangePageSize = async () => {
        let query = {
            page_size: this.state.page_size,
            page_number: 0,
            text: this.state.textSearch,
            id_semester: this.state.idSemester
        };
        const response = await getCourse(query);
        if (response.success) {
            this.setState({
                courses: response.data.courses,
                change_page_size: false,
                page_count: Math.ceil(response.data.count / this.state.page_size)
            });
        } else {
            console.log(response.message);
        }
    };

    settingCourse = (id_cs, course_name) => {
        redirect_to(`/dashboard/courses/setting?id_cs=${id_cs}&course_name=${course_name}`)
    };
    render() {
        return (
            <div className="list-course">
                <div className="title">
                    Quản lý danh sách môn học
                </div>
                <div className="list-course-header">

                    <div className="list-course-header-left">
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
                                            <option key={e.id_semester} value={e.id_semester} name={e.value}>{e.value}</option>
                                        );
                                    })
                                }
                            </select>
                        </div>

                    </div>
                    <div className="list-course-header-right">
                        <div className="header-items btn-flex-right">
                            <button type="button" className="btn btn-primary btn-size" onClick={() => this.setState({isOpenAddCourseModal: true})}>
                                <i className="fas fa-plus"/>
                                Thêm mới khóa học
                            </button>
                        </div>
                        <Pagination changePageSize={this.changePageSize} page_size={this.state.page_size}/>
                    </div>
                </div>
                <div className="list-course-content">
                    <div className="table-list-course">
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
                                                <td><button  type="button" className="btn btn-success btn-sm " onClick={() => {this.settingCourse(e.id_cs, e.course_name)}}>
                                                    Cài đặt
                                                </button></td>
                                            </tr>
                                        );
                                    })

                            }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="list-course-bottom">
                    <GetByNumberPages chosePage={this.chosePage} pageNumbers={this.state.page_count}
                                      currentPage={this.state.page_number}/>
                </div>
                <ModelCustom
                    idModal="modalAddNewCourse"
                    title="Thêm mới khóa học "
                    brandButton="Thêm mới "
                    acceptButton={this.handleAddNewCourse}
                    cancelButton={this.deleteData}
                    isOpen={this.state.isOpenAddCourseModal}
                    loading={this.state.loading}
                    childrenContent={
                        <div>
                            <div className="form-group">
                                <label>Học kì:</label>
                                <div className="dropdown">
                                    <select className="select-item-form" onChange={this.selectSemesterInAdd} disabled={this.state.loading} value={this.state.idSemesterSelect}>
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
                            <div className="form-group" >
                                <label>Tên khóa học :</label>
                                <input type="text" className="form-control" name="nameCourse"
                                       onChange={this.handleChange} value={this.state.nameCourse} disabled={this.state.loading}/>
                            </div>
                            <div className="form-group">
                                <label>Mã khóa học :</label>
                                <input type="text" className="form-control" name="idCourse"
                                       onChange={this.handleChange} value={this.state.idCourse} disabled={this.state.loading}/>
                            </div>
                            <div className="form-group">
                                <label>Tệp danh sách khóa học:</label>
                                <input type="file" className="form-control-file border" name="fileCourse" key={this.state.keyInput}
                                       onChange={this.handleChange} disabled={this.state.loading}/>
                                <i style={{color: "red"}}>*Các định dạng cho phép: .xlsx .csv </i>
                            </div>
                            <div className="form-group">
                                <label>Mã số lớp học:</label>
                                <input type="text" className="form-control" name="idClassCourse"
                                       onChange={this.handleChange} value={this.state.idClassCourse} disabled={this.state.loading}/>
                            </div>
                        </div>
                    }
                />
            </div>
        );
    }
};
