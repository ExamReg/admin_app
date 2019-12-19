import React from "react";

import "./course.css";
import {getCourse, getSemester} from "../../api/course-api";


export default class Course extends React.Component {
    constructor(props) {
        super(props);
        this.selectSemester = this.selectSemester.bind(this);
        this.handleGetSemester = this.handleGetSemester.bind(this);
        this.handleGetCourseByIdSemester = this.handleGetCourseByIdSemester.bind(this);

        this.state = {
            courses: [],
            semesters: [],
            idSemester: "1"
        };
    }

    selectSemester(event) {
        const idSems = event.target[event.target.selectedIndex].value;
        this.setState({idSemester: idSems});
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

    async handleGetCourseByIdSemester() {
        const {idSemester} = this.state;
        const res = await getCourse(idSemester);
        if (res.success) {
            this.setState({
                courses: res.data.courses
            });
        } else {
            console.log(res.message)
        }
    }

    componentDidMount() {
        this.handleGetSemester();
        this.handleGetCourseByIdSemester();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.idSemester !== prevState.idSemester) {
            this.handleGetCourseByIdSemester();
        }
    }

    render() {
        return (
            <div className="course">
                <div className="course-header">
                    <div className="course-header-left">
                        <div className="header-items">
                            <input className="input-find" type="text" placeholder="Nhập mã/tên khóa học "/>
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
                        {(this.state.courses || []).map((e, index) => {
                            return (
                                <tr key={index}>
                                    <td>{++index}</td>
                                    <td>{e.id_course}</td>
                                    <td>{e.course_name}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
                <div id="modalAddNewCourse" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Thêm mới khóa học </h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Học kì:</label>
                                    <input type="text" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label>Tên khóa học :</label>
                                    <input type="text" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label>Mã khóa học :</label>
                                    <input type="text" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label>Tệp danh sách khóa học:</label>
                                    <input type="text" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label>Mã số lớp học:</label>
                                    <input type="text" className="form-control"/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-outline-dark btn-size"
                                        data-dismiss="modal">Hủy
                                </button>
                                <button type="button" className="btn btn-primary btn-size">Thêm mới</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}
