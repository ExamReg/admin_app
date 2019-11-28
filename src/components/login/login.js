import React from 'react';

import "./style.css";
import 'react-toastify/dist/ReactToastify.css';

import {login} from "../../api/authentication-api"
import {notification} from "../../utils/noti";

class Login extends React.Component{

    constructor(props)
    {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

        this.state={
            username:"",
            password:""
        }
    }
    handleChange(e){
        let nam = e.target.name;
        let tex = e.target.value;
        this.setState({[nam]:tex});
    }
    async handleLogin(){
        const {username, password} = this.state;
        console.log("login")
        if(username && password)
        {
            let data = {
                user_name:username,
                password:password
            };
            let response = await login(data);
            if(response.success)
            {
                console.log("success")
            }else{
                notification("error",response.message);
            }
        }
        else
        {
            notification("warning", "Xin điền đủ thông tin");
        }

    }

    render() {
        return(
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
                    <div className="login-card-footer">
                        <button className="btn-login" onClick={this.handleLogin}>
                            Đăng nhập
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;
