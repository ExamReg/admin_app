import React from "react"
import PropTypes from 'prop-types';
import "./confirmModal.css"
class ConfirmModal extends React.Component{
        render() {
            if(!this.props.show) {
                return null;
            }

            return (
                <div className="backdrop-confirm">
                    <div className="modall">

                        {this.props.childrenContent}

                        <div className="modal-footerr">
                            <div className="footer-groupp">
                                <button className="btn-modall cancel" onClick={this.props.onClose}>
                                    Hủy bỏ
                                </button>
                                <button className="btn-modall confirm" onClick={this.props.onPress}>
                                    {this.props.brandButton}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
}
ConfirmModal.propTypes = {
    brandButton: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    onPress:PropTypes.func.isRequired,
    show: PropTypes.bool,
    childrenContent: PropTypes.node,
};
export default ConfirmModal;