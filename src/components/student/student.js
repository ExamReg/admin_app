import React from 'react'
import './student.css'
import {getStudent} from "../../api/student-api";
import Modal from "../modal/modal";
import Pagination from "../pagination/pagination";
import GetByNumberPages from "../getByNumberPages/getByNumberPages";

export default class Student extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [],
            text: "",
            show: false,
            page_size: 20,
            page_number: 1,
            page_count: 0,
            next_page: false,
            change_page_size: false
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
            this.handleTimeOut();
        }
        if(this.state.next_page){
            this.reloadWhenNextPage()
        }
        if(this.state.change_page_size){
            this.reloadWhenChangePageSize();
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleTimeOut = () => {
        clearTimeout(this.delayTime);
        this.delayTime = setTimeout(async () => {
            let result = await getStudent(this.state.text);
            if (result.success === true) {
                this.setState({
                    students: result.data.students
                })
            }
        }, 1000);
    };

    openModal = () => {
        this.setState({
            show: true
        })
    };
    changePageSize = (event) => {
        this.setState({
            page_size: event.target.value,
            change_page_size: true,
            page_number: 1
        })
    };
    chosePage = (event) =>{
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
                            <button className="btn btn-primary btn-size" data-toggle="modal" data-target="#modalAddNewStudent">
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
                                <th className="title-edit" colSpan="2"></th>
                                
                            </tr>
                            </thead>
                            <tbody>
                            {(this.state.students || []).map((e, index) => {
                                return <tr key={e.id_student}>
                                    <td>{++index}</td>
                                    <td>{e.id_student}</td>
                                    <td>{e.name}</td>
                                    <td>{e.birthday}</td>
                                    <td>
                                        <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#modalAddNewStudent">Chỉnh sửa</button>
                                        
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-danger">Quên mật khẩu</button>
                                    </td>
                                </tr>
                            })}
                            </tbody>
                        </table>
                    </div>
                    <div id="modalAddNewStudent" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Thêm sinh viên </h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>MSSV :</label>
                                    <input type="text" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label>Họ và tên :</label>
                                    <input type="text" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label>Ngày sinh :</label>
                                    <input type="date" className="form-control"/>
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
                    <Modal title="Test" onClose={() => {
                        this.setState({show: false})
                    }} show={this.state.show} addNew={() => {
                        console.log("add new")
                    }}/>
                    <GetByNumberPages chosePage={this.chosePage} pageNumbers={this.state.page_count} currentPage={this.state.page_number}/>
                </div>
            </div>
        )
    }
}