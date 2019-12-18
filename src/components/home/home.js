import React from 'react';
import Header from "../header/header";
import MenuBar from "../menuBar/menuBar";
import "./home.css"
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {HOME_ROUTES} from "./home_routes";


class Home extends React.Component {


    render() {
        return (
            // this.props.location.pathname === '/dashboard' ? <Redirect to=
            <BrowserRouter>
                <div className="header"><Header/></div>
                <div className="content">
                    <div className="content-left"><MenuBar/></div>
                    <div className="content-right">
                        <Switch>
                            {
                                HOME_ROUTES.map(e => (
                                
                                    <Route  key={e.path} path={e.path} exact={e.exact} component={e.component}/>
                                    )
                                )
                            }
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

export default Home;


