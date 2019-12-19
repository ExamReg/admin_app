import React from "react";
import "./style.css"
import PropTypes from "prop-types";

class GetByNumberPages extends React.Component{
    render() {
        let arr = [];
        for(let i=1; i<=this.props.pageNumbers; i++){
            arr.push(i);
        }
        return(
            <div className="pagination-custom">
                <ul id="page-numbers">
                    {
                        arr.map(number => {
                            if (this.props.currentPage === number) {
                                return (
                                    <li key={number} id={number} className="active">
                                        {number}
                                    </li>
                                )
                            }
                            else {
                                return (
                                    <li key={number} id={number} onClick={this.props.chosePage} >
                                        {number}
                                    </li>
                                )
                            }
                        })
                    }
                </ul>
            </div>
        );
    }
}
GetByNumberPages.propTypes = {
    chosePage: PropTypes.func.isRequired,
    pageNumbers:PropTypes.number,
    currentPage:PropTypes.number
};
export default GetByNumberPages;