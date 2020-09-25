import {toast } from 'react-toastify';

const toast_config = {
    closeButton: true,
    showAnimation: 'animated fadeIn',
    hideAnimation: 'animated fadeOut',
    position: toast.POSITION.BOTTOM_RIGHT
};

export function notification(type, message) {
    const _type = {success: 'success', info: 'info', warning: 'warning', error: 'error'}[type] || 'success';
    if (toast) {
        toast[_type](message, toast_config);
    }
}
