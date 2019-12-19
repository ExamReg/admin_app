import React from "react";
import "./pagination.css";
import PropTypes from "prop-types";

class Pagination extends React.Component{
    render() {
        return (
            <div className="news-per-page">
                Đang hiển thị: &nbsp; &nbsp;
                <select defaultValue={this.props.page_size} onChange={this.props.changePageSize} >
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="200">200</option>


                </select>

            </div>
        );
    }
}
Pagination.propTypes = {
    changePageSize: PropTypes.func.isRequired
};
export default Pagination;