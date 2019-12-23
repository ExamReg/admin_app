import React from "react"
import "./semester.css"
import {getSemester} from "../../api/course-api";
import {createNewSemester, editSemester} from "../../api/semester";
import ModelCustom from "../modal/modal";
import {notification} from "../../utils/noti";
import DatePickerCustom from "../datepicker/datepicker";
import moment from "moment";

class Semester extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            semesters: [],

            idSemester: "",
            semesterEdit: "",
            startRegisterEdit: "",
            endRegisterEdit: "",

            semesterAdd: "",
            startRegisterAdd: "",
            endRegisterAdd: "",
            checkSemestersWhenAdd: false,
            isOpenAddSemesterModal: false,
            isOpenEditSemesterModal: false
        };
        this.handleGetSemester = this.handleGetSemester.bind(this);
        this.selectSemester = this.selectSemester.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async handleGetSemester() {
        let res = await getSemester();
        if (res.success) {
            this.setState({
                semesters: res.data.semesters,
                checkSemestersWhenAdd: false
            });
        } else {
            console.log(res.message)
        }
    }

    selectSemester = (e) => {
        this.setState({
            idSemester: e.id_semester,
            semesterEdit: e.value,
            startRegisterEdit: e.register_from,
            endRegisterEdit: e.register_to,
            isOpenEditSemesterModal: true
        })
    };

    handleChange(e) {
        let nam = e.target.name;
        let val = e.target.value;
        this.setState({[nam]: val})
    }

    handleAddNewSemester = async () => {
        const {semesterAdd, startRegisterAdd, endRegisterAdd} = this.state;
        let data = {
            value: semesterAdd,
            register_from: startRegisterAdd,
            register_to: endRegisterAdd
        };
        if (semesterAdd) {
            const res = await createNewSemester(data);
            if (res.success) {
                notification("success", "Tạo mới học kỳ thành công ");
                this.setState({
                    semesterAdd: "",
                    checkSemestersWhenAdd: true,
                    startRegisterAdd: "",
                    endRegisterAdd: ""
                })
            } else {
                notification("error", res.message)
            }
        } else {
            notification("warning", "Xin điền đủ thông tin ")
        }
    };
    handleEditSemester = async () => {
        const {idSemester, semesterEdit, startRegisterEdit, endRegisterEdit} = this.state;
        let data = {
            value: semesterEdit,
            register_from: startRegisterEdit,
            register_to: endRegisterEdit
        };
        if (semesterEdit) {
            const res = await editSemester(idSemester, data);

            if (res.success) {
                notification("success", "Chỉnh sửa tên học kỳ thành công ");
                this.setState({
                    checkSemestersWhenAdd: true
                });
            } else {
                notification("error", res.message)
            }
        } else {
            notification("warning", "Xin hãy điền đầy đủ thông tin ")
        }
    };
    handleChangeDate = (date, column_state) => {
        const valueOfInput = moment(date).valueOf();
        this.setState({
            [column_state]: valueOfInput
        });
    };
    deleteData = () => {
        this.setState({
            isOpenAddSemesterModal: false,
            isOpenEditSemesterModal: false
        })
    };
    componentDidMount() {
        this.handleGetSemester();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.checkSemestersWhenAdd) {
            this.handleGetSemester();
        }
    }

    render() {
        return (
            <div className="container-semester">
                <div className="title">
                    Quản lý học kỳ
                </div>
                <div className="header-semester">
                    <button type="button" className="btn btn-primary btn-size header-items" onClick={() => this.setState({isOpenAddSemesterModal: true})}>
                        <i className="fas fa-plus"/>
                        Thêm mới học kì
                    </button>
                </div>
                <div className="body-semester">
                    <div className="tbl-semester">
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên học kỳ</th>
                                <th>Bắt đầu đăng ký lúc</th>
                                <th>Kết thúc đăng ký lúc</th>
                                <th className="style-center">Sửa</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                (this.state.semesters || []).map((e, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{e.value}</td>
                                            <td>{e.register_from ? moment(parseInt(e.register_from)).utcOffset(420).format("YYYY/MM/DD HH:mm") : "Chưa có"}</td>
                                            <td>{e.register_to ? moment(parseInt(e.register_to)).utcOffset(420).format("YYYY/MM/DD HH:mm") : "Chưa có"}</td>
                                            <td className="style-center">
                                                <button className="btn btn-info" style={{padding: "2px 5px"}}
                                                        onClick={() => this.selectSemester(e)}>
                                                    Chỉnh sửa
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>

                <ModelCustom idModal="modalAddNewSemester"
                             title="Thêm mới học kỳ "
                             brandButton="Thêm mới"
                             acceptButton={this.handleAddNewSemester}
                             isOpen={this.state.isOpenAddSemesterModal}
                             cancelButton={this.deleteData}
                             childrenContent={
                                 <div>
                                     <div className="form-group">
                                         <label>Tên học kì: </label>
                                         <input type="text" className="form-control" name="semesterAdd"
                                                value={this.state.semesterAdd} onChange={this.handleChange}/>
                                     </div>
                                     <div className="form-group">
                                         <label>Thời gian bắt đầu đăng kí: </label>
                                         <div className="dropdown">
                                             <DatePickerCustom
                                                 startRegisterAdd={parseInt(this.state.startRegisterAdd)}
                                                 handleChangeDate={this.handleChangeDate}
                                                 name={"startRegisterAdd"}
                                                 dateFormat="Y/M/d HH:mm"
                                                 timeFormat="HH:mm"
                                             />
                                         </div>
                                     </div>
                                     <div className="form-group">
                                         <label>Thời gian kết thúc đăng kí: </label>
                                         <div className="dropdown">
                                             <DatePickerCustom
                                                 endRegisterAdd={parseInt(this.state.endRegisterAdd)}
                                                 handleChangeDate={this.handleChangeDate}
                                                 name={"endRegisterAdd"}
                                                 dateFormat="Y/M/d HH:mm"
                                                 timeFormat="HH:mm"
                                             />
                                         </div>
                                     </div>
                                 </div>
                             }
                />
                <ModelCustom idModal="modalEditSemester"
                             title="Chỉnh sửa học kỳ "
                             brandButton="Chỉnh sửa "
                             acceptButton={
                                 this.handleEditSemester
                             }
                             cancelButton={this.deleteData}
                             isOpen={this.state.isOpenEditSemesterModal}
                             childrenContent={
                                 <div>
                                     <div className="form-group">
                                         <label>Tên học kì: </label>
                                         <input type="text" className="form-control" name="semesterEdit"
                                                value={this.state.semesterEdit} onChange={this.handleChange}/>
                                     </div>
                                     <div className="form-group">
                                         <label>Thời gian bắt đầu đăng kí: </label>
                                         <div className="dropdown">
                                             <DatePickerCustom
                                                 startRegisterEdit={parseInt(this.state.startRegisterEdit)}
                                                 handleChangeDate={this.handleChangeDate}
                                                 name={"startRegisterEdit"}
                                                 dateFormat="Y/M/d HH:mm"
                                                 timeFormat="HH:mm"
                                             />
                                         </div>
                                     </div>
                                     <div className="form-group">
                                         <label>Thời gian kết thúc đăng kí: </label>
                                         <div className="dropdown">
                                             <DatePickerCustom
                                                 endRegisterEdit={parseInt(this.state.endRegisterEdit)}
                                                 handleChangeDate={this.handleChangeDate}
                                                 name={"endRegisterEdit"}
                                                 dateFormat="Y/M/d HH:mm"
                                                 timeFormat="HH:mm"
                                             />
                                         </div>
                                     </div>
                                 </div>
                             }
                />
            </div>)
    }
}

export default Semester;