import React from "react";
import "./menuBar.css";
import {NavLink} from "react-router-dom";


export default class MenuBar extends React.Component {

    render() {
        return (

            <div className="list-menu">
                <ul>
                    <li>
                        <NavLink
                            activeStyle={{
                                backgroundColor: 'white',
                                color: "#077bff"
                            }}
                            className="nav-link"
                            to="/dashboard/course"
                        >
                            <i className="fas fa-home"></i>
                            <span>Quản lý khóa học</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            activeStyle={{
                                backgroundColor: 'white',
                                color: "#077bff"
                            }}
                            className="nav-link"
                            to="/dashboard/student"
                        >
                            <i className="fas fa-user"></i>
                            <span>Quản lý sinh viên</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        );
    }
}
