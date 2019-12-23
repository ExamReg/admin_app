import React from 'react';
import PropTypes from 'prop-types';
import "./modal.css"

class ModelCustom extends React.Component {
    render() {
        let open = {
            className: "modal fade show",
            "aria-modal": "true",
            style: {
                display: "block"
            }
        };
        let close = {
            "aria-hidden": "true",
            style: {
                display: "none"
            },
            className: "modal fade",
        };
        return (
            <>
                {this.props.isOpen ? <div className="modal-backdrop fade show"/> : null}
                <div id={this.props.idModal} role="dialog" {...(this.props.isOpen ? open : close)} onClick={this.props.cancelButton}>
                    <div className="modal-dialog" >
                        <div className="modal-content" onClick={(e) =>{e.stopPropagation()}}>
                            <div className="modal-header">
                                <h4 className="modal-title">{this.props.title}</h4>
                                <button type="button" className="close" data-dismiss="modal" onClick={this.props.cancelButton}>&times;</button>
                            </div>
                            <div className="modal-body">

                                {this.props.childrenContent}

                            </div>
                            <div className="modal-footer">
                                <div className="modal-footer-left">
                                    {!this.props.buttonLeft ? null :
                                        <button className="btn btn-success" onClick={this.props.buttonLeft}>Reset
                                            password</button>}
                                </div>
                                <div className="modal-footer-right">
                                    <button type="button" className="btn btn-outline-dark btn-size"
                                            data-dismiss="modal" onClick={this.props.cancelButton}>Hủy
                                    </button>
                                    <button type="button" data-dismiss="modal" className="btn btn-primary btn-size btn-space"
                                            onClick={this.props.acceptButton}>
                                        {this.props.brandButton}
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        );
    }
}

ModelCustom.propTypes = {
    idModal:PropTypes.string,
    title: PropTypes.string,
    brandButton: PropTypes.string,
    acceptButton: PropTypes.func.isRequired,
    cancelButton: PropTypes.func,
    childrenContent: PropTypes.node,
    isOpen: PropTypes.bool
};

export default ModelCustom;