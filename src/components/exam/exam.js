import React from "react"
import "./exam.css"
import DatePickerCustom from "../datepicker/datepicker"
import moment from "moment";
import {getSemester, getCourse} from "../../api/course-api";
import {addNewExam, getExams} from "../../api/exam-api";
import Pagination from "../pagination/pagination";
import ModelCustom from "../modal/modal";
import {notification} from "../../utils/noti";
import {getListRoom} from "../../api/room-api";


class Exam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: "",
            endDate: "",
            data: null,

            semesters: [],
            idSemester: "",
            textSearch: "",
            exams: [],
            checkChangeExams: false,

            totalStudentAdd: "",
            timeStartAdd: "",
            timeEndAdd: "",
            idCourseAdd: "",
            idRoomAdd: "",
            idSemesterAdd: "",
            courses: [],
            rooms: []

        }
    }
    deleteData  = () =>{
        this.setState({
            totalStudentAdd: "",
            timeStartAdd: "",
            timeEndAdd: "",
            idCourseAdd: "",
            idRoomAdd: "",
            idSemesterAdd: ""
        })
    }
    handleChange = e => {
        if (e.target.name === "fileStudents") {
            this.setState({
                [e.target.name]: e.target.files[0]
            });
        } else {
            this.setState({
                [e.target.name]: e.target.value
            });
        }
        console.log("hello")
    };
    handleChangeDate = (date, column_state) => {
        const valueOfInput = moment(date).valueOf();
        this.setState({
            [column_state]: valueOfInput
        });
    };
    selectSemester = (event) => {
        const idSems = event.target[event.target.selectedIndex].value;
        console.log(idSems);
        this.setState({idSemester: idSems, textSearch: ""});
    };
    selectCourseInAdd = (event) => {
        const idcs = event.target[event.target.selectedIndex].value;
        this.setState({idCourseAdd: idcs});
    };
    selectRoomInAdd = (event) => {
        const idroom = event.target[event.target.selectedIndex].value;
        this.setState({idRoomAdd: idroom});
    };
    handleGetSemester = async () => {
        let res = await getSemester();
        if (res.success && res.data.semesters.length > 0) {
            let result = await getCourse({id_semester: res.data.semesters[0].id_semester, page_size: 10000});
            this.setState({
                semesters: res.data.semesters,
                idSemester: res.data.semesters[0].id_semester,
                courses: result.data.courses
            });
        } else {
            console.log(res.message)
        }
    };
    handleGetCourse = async () => {
        let query = {
            page_size: 10000,
            page_number: 0,
            id_semester: this.state.idSemesterAdd
        };
        const res = await getCourse(query);

        if (res.success) {
            this.setState({courses: res.data.courses})
        } else {
            notification("error", res.message)
        }
    };
    handleGetRooms = async () => {
        const res = await getListRoom(this.state.totalStudentAdd);
        if (res.success) {
            this.setState({rooms: res.data.rooms})
        }
    };
    handleGetExams = async () => {
        const {idSemester} = this.state;
        const res = await getExams(idSemester, "");
        if (res.success) {
            this.setState({exams: res.data.exams})
        } else
            notification("error", res.message);
    };
    handleGetExamByTextSeach = async () => {
        const {idSemester, textSearch} = this.state;
        const res = await getExams(idSemester, textSearch);
        if (res.success) {
            this.setState({exams: res.data.exams})
        } else
            notification("error", res.message);
    };
    addNewExam = async () => {
        const {idCourseAdd, timeStartAdd, timeEndAdd, idRoomAdd, totalStudentAdd} = this.state;
        if (idCourseAdd && timeStartAdd && timeEndAdd && totalStudentAdd && idRoomAdd) {
            let data = {
                id_cs: idCourseAdd,
                time_start: timeStartAdd,
                time_end: timeEndAdd,
                id_room: idRoomAdd,
                maximum_seating: totalStudentAdd
            };
            console.log(data)
            const res = await addNewExam(data)

            if(res.success)
            {
                notification("success", "Tạo mới ca thi thành công");
                this.setState({checkChangeExams:true})
            }
            else {
                notification("error", res.message);

            }
        } else {
            notification("warning", "Xin điền đủ thông tin ");
            this.deleteData();
        }
    };

    componentDidMount() {
        this.handleGetSemester();
        this.handleGetExams();
        // this.handleGetCourse();
        this.handleGetRooms();
    }

    changeCourseSemesterWhenAdd = async (e) => {
        const idSemesterAdd = e.target[e.target.selectedIndex].value;
        this.setState({idSemesterAdd: idSemesterAdd});
    };

    changeRoomsWhenAdd = async (e) => {
        const maximum_seating = e.target.value;
        this.setState({totalStudentAdd: maximum_seating});
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        // if(this.state.textSearch !== prevState.textSearch)
        // {
        //     this.handleGetExamByTextSeach();
        // }
        if (this.state.idSemester !== prevState.idSemester && this.state.semesters.length !== prevState.semesters.length) {
            this.handleGetExams();
        }
        if (this.state.idSemesterAdd !== prevState.idSemesterAdd) {
            this.handleGetCourse()
        }
        if(this.state.totalStudentAdd !== prevState.totalStudentAdd){
            this.handleGetRooms()
        }
        if(this.state.checkChangeExams)
        {
            this.handleGetExams();
            this.setState({checkChangeExams:false})
        }
    }

    render() {
        return (
            <div className="container-exam">
                <div className="title">
                    Quản lý ca thi
                </div>
                <div className="exam-header">
                    <div className="exam-header-left">
                        <div className="header-items">
                            <label>Tìm kiếm </label>
                            <input className="input-find" type="text" placeholder="Nhập tên mã/môn thi "
                                   name="textSearch" onChange={this.handleChange} value={this.state.textSearch}
                            />
                        </div>
                        <div className="header-items">
                            <label>Học kỳ </label>
                            <select className="select-item"
                                    onChange={this.selectSemester} name=""
                            >
                                {
                                    this.state.semesters.map((e, index) => {
                                        return (
                                            <option key={e.id_semester}
                                                    defaultValue={e.id_semester === this.state.idSemester ? "selected" : ""}
                                                    value={e.id_semester}
                                            >
                                                {e.value}
                                            </option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                        <div className="header-items">
                            <label>Từ: &nbsp;</label>
                            <DatePickerCustom
                                startDate={this.state.startDate}
                                handleChangeDate={this.handleChangeDate}
                                name={"startDate"}
                                dateFormat="Y/M/d hh:mm"
                                timeFormat="HH:mm"
                            />
                        </div>
                        <div className="header-items">
                            <label>Đến: &nbsp;</label>
                            <DatePickerCustom
                                endDate={this.state.endDate}
                                handleChangeDate={this.handleChangeDate}
                                name={"endDate"}
                                dateFormat="Y/M/d hh:mm"
                                timeFormat="HH:mm"
                            />

                        </div>
                    </div>
                    <div className="exam-header-right">
                        <div className="header-items btn-flex-right">
                            <button className="btn btn-primary btn-size " data-toggle="modal"
                                    data-target="#modalAddNewExam">
                                <i className="fas fa-plus"/>
                                Thêm mới ca thi
                            </button>
                        </div>
                        {/*<Pagination/>*/}
                    </div>
                </div>
                <div className="exam-body">
                    <div className="tbl-exam">
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên môn thi</th>
                                <th>Mã môn thi</th>
                                <th>Bắt đầu</th>
                                <th>Kết thúc</th>
                                <th>Phòng thi</th>
                                <th>Tổng SV</th>

                            </tr>
                            </thead>
                            <tbody>
                            {
                                (this.state.exams || []).map((e, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{e.course_name}</td>
                                            <td>{e.id_course}</td>
                                            <td>{moment(parseInt(e.time_start)).utcOffset(420).format("YYYY/MM/DD hh:mm")}</td>
                                            <td>{moment(parseInt(e.time_end)).utcOffset(420).format("YYYY/MM/DD hh:mm")}</td>
                                            <td>{e.location}</td>
                                            <td>{e.maximum_seating}</td>
                                            <td>
                                                <button className="btn btn-info btn-sm">
                                                    Chỉnh sửa
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
                <ModelCustom acceptButton={this.addNewExam}
                             cancelButton={this.deleteData}
                             idModal="modalAddNewExam"
                             title="Thêm mới ca thi "
                             brandButton="Thêm mới "
                             show=""
                             childrenContent={
                                 <div>
                                     <div className="form-group">
                                         <label>Kỳ học:</label>
                                         <div className="dropdown">
                                             <select className="select-item-form"
                                                     onChange={this.changeCourseSemesterWhenAdd} value={this.state.idSemesterAdd}>
                                                 <option key="" value="">---</option>
                                                 {
                                                     this.state.semesters.map((e, index) => {
                                                         return (
                                                             <option
                                                                 key={e.id_semester}
                                                                 value={e.id_semester}
                                                                 // selected={e.id_semester === this.state.idSemester ? "selected" : ""}
                                                             >{e.value}
                                                             </option>
                                                         );
                                                     })
                                                 }
                                             </select>
                                         </div>
                                     </div>
                                     <div className="form-group">
                                         <label>Môn học:</label>
                                         <div className="dropdown">
                                             <select className="select-item-form" onChange={this.selectCourseInAdd} value={this.state.idCourseAdd}>
                                                 <option key="" value="">---</option>
                                                 {
                                                     this.state.courses.map((e, index) => {
                                                         return (
                                                             <option key={e.id_cs}
                                                                     value={e.id_cs}>{e.course_name}</option>
                                                         );
                                                     })
                                                 }
                                             </select>
                                         </div>
                                     </div>
                                     <div className="form-group">
                                         <label>Thời gian bắt đầu:</label>
                                         <div className="dropdown">
                                             <DatePickerCustom
                                                 timeStartAdd={this.state.timeStartAdd}
                                                 handleChangeDate={this.handleChangeDate}
                                                 name={"timeStartAdd"}
                                                 dateFormat="Y/M/d hh:mm"
                                                 timeFormat="HH:mm"
                                                 value = {this.state.timeStartAdd}
                                             />
                                         </div>
                                     </div>
                                     <div className="form-group">
                                         <label>Thời gian kết thúc:</label>
                                         <div className="dropdown">
                                             <DatePickerCustom
                                                 timeEndAdd={this.state.timeEndAdd}
                                                 handleChangeDate={this.handleChangeDate}
                                                 name={"timeEndAdd"}
                                                 dateFormat="Y/M/d hh:mm"
                                                 timeFormat="HH:mm"
                                                 value = {this.state.timeEndAdd}
                                             />
                                         </div>
                                     </div>
                                     <div className="form-group">
                                         <label>Tổng SV:</label>
                                         <input type="text" className="form-control" name="totalStudentAdd"
                                                onChange={this.changeRoomsWhenAdd} value={this.state.totalStudentAdd}/>
                                     </div>
                                     <div className="form-group">
                                         <label>Phòng thi: </label>
                                         <div className="dropdown">
                                             <select className="select-item-form" onChange={this.selectRoomInAdd} value={this.state.idRoomAdd}>
                                                 <option key="" value="">---</option>
                                                 {
                                                     this.state.rooms.map((e, index) => {
                                                         return (
                                                             <option key={e.id_room}
                                                                     value={e.id_room}>{e.location}</option>
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
        );
    }
}

export default Exam;