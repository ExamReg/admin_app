import React from 'react';

import "./login.css";
import 'react-toastify/dist/ReactToastify.css';

import {login} from "../../api/authentication-api"
import {notification} from "../../utils/noti";
import {Link, Redirect} from "react-router-dom";

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

        this.state = {
            username: "",
            password: "",

            redirectTo: "",
            redirect: false
        }
    }

    handleChange(e) {
        let nam = e.target.name;
        let tex = e.target.value;
        this.setState({[nam]: tex});
    }

    async handleLogin() {
        const {username, password} = this.state;
        if (username && password) {
            let data = {
                user_name: username,
                password: password
            };
            let response = await login(data);
            if (response.success) {
                notification("success", "Login success.");
                localStorage.setItem("token", response.data.token);
                window.location.replace("/dashboard/courses");
                this.setState({
                    redirect: true,
                    redirectTo: "/dashboard"
                })
            } else {
                notification("error", response.message);
            }
        } else {
            notification("warning", "Xin điền đủ thông tin");
        }

    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirectTo}/>
        }
    };

    render() {
        return (
            <div>
                {this.renderRedirect()}
                <div className="login-page">
                    <div className="login-card">
                        <div className="login-card-header">
                            <h2 className="login-card-title">Đăng nhập </h2>
                        </div>
                        <div className="login-card-body">
                            <form>
                                <div className="login-group">
                                    <label>Tên đăng nhập: </label>
                                    <input type="text" name="username" onChange={this.handleChange}/>
                                </div>
                                <div className="login-group">
                                    <label>Mật khẩu : </label>
                                    <input type="password" name="password" onChange={this.handleChange}/>
                                </div>
                            </form>
                        </div>
                        <div className="login-card-help">
                            <div className="group-link">
                                <Link to="/register" className="link-help">Đăng kí</Link>
                                <button className="btn-forgetpass space" data-toggle="modal"
                                        data-target="#modalForgotPass">Quên mật khẩu?
                                </button>
                                <div id="modalForgotPass" className="modal fade" role="dialog">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h4 className="modal-title">Thay đổi mật khẩu </h4>
                                                <button type="button" className="close"
                                                        data-dismiss="modal">&times;</button>
                                            </div>
                                            <div className="modal-body">
                                                <div className="form-group">
                                                    <label>Email của bạn :</label>
                                                    <input type="text" className="form-control"/>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-outline-dark"
                                                        data-dismiss="modal">Hủy
                                                </button>
                                                <button type="button" className="btn btn-primary">Gửi</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="login-card-footer">
                            <button className="btn-login" onClick={this.handleLogin}>
                                Đăng nhập
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
