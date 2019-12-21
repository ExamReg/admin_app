import React from "react"
import "./semester.css"
import {getSemester} from "../../api/course-api";
import {createNewSemester, editSemester} from "../../api/semester";
import ModelCustom from "../modal/modal";
import {notification} from "../../utils/noti";

class Semester extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            semesters: [],

            idSemester:"",
            semesterEdit:"",

            semesterAdd:"",
            checkSemestersWhenAdd:false
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

    selectSemester(id_semester, name_semester) {
        this.setState({idSemester: id_semester, semesterEdit: name_semester})
    }

    handleChange(e) {
        let nam = e.target.name;
        let val = e.target.value;
        this.setState({[nam]: val})
    }
    handleAddNewSemester = async () =>{
        const {semesterAdd} = this.state;
        let data={
            value: semesterAdd
        }
        if(semesterAdd)
        {
            const res = await createNewSemester(data)
            if(res.success)
            {
                notification("success", "Tạo mới học kỳ thành công ")
                this.setState({
                    semesterAdd: "",
                    checkSemestersWhenAdd:true
                })
            }
            else
            {
                notification("error", res.message)
            }
        }
        else
        {
            notification("warning", "Xin điền đủ thông tin ")
        }
    }
    handleEditSemester = async () =>{
        const {idSemester, semesterEdit} = this.state;
        let data={
            value:semesterEdit
        }
        if(semesterEdit)
        {
            const res = await editSemester(idSemester, data);

            if(res.success)
            {
                notification("success", "Chỉnh sửa tên học kỳ thành công ");
                this.setState({semesterEdit:"",checkSemestersWhenAdd:true});
            }
            else{
                notification("error", res.message)
            }
        }
        else {
            notification("warning", "Xin hãy điền đầy đủ thông tin ")
        }
    }

    componentDidMount() {
        this.handleGetSemester();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.checkSemestersWhenAdd)
        {
            this.handleGetSemester();
            this.setState({checkSemestersWhenAdd:false})
        }
    }

    render() {
        return (
            <div className="container-semester">
                <div className="title">
                    Quản lý học kỳ
                </div>
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
                        <th>STT</th>
                        <th>Tên học kỳ</th>
                        <th className="style-center">Sửa</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        (this.state.semesters || []).map((e, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{e.value}</td>
                                    <td className="style-center">
                                        <button className="btn btn-primary" style={{padding: "2px 5px"}}
                                                data-toggle="modal"
                                                data-target="#modalEditSemester"
                                                onClick={() => this.selectSemester(e.id_semester, e.value)}>
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
                                   <input type="text" className="form-control" name="semesterAdd" value={this.state.semesterAdd} onChange={this.handleChange}/>
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
                                   <input type="text" className="form-control" name="semesterEdit"
                                          value={this.state.semesterEdit} onChange={this.handleChange}/>
                               </div>
                           </div>
                       }
                />
            </div>)
    }
}

export default Semester;