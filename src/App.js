import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import {Route,BrowserRouter as Router,Switch} from 'react-router-dom';
// import Home from './HomeAdmin';
import Login from './components/Login';
import Courses from './components/ContentCourses';
import Add from './components/Add';
import Students from './components/ContentStudents';
import System from './components/ContentSystem';
import AddStudent from './components/AddStudent';

class App extends Component {
    render() {
        return(
            <Router>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/HomeAdmin" exact component={Courses} />
                    <Route path="/HomeAdmin/Courses" exact component={Courses} />
                    <Route path="/HomeAdmin/Students" exact component={Students} />
                    <Route path="/HomeAdmin/System" exact component={System} />
                    <Route path="/HomeAdmin/Add" exact component={Add} />
                    <Route path="/HomeAdmin/AddStudent" exact component={AddStudent} />
                </Switch>
            </Router>
        );
    }
}

export default App;
