import React from "react";
import logo from "./icons/logo-uet.jpg";

import "./header.css";
import {getProfile} from "../../api/authentication-api";
import Modal from "../modal/modal";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
        this.handleGetProfile = this.handleGetProfile.bind(this);

        this.state = {
            name: "",
            username: ""
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

    logOut() {
        localStorage.removeItem("token");
        window.location.replace("/login");
    };

    componentDidMount() {
        this.handleGetProfile();
    }

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
                            <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-right">
                            <li className="btn-user btn-size" data-toggle="modal" data-target="#modalChangePassword">
                                <div>
                                    <i className="fas fa-user"></i>
                                    Thay đổi mật khẩu
                                </div>
                            </li>
                            <li className="btn-logout btn-size" onClick={this.logOut}>
                                <div>
                                    <i className="fas fa-sign-out-alt"></i>
                                    Đăng xuất
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <Modal idModal="modalChangePassword"
                       title="Thay đổi mật khẩu "
                       brandButton="Chỉnh sửa "
                       acceptButton={
                           this.handleChangePassword
                       }
                       childrenContent={
                           <div>
                               <div className="form-group">
                                   <label>Mật khẩu cũ :</label>
                                   <input type="password" className="form-control"/>
                               </div>
                               <div className="form-group">
                                   <label>Mật khẩu mới :</label>
                                   <input type="password" className="form-control"/>
                               </div>
                               <div className="form-group">
                                   <label>Nhập lại mật khẩu :</label>
                                   <input type="password" className="form-control"/>
                               </div>
                           </div>
                       }
                />
            </div>

        );
    }
}

export default Header;
