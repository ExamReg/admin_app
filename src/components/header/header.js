import React from "react";
import logo from "./icons/logo-uet.jpg";
import iconPerson from "./icons/icons8-person-24.png";
import iconLogout from "./icons/icons8-exit-24 (1).png";
import "./header.css";

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    };
  }
  handleClick = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  logOut = () => {
    localStorage.removeItem("token");
    window.location.replace("/login");
  };
  render() {
    return (
      <div>
        <div className="header">
          <div className="header-left">
            <img className="logo" src={logo} alt={"logo-uet.jpg"} />
            <div className="title">CỔNG THÔNG TIN ĐĂNG KÍ HỌC </div>
          </div>
          <div className="header-right">
            <div class="dropdown">
              <button
                class="btn btn-primary dropdown-toggle"
                type="button"
                data-toggle="dropdown"
              >
                chào mừng: Hạp Tiến Quân - <b>1702xxxx</b>
                <span class="caret"></span>
              </button>
              <ul class="dropdown-menu">
                <li className="btn-user">
                  <div>
                    <img src={iconPerson} alt="icon-person" className="icons"/>
                    Thay đổi mật khẩu
                  </div>
                </li>
                <li className="btn-logout" onClick={this.logOut}>
                  <div>
                    <img src={iconLogout} alt="icon-logout"  className="icons"/>
                    Đăng xuất
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
