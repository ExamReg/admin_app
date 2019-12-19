import React, { Component } from 'react';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import "./tabCourse.css";
import 'react-web-tabs/dist/react-web-tabs.css';
import Course from "../course/course";
import Semester from "../semester/semester";

class TabCourse extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            idPanel:"one",
            componentPanel:<Course/>
        }

    }
    handleTab = (id, component) =>
    {
        this.setState({idPanel: id, componentPanel: component});
    }
    render() {
        return (
            <div className="container-tab">
                <div className="title">
                    Quản lý danh sách khóa học
                </div>
                <Tabs defaultTab="one">
                    <TabList>
                        <div className="tab-one">
                            <Tab tabFor="one" onClick={() => this.handleTab("one",<Course/>)}>Quản lý khóa học </Tab>
                            <Tab tabFor="two" onClick={() => this.handleTab("two",<Semester/>)}>Quản lý học kì  </Tab>
                        </div>
                    </TabList>
                    <TabPanel tabId={this.state.idPanel}>
                        {this.state.componentPanel}
                    </TabPanel>
                </Tabs>
            </div>

        );
    }
}
export default TabCourse;