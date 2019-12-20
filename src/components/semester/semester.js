import React from "react"
import "./semester.css"
import {getSemester} from "../../api/course-api";
import ModelCustom from "../modal/modal";

class Semester extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            semesters: [],

            currentSemester: ""
        };
        this.handleGetSemester = this.handleGetSemester.bind(this);
        this.selectSemester = this.selectSemester.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async handleGetSemester() {
        let res = await getSemester();
        if (res.success) {
            this.setState({
                semesters: res.data.semesters
            });
        } else {
            console.log(res.message)
        }
    }

    selectSemester(semester) {
        this.setState({currentSemester: semester})
    }

    handleChange(e) {
        let nam = e.target.name;
        let val = e.target.value;
        this.setState({[nam]: val})
    }

    componentDidMount() {
        this.handleGetSemester();
    }

    render() {
        return (
            <div className="container-semester">
                <div className="header-semester">
                    <button type="button" className="btn btn-primary btn-size header-items" data-toggle="modal"
                            data-target="#modalAddNewSemester">
                        <i className="fas fa-plus"></i>
                        Thêm mới học kì
                    </button>
                </div>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Tên học kỳ</th>
                        <th className="style-center">Sửa</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        (this.state.semesters || []).map((e, index) => {
                            return (
                                <tr key={index}>
                                    <td>{e.value}</td>
                                    <td className="style-center">
                                        <button className="btn btn-primary" style={{padding: "2px 5px"}}
                                                data-toggle="modal"
                                                data-target="#modalEditSemester"
                                                onClick={() => this.selectSemester(e.value)}>
                                            <i className="fas fa-edit"> </i>
                                        </button>

                                    </td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>

                <ModelCustom idModal="modalAddNewSemester"
                       title="Thêm mới học kỳ "
                       brandButton="Thêm mới"
                       acceptButton={this.handleAddNewSemester}
                       childrenContent={
                           <div>
                               <div className="form-group">
                                   <label>Tên học kì: </label>
                                   <input type="text" className="form-control"/>
                               </div>
                           </div>
                       }
                />
                <ModelCustom idModal="modalEditSemester"
                       title="Chỉnh sửa học kỳ "
                       brandButton="Chỉnh sửa "
                       acceptButton={
                           this.handleEditSemester
                       }
                       childrenContent={
                           <div>
                               <div className="form-group">
                                   <label>Tên học kì: </label>
                                   <input type="text" className="form-control" name="nameCourse"
                                          value={this.state.currentSemester} onChange={this.handleChange}/>
                               </div>
                           </div>
                       }
                />
            </div>)
    }
}

export default Semester;