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
            idSemester: ""
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
                <div className="title">Quản lý danh sách khóa học </div>
                <div className="course-header">
                    <div className="header-items">
                        <input className="input-find" type="text" placeholder="Nhập mã/tên khóa học "/>
                        <button type="button" className="btn btn-primary">
                            Tìm kiếm
                        </button>
                    </div>
                    <div className="header-items">
                        Học kì
                        <select className="select-item" onChange={this.selectSemester}>
                            <option key="" value="">---</option>
                            {
                                this.state.semesters.map((e, index) => {
                                    return (
                                        <option key={e.id_semester} value={e.id_semester}>{e.value}</option>
                                    );
                                })
                            }
                        </select>
                    </div>
                    <div className="header-items">
                        <button type="button" className="btn btn-primary">
                            + Thêm mới khóa học
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
            </div>
        );
    }
}
