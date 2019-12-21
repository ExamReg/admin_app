import React from 'react';
import {NavLink} from "react-router-dom";
import "./course.css";
import queryString from "query-string";
import ModelCustom from "../../modal/modal";

export default class Course extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id_course:"",

            fileStudentEnoughCondition:""
        }
    }
    componentDidMount() {
        let a = this.props.location.search;
        let parsed = queryString.parse(a);
        this.setState({id_course: parsed.id_course})

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
    handleImportFile = () =>{

    }
    handleEditInfoStudent = () =>{

    }
    render() {
        console.log(this.props.location)
        return(
            <div className="container-course">
                <div className="title">
                    <NavLink to="/dashboard/setting">Quản lý danh sách khóa học </NavLink>
                    <span>/ Tên khóa học </span>
                </div>
                <div className="list-course-header">

                    <div className="list-course-header-left">
                        <div className="header-items">
                            <input className="input-find" type="text" placeholder="Nhập mã/tên sinh viên "/>
                        </div>
                        <div className="header-items">
                            <button type="button" className="btn btn-primary btn-size" data-toggle="modal"
                                    data-target="#modalImportFile">
                                <i className="fas fa-plus"/>
                                Nhập file sinh viên
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>MSSV</th>
                                <th>Họ và tên </th>
                                <th>Ngày sinh </th>
                                <th>Trạng thái </th>
                                <th>Hoạt động </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>17020875</td>
                                <td>Phùng Thị Tuyết Mai </td>
                                <td>23/04/1999</td>
                                <td>activate</td>
                                <td style={{display:"inline-block"}}>
                                    <button className="btn btn-secondary btn-sm btn-space-right">Kích hoạt</button>
                                    <button className="btn btn-outline-secondary btn-sm">Chỉnh sửa </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <ModelCustom acceptButton={this.handleImportFile}
                             idModal="modalImportFile"
                             title="Nhập file danh sách sinh viên đủ điều kiện dự thi"
                             brandButton="Thêm "
                             childrenContent={
                                 <div className="form-group">
                                     <label>Danh sách sinh viên:</label>
                                     <input type="file" className="form-control-file border" name="fileStudents"
                                            onChange={this.handleChange}/>
                                     <br/>
                                     <i style={{color: "red"}}>*Các định dạng cho phép: .xlsx .csv </i>
                                 </div>
                             }
                             />
            </div>
        )
    }
}