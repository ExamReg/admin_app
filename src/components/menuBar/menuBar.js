import React from "react";
import "./menuBar.css";
import { NavLink } from "react-router-dom";

export default class MenuBar extends React.Component {
  
  render() {
    return (
      
      <div className="list-menu">

          <ul>
              <li>
                  <NavLink activeStyle={{backgroundColor:'white'}} to="/dashboard/course" className="nav-link">Quản lý các khóa học</NavLink>
                  <NavLink activeStyle={{backgroundColor:'white'}} to="/dashboard/student" className="nav-link">Quản lý sinh viên</NavLink>
              </li>
              <li></li>
              {/* <li><Link to="/dashboard/course" className="nav-link">Quản lí các khoá học</Link></li>
              <li><Link to="/dashboard/student" className="nav-link">Quản lí sinh viên</Link></li> */}
          </ul>
      </div>
    );
  }
}
