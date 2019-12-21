import React from 'react'
import './student.css'
import {getStudent, importStudent, resetPasswordOfStudent, updateStudent} from "../../api/student-api";
import Pagination from "../pagination/pagination";
import GetByNumberPages from "../getByNumberPages/getByNumberPages";
import ModelCustom from "../modal/modal";
import {notification} from "../../utils/noti";

export default class Student extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [],
            text: "",
            page_size: 20,
            page_number: 1,
            page_count: 0,
            next_page: false,
            change_page_size: false,
            fileStudents: "",
            oldIdStu: "",
            idStuEdit:"",
            nameStudEdit:"",
            birthStuEdit:""
        };
        this.delayTime = null;
    }

    async componentDidMount() {
        let result = await getStudent({
            page_size: this.state.page_size,
            page_number: this.state.page_number - 1
        });
        if (result.success === true) {
            this.setState({
                students: result.data.students,
                page_count: Math.ceil(result.data.count / this.state.page_size)
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.text !== this.state.text) {
            this.handleTimeOut(500);
        }
        if (this.state.next_page) {
            this.reloadWhenNextPage()
        }
        if (this.state.change_page_size) {
            this.reloadWhenChangePageSize();
        }
    }

    handleChange = (e) => {
        if(e.target.name === "fileStudents"){
            this.setState({
                [e.target.name]: e.target.files[0]
            });
        }else{
            this.setState({
                [e.target.name]: e.target.value
            });
        }
    };
    selectStudentEdit = (name, id, birthday) =>
    {
        this.setState({
            oldIdStu: id,
            idStuEdit:id,
            nameStudEdit:name,
            birthStuEdit: birthday
        })
    };
    handleTimeOut = (timeDelay) => {
        clearTimeout(this.delayTime);
        this.delayTime = setTimeout(async () => {
            let result = await getStudent({
                text: this.state.text,
                page_size: this.state.page_size,
                page_number: 0
            });
            if (result.success === true) {
                this.setState({
                    students: result.data.students,
                    page_number: 1,
                    page_count: Math.ceil(result.data.count / this.state.page_size)
                })
            }
        }, timeDelay);
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
            text: this.state.text
        };
        const response = await getStudent(query);
        if (response.success) {
            this.setState({
                students: response.data.students,
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
            text: this.state.text
        };
        const response = await getStudent(query);
        if (response.success) {
            this.setState({
                students: response.data.students,
                change_page_size: false,
                page_count: Math.ceil(response.data.count / this.state.page_size)
            });
        } else {
            console.log(response.message);
        }
    };
    editStudent = async () => {
        if(!this.state.idStuEdit || !this.state.nameStudEdit || !this.state.birthStuEdit){
            notification("warning", "Vui lòng điền đầy đủ thông tin.")
        }else{
            let payload = {
                id_student: this.state.idStuEdit,
                name: this.state.nameStudEdit,
                birthday: this.state.birthStuEdit
            };
            let result = await updateStudent(this.state.oldIdStu, payload);
            result.success === true ? notification("success", "Cập nhật thông tin sinh viên thành công.")
                : notification("error", result.message);
            this.handleTimeOut(10);
        }
    };
    addNewStudent = async () => {
        if(!this.state.fileStudents){
            notification("warning", "Vui lòng điền đầy đủ thông tin.")
        }else{
            let form_data = new FormData();
            form_data.append("file_import", this.state.fileStudents);
            let result = await importStudent(form_data);
            result.success === true ? notification("success", "Import success") : notification("error", result.message);
            this.setState({
                fileStudents: null
            });
            this.handleTimeOut(100);
        }
    };
    resetPassword = async () => {
        let result = await resetPasswordOfStudent(this.state.idStuEdit);
        result.success === true ? notification("success", "Reset mật khẩu thành công. ") : notification("error", result.message);
    };
    render() {
        return (
            <div className="student">
                <div className="title">Quản lý sinh viên</div>
                <div className="student-header">
                    <div className={"student-header-left"}>
                        <div className="student-input">
                            <input type="text" className="input-find" placeholder="Nhập mã/tên số sinh viên"
                                   onChange={this.handleChange} name="text"/>
                        </div>
                        <div className="student-input">
                            <button className="btn btn-primary btn-size" data-toggle="modal"
                                    data-target="#modalAddNewStudent">
                                <i className="fas fa-plus"/>
                                Thêm mới học sinh
                            </button>
                        </div>
                    </div>
                    <div className={"student-header-right"}>
                        <Pagination changePageSize={this.changePageSize} page_size={this.state.page_size}/>
                    </div>
                </div>
                <div className="student-content">
                    <div className="tbl-student">
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th>STT</th>
                                <th>MSSV</th>
                                <th>Họ và Tên</th>
                                <th>Ngày sinh</th>
                                <th className="title-edit" colSpan="2"/>

                            </tr>
                            </thead>
                            <tbody>

                            {
                                this.state.students.length === 0
                                    ?
                                    <tr key={0}>
                                        <td colSpan={4}><i>Không có kết quả tìm tiếm nào phù hợp</i></td>
                                    </tr>
                                    :
                                (this.state.students || []).map((e, index) => {
                                return <tr key={e.id_student}>
                                    <td>{++index}</td>
                                    <td>{e.id_student}</td>
                                    <td>{e.name}</td>
                                    <td>{e.birthday}</td>
                                    <td className="style-center">
                                        <button className="btn btn-info" style={{padding: "2px 5px"}}
                                                data-toggle="modal"
                                                data-target="#modalEditStudent"
                                                onClick={() => this.selectStudentEdit(e.name, e.id_student, e.birthday)}
                                        >
                                            Chỉnh sửa
                                        </button>

                                    </td>
                                </tr>
                            })}
                            </tbody>
                        </table>
                    </div>

                    <ModelCustom
                        idModal="modalAddNewStudent"
                        title="Thêm mới học sinh "
                        acceptButton={this.addNewStudent}
                        brandButton="Thêm mới "
                        childrenContent={
                            <div>
                                <div className="form-group">
                                    <label>Danh sách sinh viên:</label>
                                    <input type="file" className="form-control-file border" name="fileStudents"
                                           onChange={this.handleChange}/>
                                           <br/>
                                    <i style={{color: "red"}}>*Các định dạng cho phép: .xlsx .csv </i>
                                </div>
                            </div>
                        }
                    />
                    <ModelCustom
                           idModal= "modalEditStudent"
                           title="Chỉnh sửa thông tin học sinh "
                           brandButton="Chỉnh sửa"
                           acceptButton={this.editStudent}
                           buttonLeft={this.resetPassword}
                           childrenContent={
                               <div>
                                   <div className="form-group">
                                       <label>MSSV :</label>
                                       <input type="text" className="form-control" name="idStuEdit" onChange={this.handleChange} value={this.state.idStuEdit}/>
                                   </div>
                                   <div className="form-group">
                                       <label>Họ và tên :</label>
                                       <input type="text" className="form-control" name="nameStudEdit" onChange={this.handleChange} value={this.state.nameStudEdit}/>
                                   </div>
                                   <div className="form-group">
                                       <label>Ngày sinh :</label>
                                       <input type="text" className="form-control" name="birthStuEdit" onChange={this.handleChange} value={this.state.birthStuEdit}/>
                                   </div>
                               </div>
                           }
                           />

                </div>
                <div className="student-bottom">
                    <GetByNumberPages chosePage={this.chosePage} pageNumbers={this.state.page_count}
                                      currentPage={this.state.page_number}/>
                </div>
            </div>
        )
    }
}