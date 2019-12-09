import React from 'react'
import "./menuBar.css"
import {Link} from "react-router-dom";

export default class MenuBar extends React.Component{
    render() {
        return (
            <div className="list-menu">
                <ul>
                    <Link to="/dashboard/task1" classname="nav-link"><li>This is line one</li></Link>
                    <Link to="/dashboard/task1" classname="nav-link"><li>This is line Tow</li></Link>
                </ul>
            </div>
        )
    }
}