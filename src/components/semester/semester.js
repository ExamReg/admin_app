import React from "react"
import "./semester.css"
import {getSemester} from "../../api/course-api";
class Semester extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            semesters:[],

            currentSemester:""
        }
        this.handleGetSemester = this.handleGetSemester.bind(this);
        this.selectSemester = this.selectSemester.bind(this);
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
    componentDidMount() {
        this.handleGetSemester();
    }
    selectSemester(semester) {
        this.setState({currentSemester: semester })
    }
    render() {
        return(
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
                        <th>Tên học kỳ </th>
                        <th className="style-center">Sửa </th>
                    </tr>
                </thead>
                <tbody>
                {
                    (this.state.semesters || []).map((e, index) =>{
                        return(
                            <tr key={index}>
                                <td>{e.value}</td>
                                <td className="style-center">
                                    <button className="btn btn-primary" style={{padding:"2px 5px"}} data-toggle="modal"
                                            data-target="#modalEditSemester" onClick={() => this.selectSemester(e.value)}>
                                        <i className="fas fa-edit"> </i>
                                    </button>

                                </td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
            <div id="modalAddNewSemester" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Thêm mới học kì</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Tên học kì: </label>
                                <input type="text" className="form-control"/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-dark btn-size"
                                    data-dismiss="modal">Hủy
                            </button>
                            <button type="button" className="btn btn-primary btn-size">Thêm mới</button>
                        </div>
                    </div>

                </div>
            </div>
            <div id="modalEditSemester" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Chỉnh sửa học kì </h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Tên học kì: </label>
                                <input type="text" className="form-control" value={this.state.currentSemester}/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-dark btn-size"
                                    data-dismiss="modal">Hủy
                            </button>
                            <button type="button" className="btn btn-primary btn-size">Chỉnh sửa </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>)
    }
}
export default Semester;