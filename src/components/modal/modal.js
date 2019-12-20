import React from 'react';
import PropTypes from 'prop-types';
import "./modal.css"

class ModelCustom extends React.Component {
    render() {
        return (
            <div id={this.props.idModal} className="modal fade" role="dialog" show={this.props.show}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">{this.props.title}</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
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
                                        data-dismiss="modal">Hủy
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

        );
    }
}

ModelCustom.propTypes = {
    idModal:PropTypes.string,
    title: PropTypes.string,
    brandButton: PropTypes.string,
    acceptButton: PropTypes.func.isRequired,
    childrenContent: PropTypes.node
};

export default ModelCustom;