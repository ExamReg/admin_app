import React, { Component } from 'react';


import {Route,BrowserRouter as Router,Switch} from 'react-router-dom';
import Login from "./components/login/login";

class App extends Component {
    render() {
        return(
            <Router>
                <Switch>
                    <Route path="/" exact component={Login} />
                </Switch>
            </Router>
        );
    }
}

export default App;
