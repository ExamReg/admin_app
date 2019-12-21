import React from "react";
import {getListRoom, addNewRoom, editRoom} from "../../api/room-api";
import Modal from "../modal/modal";
import {notification} from "../../utils/noti";

class Room extends  React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            rooms:[],

            nameRoom:"",
            numberSeat:"",

            nameRoomEdit:"",
            numberSeatEdit:"",
            id_room_change: "",
            changeRooms:false
        }
    }
    handleChange = (e) => {
        let nam = e.target.name;
        let val = e.target.value;
        this.setState({[nam]: val})
    }
    getRooms = async () =>{
        const res = await getListRoom();
        if(res.success)
        {
            this.setState({rooms: res.data.rooms})
        }
    }
    clickEditRoom = (num, seat, key) =>{
        this.setState({
            nameRoomEdit: num,
            numberSeatEdit: seat,
            id_room_change: key
        })
    }
    addNewRoom = async () =>{
        let {nameRoom, numberSeat} = this.state;
        if(nameRoom && numberSeat) {
            let data = {
                location: nameRoom,
                maximum_seating: numberSeat
            }

            const res = await addNewRoom(data);
            if (res.success) {
                this.setState({
                    nameRoom:"",
                    numberSeat:"",
                    changeRooms:true,

                    nameRoomEdit:"",
                    numberSeatEdit:"",
                })
                notification("success", "Tạo mới khóa học thành công ")
            } else
                notification("error", res.message)
        }
        else {
            notification("warning", "Xin điền đủ thông tin ")
        }
    }
    editRoom = async () =>{
        let {nameRoomEdit, numberSeatEdit, id_room_change} = this.state;
        console.log(this.state)
        let payload = {
            location:nameRoomEdit,
            maximum_seating:numberSeatEdit
        }
        let result = await editRoom(id_room_change,payload);
        result.success === true ? notification("success", "Cập nhật thành công.") : notification("error", result.message);
        this.componentDidMount();
    }
    
    componentDidMount() {
        this.getRooms();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.changeRooms)
        {
            this.getRooms();
            this.setState({
                changeRooms:false
            })
        }
    }

    render() {
        return (
            <div className="container-semester">
                <div className="title">
                    Quản lý phòng học
                </div>
                <div className="header-semester">
                    <button type="button" className="btn btn-primary btn-size header-items" data-toggle="modal"
                            data-target="#modalAddNewRoom">
                        <i className="fas fa-plus"></i>
                        Thêm mới phòng học
                    </button>
                </div>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên phòng học </th>
                        <th>Chỗ ngồi </th>
                        <th className="style-center">Sửa</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        (this.state.rooms || []).map((e, index) =>{
                            return(
                            <tr key={e.id_room}>
                                <td>{index+1}</td>
                                <td>{e.location}</td>
                                <td>{e.maximum_seating}</td>
                                <td className="style-center">
                                    <button className="btn btn-primary" style={{padding: "2px 5px"}}
                                        data-toggle="modal" data-target="#modalEditRoom"
                                        onClick={() => this.clickEditRoom(e.location, e.maximum_seating, e.id_room)}
                                    >
                                        <i className="fas fa-edit"> </i>
                                    </button>

                                </td>
                            </tr>)
                        })
                    }
                    </tbody>
                </table>
                <Modal acceptButton={this.addNewRoom}
                       idModal="modalAddNewRoom"
                       title="Thêm mới phòng học "
                       brandButton="Thêm mới "
                       childrenContent={
                           <div>
                               <div className="form-group">
                                   <label>Tên phòng học: </label>
                                   <input type="text" className="form-control" name="nameRoom" onChange={this.handleChange} value={this.state.nameRoom}/>

                               </div>
                               <div className="form-group">
                                   <label>Số chỗ ngồi: </label>
                                   <input type="text" className="form-control" name="numberSeat" onChange={this.handleChange} value={this.state.numberSeat}/>

                               </div>
                           </div>

                       }
                       />
                <Modal acceptButton={this.editRoom}
                       idModal="modalEditRoom"
                       title="Chỉnh sửa thông tin phòng học "
                       brandButton="Chỉnh sửa "
                       childrenContent={
                           <div>
                               <div className="form-group">
                                   <label>Tên phòng học: </label>
                                   <input type="text" className="form-control" name="nameRoomEdit" onChange={this.handleChange} value={this.state.nameRoomEdit}/>

                               </div>
                               <div className="form-group">
                                   <label>Số chỗ ngồi: </label>
                                   <input type="text" className="form-control" name="numberSeatEdit" onChange={this.handleChange} value={this.state.numberSeatEdit}/>

                               </div>
                           </div>
                       }
                       />
            </div>
        );
    }
}
export  default Room;