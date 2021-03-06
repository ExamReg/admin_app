import React from "react"
import "./exam.css"
import DatePickerCustom from "../datepicker/datepicker"
import moment from "moment";
import {getSemester, getCourse} from "../../api/course-api";
import {addNewExam, getExams, editExam, printStudentInExam} from "../../api/exam-api";
import ModelCustom from "../modal/modal";
import {notification} from "../../utils/noti";
import {getListRoom} from "../../api/room-api";
import Pagination from "../pagination/pagination";
import GetByNumberPages from "../getByNumberPages/getByNumberPages";
const URL_BASE = process.env.REACT_APP_API_URL;


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
            rooms: [],

            totalStudentEdit: "",
            timeStartEdit: "",
            timeEndEdit: "",
            nameCourseEdit: "",
            idRoomEdit: "",
            nameSemesterEdit:"",
            idSlot:"",
            isOpenAddExamModal: false,
            isOpenEditExamModal: false,
            page_size: 20,
            page_number: 1,
            page_count: 1
        };
        this.delayTime = null;
    }
    deleteData  = () =>{
        this.setState({
            totalStudentAdd: "",
            timeStartAdd: "",
            timeEndAdd: "",
            idCourseAdd: "",
            idRoomAdd: "",
            idSemesterAdd: "",
            isOpenAddExamModal: false,
            isOpenEditExamModal: false
        })
    };
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
        const valueOfInput = moment(date).valueOf();
        this.setState({
            [column_state]: valueOfInput
        });
    };
    selectSemester = (event) => {
        const idSemester = event.target.value;
        let index = this.state.semesters.findIndex(e => parseInt(e.id_semester) === parseInt(idSemester));
        this.setState({
            idSemester: idSemester,
            textSearch: "",
            nameSemesterEdit: this.state.semesters[index].value
        });
    };
    selectCourseInAdd = (event) => {
        const idcs = event.target[event.target.selectedIndex].value;
        this.setState({idCourseAdd: idcs});
    };
    selectRoomInAdd = (event) => {
        const idroom = event.target[event.target.selectedIndex].value;
        this.setState({idRoomAdd: idroom});
    };
    selectRoomInEdit = (event) =>{
        const idroom = event.target[event.target.selectedIndex].value;
        this.setState({idRoomEdit: idroom});
    };
    handleGetSemester = async () => {
        let res = await getSemester();
        if (res.success && res.data.semesters.length > 0) {
            let result = await getExams({
                id_semester: res.data.semesters[0].id_semester,
                text: "",
                page_size: this.state.page_size ,
                page_number: this.state.page_number - 1,
            });
            this.setState({
                semesters: res.data.semesters,
                idSemester: res.data.semesters[0].id_semester,
                exams: result.data.exams,
                nameSemesterEdit: res.data.semesters[0].value
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

    handleGetExams = (timeDelay) => {
        const {textSearch, idSemester, page_size, page_number} = this.state;
        clearTimeout(this.delayTime);
        this.delayTime = setTimeout(async () => {
            const res = await getExams({
                id_semester: idSemester,
                text: textSearch,
                page_size,
                page_number: page_number - 1
            });
            if (res.success) {
                this.setState({
                    exams: res.data.exams,
                    page_number: 1,
                    page_count: Math.ceil(res.data.count / page_size)
                })
            } else
                notification("error", res.message);
        }, timeDelay);

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
            const res = await addNewExam(data);

            if(res.success)
            {
                notification("success", "Tạo mới ca thi thành công");
                this.deleteData();
                this.setState({checkChangeExams:true, isOpenAddExamModal: false})
            }
            else {
                notification("error", res.message);

            }
        } else {
            notification("warning", "Xin điền đủ thông tin ");
        }
    };

    changeCourseSemesterWhenAdd = async (e) => {
        const idSemesterAdd = e.target[e.target.selectedIndex].value;
        this.setState({idSemesterAdd: idSemesterAdd});
    };

    changeRoomsWhenAdd = async (e) => {
        const maximum_seating = e.target.value;
        this.setState({totalStudentAdd: maximum_seating});
    };
    clickBtnEdit = (idslot ,cs_name, times, timee, room, maxn) =>{
        let arr = this.state.rooms;
        let idroom;
        for( let i = 0 ; i < arr.length; i++)
        {
            if(arr[i].location === room)
            {
                idroom = arr[i].id_room;
                break;
            }
        }
        this.setState({
            idSlot: idslot,
            totalStudentEdit: maxn,
            timeStartEdit: times,
            timeEndEdit: timee,
            nameCourseEdit: cs_name,
            idRoomEdit: idroom,
            isOpenEditExamModal: true
           /* nameSemesterEdit: a*/
        })

    };
    editExam = async () =>{
        const {idSlot, timeStartEdit, timeEndEdit, idRoomEdit, totalStudentEdit} = this.state;
        if(timeStartEdit && timeEndEdit && idRoomEdit && totalStudentEdit)
        {
            let data = {
                time_start: timeStartEdit,
                time_end: timeEndEdit,
                maximum_seating: totalStudentEdit,
                id_room: idRoomEdit
            };

            const res = await editExam(data, idSlot);
            if(res.success)
            {
                notification("success", "Chỉnh sửa thông tin ca thi thành công ");
                this.setState({checkChangeExams:true, isOpenEditExamModal: false})
            }
            else {
                notification("error", res.message)
            }
        }
        else notification("warning", "Xin điền đủ thông tin ")
    };
    printStudentInExam = async (id_slot) => {
          let res = await printStudentInExam(id_slot);
        if(res.success)
        {
            let a_tag = document.createElement('a');
            let href = URL_BASE + "/static/" + res.data.file_name;
            a_tag.setAttribute('target', '_blank');
            a_tag.setAttribute('href', href);
            a_tag.click();
        }
        else
        {
            notification("error", res.message);
        }
    };

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
        const response = await getExams(query);
        if (response.success) {
            this.setState({
                exams: response.data.exams,
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
        const response = await getExams(query);
        if (response.success) {
            this.setState({
                exams: response.data.exams,
                change_page_size: false,
                page_count: Math.ceil(response.data.count / this.state.page_size),
                page_number: 1
            });
        } else {
            console.log(response.message);
        }
    };

    componentDidMount() {
        this.handleGetSemester();
        this.handleGetRooms();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.idSemester !== prevState.idSemester && this.state.semesters.length === prevState.semesters.length) {
            this.handleGetExams(100);
        }
        if (this.state.idSemesterAdd !== prevState.idSemesterAdd) {
            this.handleGetCourse()
        }
        if(this.state.totalStudentAdd !== prevState.totalStudentAdd){
            this.handleGetRooms()
        }
        if(this.state.checkChangeExams)
        {
            this.handleGetExams(100);
            this.setState({checkChangeExams:false})
        }
        if(this.state.textSearch !== prevState.textSearch){
            this.handleGetExams(500);
        }
        if(this.state.next_page){
            this.reloadWhenNextPage()
        }
        if(this.state.change_page_size){
            this.reloadWhenChangePageSize()
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
                                            <option key={index++}
                                                    value={e.id_semester}
                                            >
                                                {e.value}
                                            </option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="exam-header-right">
                        <div className="header-items btn-flex-right">
                            <button className="btn btn-primary btn-size " onClick={() => {this.setState({isOpenAddExamModal: true})}}>
                                <i className="fas fa-plus"/>
                                Thêm mới ca thi
                            </button>
                        </div>
                        <Pagination page_size={this.state.page_size} changePageSize={this.changePageSize}/>
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
                                            <td>{moment(parseInt(e.time_start)).utcOffset(420).format("YYYY/MM/DD HH:mm")}</td>
                                            <td>{moment(parseInt(e.time_end)).utcOffset(420).format("YYYY/MM/DD HH:mm")}</td>
                                            <td>{e.location}</td>
                                            <td>{e.maximum_seating}</td>
                                            <td>
                                                <button className="btn btn-info btn-sm"
                                                        onClick={() => this.clickBtnEdit(e.id_slot, e.course_name,parseInt(e.time_start),parseInt(e.time_end),e.location, e.maximum_seating)}
                                                >
                                                    Chỉnh sửa
                                                </button>
                                                &nbsp;&nbsp;&nbsp;
                                                <button className="btn btn-secondary btn-sm btn-space-right"
                                                        onClick={() => this.printStudentInExam(e.id_slot)}
                                                >
                                                    In danh sách
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
                <div >
                    <GetByNumberPages chosePage={this.chosePage} pageNumbers={this.state.page_count}
                                      currentPage={this.state.page_number}/>
                </div>
                <ModelCustom acceptButton={this.addNewExam}
                             cancelButton={this.deleteData}
                             idModal="modalAddNewExam"
                             title="Thêm mới ca thi "
                             brandButton="Thêm mới "
                             isOpen={this.state.isOpenAddExamModal}
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
                                                 dateFormat="Y/M/d HH:mm"
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
                                                 dateFormat="Y/M/d HH:mm"
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
                <ModelCustom acceptButton={this.editExam}
                             idModal="modalEditExam"
                             title="Chỉnh sửa ca thi "
                             brandButton="Chỉnh sửa "
                             isOpen={this.state.isOpenEditExamModal}
                             cancelButton={this.deleteData}
                             childrenContent={
                                 <div>
                                     <div className="form-group">
                                         <label>Kỳ học:</label>
                                         <input type="text" className="form-control" name="nameSemesterEdit"
                                                defaultValue={this.state.nameSemesterEdit} readOnly
                                         />
                                     </div>
                                     <div className="form-group">
                                         <label>Môn học:</label>
                                         <input type="text" className="form-control" name="nameCourseEdit"
                                                defaultValue={this.state.nameCourseEdit} readOnly
                                         />
                                     </div>
                                     <div className="form-group">
                                         <label>Thời gian bắt đầu:</label>
                                         <div className="dropdown">
                                             <DatePickerCustom
                                                 timeStartEdit={this.state.timeStartEdit}
                                                 handleChangeDate={this.handleChangeDate}
                                                 name={"timeStartEdit"}
                                                 dateFormat="Y/M/d HH:mm"
                                                 timeFormat="HH:mm"
                                             />
                                         </div>
                                     </div>
                                     <div className="form-group">
                                         <label>Thời gian kết thúc:</label>
                                         <div className="dropdown">
                                             <DatePickerCustom
                                                 timeEndEdit={this.state.timeEndEdit}
                                                 handleChangeDate={this.handleChangeDate}
                                                 name={"timeEndEdit"}
                                                 dateFormat="Y/M/d HH:mm"
                                                 timeFormat="HH:mm"
                                             />
                                         </div>
                                     </div>
                                     <div className="form-group">
                                         <label>Tổng SV:</label>
                                         <input type="text" className="form-control" name="totalStudentEdit"
                                                value={this.state.totalStudentEdit} onChange={this.handleChange}/>
                                     </div>
                                     <div className="form-group">
                                         <label>Phòng thi: </label>
                                         <div className="dropdown">
                                             <select className="select-item-form" name="idRoomEdit" defaultValue={this.state.idRoomEdit} onChange={this.selectRoomInEdit}>
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