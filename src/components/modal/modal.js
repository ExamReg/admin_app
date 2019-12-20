import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {
    render() {
        return (
            <div id={this.props.idModal} className="modal fade" role="dialog">
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
                            <button type="button" className="btn btn-outline-dark btn-size"
                                    data-dismiss="modal">Hủy
                            </button>
                            <button type="button" className="btn btn-primary btn-size"
                                    onClick={this.props.acceptButton}>
                                {this.props.brandButton}
                            </button>
                        </div>
                    </div>

                </div>
            </div>

        );
    }
}

Modal.propTypes = {
    idModal:PropTypes.string,
    title: PropTypes.string,
    brandButton: PropTypes.string,
    acceptButton: PropTypes.func.isRequired,
    childrenContent: PropTypes.node,

};

export default Modal;