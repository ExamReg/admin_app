import React from 'react';
import Header from "../header/header";
import MenuBar from "../menuBar/menuBar";
import "./home.css"
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Course from '../course/course'
import Student from "../student/student";

class Home extends React.Component {
    constructor(props) {
        super();
        this.state = {
            path: "/dashboard/course"
        }
    }

    render() {
        return (
            <BrowserRouter>
                <div className="header"><Header/></div>
                <div className="content">
                    <div className="content-left"><MenuBar/></div>
                    <div className="content-right">
                        <Switch>
                            <Route path="/dashboard/course" component={Course}/>
                            <Route path="/dashboard/student" component={Student}/>
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

export default Home;


