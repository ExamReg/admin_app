import React from "react";
import Select from "react-select";
import "./course.css";

const options = [
  { value: "Hoc ky 1 - NH:2019-2020", label: "Hoc ky 1 - NH:2019-2020" },
  { value: "Hoc ky 2 - NH:2019-2020", label: "Hoc ky 2 - NH:2019-2020" }
];
const courses = [
  { courses_num: "INT3302", name: "Phat trien ung dung web" },
  { courses_num: "INT3304", name: "Lap trinh nang cao" }
];
export default class Course extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedOption: null,
      courses:[]
    };
  }
  handleChange = (selectedOption) => {
      this.setState({selectedOption});
  };
  render() {
      const {selectedOption} = this.state;
    return (
      <div className="course">
        <div className="course-header">
          <div className="header-items">
            <input
              className="form-control"
              placeholder="Mã môn học hoặc tên môn học."
              type="text"
            />
          </div>
          <div className="header-items">
            <Select 
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
            />
          </div>
          <div className="header-items">
            <input
              className="btn btn-primary"
              type="button"
              value={"Create new"}
            />
          </div>
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
            <tbody>
              {courses.map((e, index) => {
                console.log(e.name);
                return (
                  <tr key={index}>
                    <td>{++index}</td>
                    <td>{e.courses_num}</td>
                    <td>{e.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
