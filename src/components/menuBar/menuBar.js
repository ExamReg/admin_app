import React from 'react'
import "./menuBar.css"
import {Link} from "react-router-dom";

export default class MenuBar extends React.Component{
    render() {
        return (
            <div className="list-menu">
                <ul>
                    <li><Link to="/dashboard/course" className="nav-link">Quản lí các khoá học</Link></li>
                    <li><Link to="/dashboard/student" className="nav-link">Quản lí sinh viên</Link></li>
                </ul>
            </div>
        )
    }
}