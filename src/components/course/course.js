import React from "react";
import Select from "react-select";
import "./course.css";
import { getCourse, getSemester } from "../../api/course-api";
import CreateCourse from "../modal/createCourse";

export default class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      courses: [],
      semesters: [],
      text: ""
    };
    this.delayTime = null;
  }
  async componentDidMount() {
    let result = await getCourse();
    if (result.success === true) {
      this.setState({
        courses: result.data.courses
      });
      // console.log(this.state.courses)
    }
    let result2 = await getSemester();
    if (result2.success === true) {
      this.setState({
        semesters: result2.data.semesters
      });
      console.log(this.state.semesters);
    
    }
  }
  handleChangeData = e => {
    if (e.target.name === "text") {
    }
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.text !== this.state.text) {
      this.handleTimeOut();
    }
  }

  handleTimeOut = () => {
    clearTimeout(this.delayTime);
    this.delayTime = setTimeout(async () => {
      let result = await getCourse(this.state.text);
      if (result.success === true) {
        this.setState({
          students: result.data.students
        });
      }
    }, 1000);
  };
  render() {
    const { selectedOption } = this.state;
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
            <select>
              {
                 this.state.semesters.map((e,index) => {
                      return (
                    <option key={e.id_semester}>{e.value}</option>
                      );
                 })
               }
            </select>
               

          
          </div>
          <div className="header-items">
            {/* <input
              className="btn btn-primary"
              type="button"
              value={"Create new"}
            /> */}
           <CreateCourse />
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
              {(this.state.courses || []).map((e, index) => {
              
                return (
                  <tr key={index}>
                    <td>{++index}</td>
                    <td>{e.id_course}</td>
                    <td>{e.course_name}</td>
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
