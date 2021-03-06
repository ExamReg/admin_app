import React from 'react';
import Header from "../header/header";
import MenuBar from "../menuBar/menuBar";
import "./home.css"
import {Redirect, Route, Switch} from "react-router-dom";
import {HOME_ROUTES} from "./home_routes";


class Home extends React.Component {

    render() {
        return (
                <div>
                    <div className="header"><Header/></div>
                    <div className="content">
                        <div className="content-left"><MenuBar/></div>
                        <div className="content-right">
                            <Switch>
                                {
                                    HOME_ROUTES.map(e => (
                                            <Route key={e.path} path={e.path} component={e.component} exact/>
                                        )
                                    )
                                }
                                <Redirect to={"/dashboard/courses"}/>
                            </Switch>
                        </div>
                    </div>
                </div>
        )
    }
}

export default Home;


