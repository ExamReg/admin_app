import React from 'react';
import Select from 'react-select';
import './course.css'

export default class Course extends React.Component{
    render() {
        return (
            <div className="course">
                <div className="course-header">
                    <div className="header-items"><input className="form-control" placeholder="Mã môn học hoặc tên môn học." type="text"/></div>
                    <div className="header-items"><Select/></div>
                    <div className="header-items"><input className="btn btn-primary" type="button" value={"Create new"}/></div>
                </div>
                <div className="course-content">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>STT</th>
                            <th>Course number</th>
                            <th>Course name</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        )
    }
}