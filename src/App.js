import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {ToastContainer} from "react-toastify";
import 'jquery'
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import '@fortawesome/fontawesome-free/css/all.css'
import {Redirect} from "react-router-dom";
import {APP_ROUTES} from "./app-routes";
import Redirector from "./utils/redirector";
import {registerEvent} from "./service/authen-service";
import "./App.css"
class App extends Component {

    componentDidMount() {
        registerEvent("App", () => {
            this.forceUpdate();
        });
    }

    render() {
        return (
            <div>
                <Switch>
                    {
                        APP_ROUTES.map(route => (
                            <Route
                                key={route.path}
                                path={route.path}
                                component={
                                    route.require_authen ? checkAuthen(route.component) : checkUnAuthen(route.component)
                                }
                            />
                        ))
                    }
                    <Redirect to={"/dashboard"}/>
                </Switch>
                <Redirector/>
                <ToastContainer/>
            </div>
        );
    }
}

function checkAuthen(component) {
    return localStorage.getItem("token") ? component : () => <Redirect to="/login"/>
}

function checkUnAuthen(component) {
    return !localStorage.getItem("token") ? component : () => <Redirect to="/dashboard"/>
}

export default App