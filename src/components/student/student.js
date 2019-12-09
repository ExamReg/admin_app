import React from 'react'
import Select from 'react-select';
import './student.css'

export default class Student extends React.Component{
    render() {
        const options = [
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' },
        ];
        return(
            <div className="student">
                <div className="student-header">
                    <div className="student-input"><input type="text" placeholder="Name or mssv"/></div>
                    <div className="student-select"><Select options={options}/></div>
                    <div className="student-input"><input type="button" value="Create new"/></div>
                </div>
                <div className="student-content">
                    <div className="tbl-student">
                        <table>
                            <thead>
                            <tr>
                                <th>STT</th>
                                <th>MSSV</th>
                                <th>Name</th>
                                <th>Birthday</th>
                                <th className="title-edit">Sửa</th>
                            </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        )
    }
}