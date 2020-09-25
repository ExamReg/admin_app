import React from "react";
import {getListRoom, addNewRoom, editRoom} from "../../api/room-api";
import Modal from "../modal/modal";
import {notification} from "../../utils/noti";
import "./room.css"

class Room extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],

            nameRoom: "",
            numberSeat: "",

            nameRoomEdit: "",
            numberSeatEdit: "",
            id_room_change: "",
            changeRooms: false,
            isOpenAddRoomModal: false,
            isOpenEditRoomModal: false
        }
    }
    deleteDataInEdit = () =>{
        this.setState({
            nameRoomEdit: "",
            numberSeatEdit: "",
            isOpenEditRoomModal: false
        })
    };
    deleteDataInAdd = () =>{
        this.setState({
            nameRoom: "",
            numberSeat: "",
            isOpenAddRoomModal: false
        })
    };

    handleChange = (e) => {
        let nam = e.target.name;
        let val = e.target.value;
        this.setState({[nam]: val})
    };
    getRooms = async () => {
        const res = await getListRoom();
        if (res.success) {
            this.setState({rooms: res.data.rooms})
        }
    };
    clickEditRoom = (num, seat, key) => {
        this.setState({
            nameRoomEdit: num,
            numberSeatEdit: seat,
            id_room_change: key,
            isOpenEditRoomModal: true
        })
    };
    addNewRoom = async () => {
        let {nameRoom, numberSeat} = this.state;
        if (nameRoom && numberSeat) {
            let data = {
                location: nameRoom,
                maximum_seating: numberSeat
            };

            const res = await addNewRoom(data);
            if (res.success) {
                notification("success", "Tạo mới khóa học thành công ")
                this.deleteDataInAdd();
            } else
                notification("error", res.message)
        } else {
            notification("warning", "Xin điền đủ thông tin ")
        }
    };
    editRoom = async () => {
        let {nameRoomEdit, numberSeatEdit, id_room_change} = this.state;
        if(nameRoomEdit && numberSeatEdit) {
            let payload = {
                location: nameRoomEdit,
                maximum_seating: numberSeatEdit
            };
            let result = await editRoom(id_room_change, payload);
            if(result.success)
            {
                this.setState({changeRooms:true, isOpenEditRoomModal: false});
                notification("success", "Chỉnh sửa thông tin lớp học thành công")
            }
            else {
                notification("error", result.message);
            }
        }
        else {
            notification("warning", "Xin điền đủ thông tin ")
        }
    };

    componentDidMount() {
        this.getRooms();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.changeRooms) {
            this.getRooms();
            this.setState({
                changeRooms: false
            })
        }
    }

    render() {
        return (
            <div className="container-room">
                <div className="title">
                    Quản lý phòng học
                </div>
                <div className="header-room">
                    <button type="button" className="btn btn-primary btn-size header-items"
                            onClick={() => {this.setState({isOpenAddRoomModal: true})}}>
                        <i className="fas fa-plus"/>
                        Thêm mới phòng học
                    </button>
                </div>
                <div className="body-room">
                    <div className="tbl-room">
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên phòng học</th>
                                <th>Chỗ ngồi</th>
                                <th className="style-center">Sửa</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                (this.state.rooms || []).map((e, index) => {
                                    return (
                                        <tr key={e.id_room}>
                                            <td>{index + 1}</td>
                                            <td>{e.location}</td>
                                            <td>{e.maximum_seating}</td>
                                            <td className="style-center">
                                                <button className="btn btn-info" style={{padding: "2px 5px"}}
                                                        onClick={() => this.clickEditRoom(e.location, e.maximum_seating, e.id_room)}
                                                >
                                                    Chỉnh sửa
                                                </button>

                                            </td>
                                        </tr>)
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
                <Modal acceptButton={this.addNewRoom}
                       idModal="modalAddNewRoom"
                       title="Thêm mới phòng học "
                       brandButton="Thêm mới "
                       cancelButton={this.deleteDataInAdd}
                       isOpen={this.state.isOpenAddRoomModal}
                       childrenContent={
                           <div>
                               <div className="form-group">
                                   <label>Tên phòng học: </label>
                                   <input type="text" className="form-control" name="nameRoom"
                                          onChange={this.handleChange} value={this.state.nameRoom}/>

                               </div>
                               <div className="form-group">
                                   <label>Số chỗ ngồi: </label>
                                   <input type="text" className="form-control" name="numberSeat"
                                          onChange={this.handleChange} value={this.state.numberSeat}/>

                               </div>
                           </div>

                       }
                />
                <Modal acceptButton={this.editRoom}
                       idModal="modalEditRoom"
                       title="Chỉnh sửa thông tin phòng học "
                       brandButton="Chỉnh sửa "
                       cancelButton={this.deleteDataInEdit}
                       isOpen={this.state.isOpenEditRoomModal}
                       childrenContent={
                           <div>
                               <div className="form-group">
                                   <label>Tên phòng học: </label>
                                   <input type="text" className="form-control" name="nameRoomEdit"
                                          onChange={this.handleChange} value={this.state.nameRoomEdit}/>

                               </div>
                               <div className="form-group">
                                   <label>Số chỗ ngồi: </label>
                                   <input type="text" className="form-control" name="numberSeatEdit"
                                          onChange={this.handleChange} value={this.state.numberSeatEdit}/>

                               </div>
                           </div>
                       }
                />
            </div>
        );
    }
}

export default Room;