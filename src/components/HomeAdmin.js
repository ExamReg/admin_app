import React from 'react';
import Head from './Header';
import Menu from './Menu';
import Courses from './ContentCourses';
import Add from './Add';
import Students from './ContentStudents';
import System from './ContentSystem';
import {Route,BrowserRouter as Router,Switch} from 'react-router-dom'
class Home extends React.Component{
    render(){
        return(
            <div>
                {/* <Router>
                    <Switch>
                        <Route path="/HomeAdmin" component={Courses} />
                        
                    </Switch>
                </Router> */}
            </div>
        );
    }
}
export default Home;