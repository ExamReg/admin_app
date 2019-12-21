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


class Exam extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            startDate: "",
            endDate: "",
            data: null,

            semesters:[],
            idSemester:"1",
            textSearch:"",

            exams:[],
            checkChangeExams:false,

            dateAdd:"",
            totalStudentAdd:"",
            timeStartAdd:"",
            timeEndAdd:"",
            idCourseAdd:"",
            idRoomAdd:"",

            courses:[],
            rooms:[]

        }
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
    };
    handleChangeDate = (date, column_state) => {
        const valueOfInput = moment(date).format("YYYY/MM/DD");
        this.setState({[column_state]: valueOfInput})
    };
    selectSemester = (event)  => {
        const idSems = event.target[event.target.selectedIndex].value;
        this.setState({idSemester: idSems, textSearch: ""});
    };
    selectCourseInAdd = (event) => {
        const idcs = event.target[event.target.selectedIndex].value;
        this.setState({idCourseAdd: idcs});
    };
    selectRoomInAdd = (event) =>{
        const idroom = event.target[event.target.selectedIndex].value;
        this.setState({idRoomAdd: idroom});
    }
    handleGetSemester = async () => {
        let res = await getSemester();
        if (res.success) {
            this.setState({
                semesters: res.data.semesters
            });
        } else {
            console.log(res.message)
        }
    };
    handleGetCourse = async () =>{
        let query = {
            page_size: 10000,
            page_number: 0,
            id_semester: this.state.idSemester
        };
        const res = await getCourse(query);

        if(res.success)
        {
            this.setState({courses:res.data.courses})
        }
        else {
            notification("error", res.message)
        }
    }
    handleGetRooms = async () =>{
        const res = await getListRoom();
        if(res.success)
        {
            this.setState({rooms: res.data.rooms})
        }
    }
    handleGetExams = async () =>{
        const {idSemester} = this.state;
        const res = await getExams(idSemester, "")
        if(res.success)
        {
            this.setState({exams: res.data.exams})
        }
        else
            notification("error", res.message);
    };
    handleGetExamByTextSeach = async () =>{
        const {idSemester, textSearch} = this.state;
        const res = await getExams(idSemester, textSearch);
        if(res.success)
        {
            this.setState({exams: res.data.exams})
        }
        else
            notification("error", res.message);
    };
    addNewExam = async () =>{
        const {idCourseAdd, dateAdd, timeStartAdd, timeEndAdd, idRoomAdd, totalStudentAdd} = this.state;
        if(idCourseAdd && dateAdd && timeStartAdd && timeEndAdd && totalStudentAdd && idRoomAdd)
        {
            let data= {
                id_cs:idCourseAdd,
                time_start: timeStartAdd,
                time_end: timeEndAdd,
                date: dateAdd,
                id_room: idRoomAdd,
                maximum_seating: totalStudentAdd
            }
            console.log(data)
            /*const res = await addNewExam(data)*/

            /*if(res.success)
            {
                notification("success", "Tạo mới ca thi thành công");
                this.setState({checkChangeExams:true})

            }
            else {
                notification("error", res.message);
            }*/
        }
        else {
            notification("warning", "Xin điền đủ thông tin ");
        }
    }
    componentDidMount() {
        this.handleGetSemester();
        this.handleGetExams();
        this.handleGetCourse();
        this.handleGetRooms();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.textSearch !== prevState.textSearch)
        {
            this.handleGetExamByTextSeach();
        }
        if(this.state.idSemester !== prevState.idSemester)
        {
            this.handleGetExams();
            this.handleGetCourse();
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
                        <div className="header-items">
                            <label>Từ: &nbsp;</label>
                            <DatePickerCustom startDate={this.state.startDate} handleChangeDate={this.handleChangeDate} name={"startDate"}/>
                        </div>
                        <div className="header-items">
                            <label>Đến: &nbsp;</label>
                            <DatePickerCustom endDate={this.state.endDate} handleChangeDate={this.handleChangeDate} name={"endDate"}/>
                        </div>
                    </div>
                    <div className="exam-header-right">
                        <div className="header-items btn-flex-right">
                            <button className="btn btn-primary btn-size " data-toggle="modal"
                                    data-target="#modalAddNewExam">
                                <i className="fas fa-plus"></i>
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
                                    <th>Tên môn thi </th>
                                    <th>Mã môn thi </th>
                                    <th>Ngày thi </th>
                                    <th>Giờ thi </th>
                                    <th>Phòng thi </th>
                                    <th>Tổng SV </th>

                                </tr>
                            </thead>
                            <tbody>
                            {
                                (this.state.exams || []).map((e, index) =>{
                                    return (
                                        <tr key={index}>
                                            <td>{index+ 1}</td>
                                            <td>{e.course_name}</td>
                                            <td>{e.id_course}</td>
                                            <td>{e.date}</td>
                                            <td>{e.time_start}-{e.time_end}</td>
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
                             idModal="modalAddNewExam"
                             title="Thêm mới ca thi "
                             brandButton="Thêm mới "
                             childrenContent={
                                 <div>
                                     <div className="form-group">
                                         <label>Môn học:</label>
                                         <div className="dropdown">
                                             <select className="select-item-form" onChange={this.selectCourseInAdd}>
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
                                         <label>Ngày thi:</label>
                                         <input type="text" className="form-control" name="dateAdd" onChange={this.handleChange}/>
                                     </div>
                                     <div className="form-group">
                                         <label>Bắt đầu:</label>
                                         <input type="time" className="form-control" name="timeStartAdd" onChange={this.handleChange}/>
                                     </div>
                                     <div className="form-group">
                                         <label>Kết thúc:</label>
                                         <input type="time" className="form-control" name="timeEndAdd" onChange={this.handleChange}/>
                                     </div>

                                     <div className="form-group">
                                         <label>Phòng thi: </label>
                                         <div className="dropdown">
                                             <select className="select-item-form" onChange={this.selectRoomInAdd}>
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
                                     <div className="form-group">
                                         <label>Tổng SV:</label>
                                         <input type="text" className="form-control" name="totalStudentAdd" onChange={this.handleChange}/>
                                     </div>
                                 </div>
                             }
                             />
            </div>
        );
    }
}

export default Exam;