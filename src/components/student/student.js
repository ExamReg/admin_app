import React from 'react'
import './student.css'
import {getStudent} from "../../api/student-api";
import CreateStudent from '../modal/createStudent';


export default class Student extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            students: [],
            text: ""
        };
        this.delayTime = null;
    }

    async componentDidMount() {
        let result = await getStudent();
        if(result.success === true){
            this.setState({
                students: result.data.students
            })
        }
    }

    handleChange = (e) => {
        if(e.target.name === "text"){

        }
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.text !== this.state.text){
            this.handleTimeOut();
        }
    }

    handleTimeOut = () => {
        clearTimeout(this.delayTime);
        this.delayTime = setTimeout(async () => {
            let result = await getStudent(this.state.text);
            if(result.success === true){
                this.setState({
                    students: result.data.students
                })
            }
        }, 1000);
    };

    render() {
        return (
            <div className="student">
                <div className="student-header">
                    <div className="student-input"><input type="text" className="form-control" placeholder="Tên hoặc mã số sinh viên" onChange={this.handleChange} name="text"/></div>
                    {/* <div className="student-input"><input type="button" className="btn btn-primary" value="Thêm sinh viên"/></div> */}
                    <div className="student-input">
                        <CreateStudent/>
                    </div>
                </div>
                <div className="student-content">
                    <div className="tbl-student">
                        <table className="table">
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
                </div>
            </div>
        )
    }
}