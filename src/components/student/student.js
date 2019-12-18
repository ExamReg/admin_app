import React from 'react'
import './student.css'
import {getStudent} from "../../api/student-api";
import Modal from "../modal/modal";

export default class Student extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [],
            text: "",
            show: false
        };
        this.delayTime = null;
    }

    async componentDidMount() {
        let result = await getStudent();
        if (result.success === true) {
            this.setState({
                students: result.data.students
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.text !== this.state.text) {
            this.handleTimeOut();
        }
    }

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

    render() {
        return (
            <div className="student">
                <div className="title">Quản lý sinh viên</div>
                <div className="student-header">
                    <div className="student-input">
                        <input type="text" className="input-find" placeholder="Nhập mã/tên số sinh viên"
                               onChange={this.handleChange} name="text"/>
                    </div>
                    <div className="student-input">
                        <button className="btn btn-primary btn-size">
                            <i className="fas fa-plus"/>
                            Thêm mới học sinh
                        </button>
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
                                <th className="title-edit">Sửa</th>
                            </tr>
                            </thead>
                            <tbody>
                            {(this.state.students || []).map((e, index) => {
                                return <tr key={e.id_student}>
                                    <td>{++index}</td>
                                    <td>{e.id_student}</td>
                                    <td>{e.name}</td>
                                    <td>{e.birthday}</td>
                                </tr>
                            })}
                            </tbody>
                        </table>
                    </div>
                    <Modal title="Test" onClose={() => {
                        this.setState({show: false})
                    }} show={this.state.show} addNew={() => {
                        console.log("add new")
                    }}/>
                </div>
            </div>
        )
    }
}