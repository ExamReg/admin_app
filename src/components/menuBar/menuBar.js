import React from "react";
import "./menuBar.css";
import { NavLink } from "react-router-dom";

import iconHome from "./icons/icons8-home-page-24.png";
import iconPerson from "./icons/icons8-person-24.png";

export default class MenuBar extends React.Component {
  
  render() {
    return (
      
      <div className="list-menu">
          <ul>
              <li>
                  <NavLink activeStyle={{backgroundColor:'white'}} className="nav-link" to="/dashboard/course">
                      <img src={iconPerson} alt="icon-person" className="icons"/>
                      Quản lý khóa học
                  </NavLink>
              </li>
              <li>
                  <NavLink activeStyle={{backgroundColor:'white'}} className="nav-link" to="/dashboard/student">
                      <img src={iconHome} alt="icon-person" className="icons"/>
                      Quản lý sinh viên
                  </NavLink>
              </li>
          </ul>
      </div>
    );
  }
}
