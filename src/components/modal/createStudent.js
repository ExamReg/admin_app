import React from "react";
import "./create.css";

export default class createCourse extends React.Component {
  render() {
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          data-toggle="modal"
          data-target="#myModal"
          className="btn-create"
        >
          Thêm sinh viên
        </button>

        <div
          className="modal fade"
          id="myModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myModalLabel"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="myModalLabel">
                  Thêm sinh viên
                </h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-4">MSSV :</div>
                  <div className="col-md-4 col-md-offset-4">
                    <input type="text" name="" id=""/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">Học và tên :</div>
                  <div className="col-md-4 col-md-offset-4">
                    <input type="text" name="" id=""/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">Ngày sinh :</div>
                  <div className="col-md-4 col-md-offset-4">
                    <input className="birthday" type="date" name="" id=""/>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                >
                  Đóng
                </button>
                <button type="button" className="btn btn-primary">
                  Lưu thay đổi
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
