import React from 'react';
import "./register.css";
import {Link} from "react-router-dom";
import {registerUser} from "../../api/authentication-api";
import {notification} from "../../utils/noti";

class Register extends React.Component {
    constructor(props)
    {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.state={
            nameRegister:"",
            username:"",
            email:"",
            password:"",
            code:""
        }
    }
    handleChange(event)
    {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]:val})
    }
    async handleRegister()
    {
        const {nameRegister, username, email, password, code}  =this.state;
        if(nameRegister && username && email && password && code) {
            let data = {
                user_name: username,
                password: password,
                email: email,
                name: nameRegister,
                code: code
            }
            const res = await registerUser(data);
            if (res.success) {
                notification("success", "Đăng kí thành công ");
                this.setState({
                    nameRegister: "",
                    username: "",
                    email: "",
                    password: "",
                    code: ""
                })
            } else {
                notification("error", res.message)
            }
        }
        else {
            notification("warning", "Xin điền đủ thông tin ")
        }
    }
    render() {
        return(
            <div className="register-page">
                <div className="register-card">
                    <div className="register-card-header">
                        <h2 className="register-card-title">Đăng kí </h2>
                    </div>
                    <div className="register-card-body">
                        <form>
                            <div className="register-group">
                                <label>Họ và tên: </label>
                                <input type="text" name="nameRegister" onChange={this.handleChange} value={this.state.nameRegister}/>
                            </div>
                            <div className="register-group">
                                <label>UserName: </label>
                                <input type="text" name="username" onChange={this.handleChange} value={this.state.username}/>
                            </div>
                            <div className="register-group">
                                <label>Email: </label>
                                <input type="text" name="email" onChange={this.handleChange} value={this.state.email}/>
                            </div>
                            <div className="register-group">
                                <label>Password: </label>
                                <input type="password" name="password" onChange={this.handleChange} value={this.state.password}/>
                            </div>
                            <div className="register-group">
                                <label>Code: </label>
                                <input type="password" name="code" onChange={this.handleChange} value={this.state.code}/>
                            </div>
                        </form>
                    </div>
                    <div className="register-card-help">
                        <div className="group-link">
                            <Link to="/login" className="link-help"> Bạn đã có tài khoản </Link>
                        </div>

                    </div>
                    <div className="register-card-footer">
                        <button className="btn-register" onClick={this.handleRegister}>
                            Đăng kí
                        </button>
                    </div>
                </div>
            </div>

        );

    }
}
export default Register;