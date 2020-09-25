import React from "react";
import logo from "./icons/logo-uet.jpg";

import "./header.css";
import {getProfile,changePassword} from "../../api/authentication-api";
import {logOut} from "../../service/authen-service";
import ModalCustom from "../modal/modal";
import { notification } from "../../utils/noti";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.handleGetProfile = this.handleGetProfile.bind(this);

        this.state = {
            name: "",
            username: "",
            old_password:"",
            new_password: "",
            confirm_password: ""
        };
    }

    async handleGetProfile() {
        const res = await getProfile();
        if (res.success) {
            this.setState({
                name: res.data.profile.name,
                username: res.data.profile.user_name
            })
        } else {
            console.log(res.message)
        }
    }

    logOut = () => {
        logOut();
    };

    componentDidMount() {
        this.handleGetProfile();
    }

    handleChange = async (e) => {
        let newPassword = e.target.name;
        let val = e.target.value;
        this.setState({[newPassword]: val});
    }

    handleChangePassword = async () => {
        let {old_password, new_password, confirm_password} = this.state;
        if(new_password !== confirm_password){
            notification("warning", "Mật khẩu mới và nhập lại không giống nhau !");
        }else{
            let payload = {
                old_password : old_password,
                new_password : new_password
            }
            let result = await changePassword(payload);
            result.success === true ? notification("success","Cập nhật thành công")
                : notification("error",result.message);
        }
        
    };
    render() {
        return (
            <div className="header">
                <div className="header-left">
                    <img className="logo" src={logo} alt={"logo-uet.jpg"}/>
                    <div className="title">CỔNG THÔNG TIN ĐĂNG KÍ THI</div>
                </div>
                <div className="header-right">
                    <div className="dropdown">
                        <button className="btn dropdown-toggle btn-primary btn-size" type="button"
                                data-toggle="dropdown">
                            Chào mừng: {this.state.name} - <b>{this.state.username}</b>
                            <span className="caret"/>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-right">
                            <li className="btn-user btn-size" data-toggle="modal" data-target="#modalChangePassword">
                                <div>
                                    <i className="fas fa-user"/>
                                    Thay đổi mật khẩu
                                </div>
                            </li>
                            <li className="btn-logout btn-size" onClick={this.logOut}>
                                <div>
                                    <i className="fas fa-sign-out-alt"/>
                                    Đăng xuất
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <ModalCustom idModal="modalChangePassword"
                       title="Thay đổi mật khẩu "
                       brandButton="Chỉnh sửa "
                       acceptButton={
                           this.handleChangePassword
                       }
                       childrenContent={
                           <div>
                               <div className="form-group">
                                   <label>Mật khẩu cũ :</label>
                                   <input type="password" className="form-control" name="old_password" onChange={this.handleChange}/>
                               </div>
                               <div className="form-group">
                                   <label>Mật khẩu mới :</label>
                                   <input type="password" className="form-control" name="new_password" onChange={this.handleChange} />
                               </div>
                               <div className="form-group">
                                   <label>Nhập lại mật khẩu :</label>
                                   <input type="password" className="form-control" name="confirm_password" onChange={this.handleChange}/>
                               </div>
                           </div>
                       }
                />
            </div>

        );
    }
}

export default Header;
