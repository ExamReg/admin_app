import React from "react";
import "./menuBar.css";
import {NavLink} from "react-router-dom";


export default class MenuBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show: true,
            check: "show"
        }
    }

    componentDidMount() {
        if(window.location.pathname === "/dashboard/courses" || window.location.pathname === "/dashboard/student"){
            this.setState({
                show: false,
                check: ""
            })
        }
    }

    render() {
        return (
            <div className="list-menu panel-group">
                <ul>
                    <li onClick={() => {this.setState({check: "", show: false}); }}>
                        <NavLink
                            activeStyle={{
                                backgroundColor: 'white',
                                color: "#077bff"
                            }}
                            className="nav-link"
                            to="/dashboard/course"
                            data-parent="#panelparent"
                        >
                            <i className="fas fa-home"></i>
                            <span>Quản lý khóa học</span>
                        </NavLink>
                    </li>
                    <li onClick={() => {this.setState({check: "", show: false});}}>
                        <NavLink
                            activeStyle={{
                                backgroundColor: 'white',
                                color: "#077bff"
                            }}
                            className="nav-link"
                            to="/dashboard/student"
                            data-parent="#panelparent"
                    >
                            <i className="fas fa-user"></i>
                            <span>Quản lý sinh viên</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={"nav-link set-tab"}
                            aria-expanded={this.state.show}
                            to="/dashboard/setting"

                            data-toggle="collapse" data-target="#demo"
                            onClick={() => {let showState = this.state.show; let stateCheck = this.state.check === "" ? "show" : ""; this.setState({show: !showState, check: stateCheck});}}
                        >
                            <div>
                                <i className="fas fa-cog"></i>
                                <span>Cài đặt</span>
                            </div>
                            <i className="fas fa-caret-down"></i>

                        </NavLink>
                        <div id="demo" className={"collapse " + this.state.check}>
                            <ul>
                                <li>
                                    <NavLink
                                        to="/dashboard/setting/semester"
                                        activeStyle={{
                                            backgroundColor: 'white',
                                            color: "#077bff",
                                            border: "none"
                                        }}
                                        className="panel-collapse collapse list-group-item nav-link child-tab">
                                        <i className="fas fa-caret-right"></i>
                                        Quản lý học kỳ
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/dashboard/setting/room"
                                        activeStyle={{
                                            backgroundColor: 'white',
                                            color: "#077bff",
                                            border: "none"
                                        }}
                                        className="panel-collapse collapse list-group-item nav-link child-tab">
                                        <i className="fas fa-caret-right"></i>
                                        Quản lý phòng học
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}
