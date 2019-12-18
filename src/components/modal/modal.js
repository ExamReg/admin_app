import React from 'react';
import PropTypes from 'prop-types';
import "./style.css"

class Modal extends React.Component {
    render() {
        if(!this.props.show) {
            return null;
        }

        return (
            <div className="backdrop">
                <div className="modal">


                    <div className="modal-header">
                        <h2 className="modal-title">{this.props.title}</h2>
                        <button className="btn-close" onClick={this.props.onClose}>
                            x
                        </button>
                    </div>


                    <div className="modal-content">
                        {this.props.childrenContent}
                    </div>


                    <div className="modal-help">
                        {this.props.childrenHelp}
                    </div>

                    <div className="modal-footer">
                        <div className="footer-group">
                            <button className="btn-modal cancel" onClick={this.props.onClose}>
                                Hủy bỏ
                            </button>
                            <button className="btn-modal confirm" onClick={this.props.addNew}>
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
    title: PropTypes.string,
    brandButton: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    addNew:PropTypes.func.isRequired,
    show: PropTypes.bool,
    childrenContent: PropTypes.node,
    childrenHelp: PropTypes.node
};

export default Modal;