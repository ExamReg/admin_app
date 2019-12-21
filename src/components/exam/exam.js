import React from "react"
import "./exam.css"
import DatePickerCustom from "../datepicker/datepicker"
import moment from "moment";
import {getSemester} from "../../api/course-api";
import Pagination from "../pagination/pagination";
import ModelCustom from "../modal/modal";
const one_day = 24 * 60 * 60 * 1000;

class Exam extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            startDate: moment(Date.now() - 30 * one_day).format("YYYY/MM/DD"),
            endDate: moment(Date.now()).format("YYYY/MM/DD"),
            data: null,

            semesters:[],
            idSemester:"",
            textSearch:""
        }
    }

    handleChangeDate = (date, column_state) => {
        const valueOfInput = moment(date).format("YYYY/MM/DD");
        this.setState({[column_state]: valueOfInput})
    };
    selectSemester = (event)  => {
        const idSems = event.target[event.target.selectedIndex].value;
        this.setState({idSemester: idSems, textSearch: ""});
    };
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
    addNewExam = () =>{

    }
    componentDidMount() {
        this.handleGetSemester()
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
                            <input className="input-find" type="text" placeholder="Tìm kiếm môn thi "/>
                        </div>
                        <div className="header-items">
                            <div className="header-items">
                                Học kì:
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
                        <Pagination />
                    </div>
                </div>
                <div className="exam-body">
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
                                <th>Chỉnh sửa</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                </div>
                <ModelCustom acceptButton={this.addNewExam}
                             idModal="modalAddNewExam"
                             title="Thêm mới ca thi "
                             brandButton="Thêm mới "
                             childrenContent={
                                 <div>
                                     <div className="form-group">
                                         <label>Tên môn thi:</label>
                                         <input type="text" className="form-control"/>
                                     </div>
                                     <div className="form-group">
                                         <label>Mã môn thi:</label>
                                         <input type="text" className="form-control"/>
                                     </div>
                                     <div className="form-group">
                                         <label>Ngày thi:</label>
                                         <input type="text" className="form-control"/>
                                     </div>
                                     <div className="form-group">
                                         <label>Giờ thi:</label>
                                         <input type="text" className="form-control"/>
                                     </div>
                                     <div className="form-group">
                                         <label>Phòng thi:</label>
                                         <input type="text" className="form-control"/>
                                     </div>
                                     <div className="form-group">
                                         <label>Tổng SV:</label>
                                         <input type="text" className="form-control"/>
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
        );
    }
}

export default Exam;