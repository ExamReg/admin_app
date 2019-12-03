import React, {Component} from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Redirect} from "react-router-dom";
import {APP_ROUTES} from "./app-routes";

class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        {
                            APP_ROUTES.map(route => (
                                <Route
                                    path={route.path}
                                    {...{exact: route.exact}}
                                    component={
                                        route.require_authen ? checkAuthen(route.component) : checkUnAuthen(route.component)
                                    }
                                />
                            ))
                        }
                    </Switch>
                </Router>
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

export default App;
