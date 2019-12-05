import React from 'react';
import "./register.css";
import {Link} from "react-router-dom";

class Register extends React.Component {

    render() {
        return(<div className="register-page">
                <div className="register-card">
                    <div className="register-card-header">
                        <h2 className="register-card-title">Đăng kí </h2>
                    </div>
                    <div className="register-card-body">
                        <form>
                            <div className="register-group">
                                <label>Họ và tên: </label>
                                <input type="text" name="name_register" onChange={this.handleChange}/>
                            </div>
                            <div className="register-group">
                                <label>UserName: </label>
                                <input type="text" name="name_register" onChange={this.handleChange}/>
                            </div>
                            <div className="register-group">
                                <label>Email: </label>
                                <input type="text" name="name_register" onChange={this.handleChange}/>
                            </div>
                            <div className="register-group">
                                <label>Password: </label>
                                <input type="password" name="name_register" onChange={this.handleChange}/>
                            </div>
                            <div className="register-group">
                                <label>Code: </label>
                                <input type="text" name="name_register" onChange={this.handleChange}/>
                            </div>
                        </form>
                    </div>
                    <div className="register-card-help">
                        <div className="group-link">
                            <Link to="/login" className="link-help"> Bạn đã có tài khoản </Link>
                        </div>

                    </div>
                    <div className="register-card-footer">
                        <button className="btn-register">
                            Đăng kí
                        </button>
                    </div>
                </div>
            </div>

        );

    }
}
export default Register;