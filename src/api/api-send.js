import axios from "axios";
import {logOut} from "../service/authen-service"
import {notification} from "../utils/noti";

const URL_BASE = process.env.REACT_APP_API_URL + "/api/a";
function handleResult(res) {
    if (res.data.code === 23) {
        notification("error", "Phiên làm việc đã hết hạn. Xin vui lòng đăng nhập lại.");
        logOut();
        return res.data;
    } else {
        return res.data;
    }
}

export function sendGetRequestRoute1(route) {
    let url = `${URL_BASE}${route}`;
    let headers = {
        token: localStorage.getItem("token")
    };
    return axios.get(url, {headers}).then(handleResult);
}

export function sendGetRequestRoute2(route) {
    let url = `${URL_BASE}${route}`;
    let headers = {
        token: localStorage.getItem("token")
    };
    return axios.get(url, {headers}).then(handleResult);
}


export function sendPostRequest(route, payload, headers) {
    let url = `${URL_BASE}${route}`;
    return axios.post(url, payload, {headers}).then(handleResult);
}

export function sendPutRequest(route, payload) {
    let url = `${URL_BASE}${route}`;
    let headers = {
        token: localStorage.getItem("token")
    };
    return axios.put(url, payload, {headers}).then(handleResult);
}

export function sendDeleteRequest(route) {
    let url = `${URL_BASE}${route}`;
    let headers = {
        token: localStorage.getItem("token")
    };
    return axios.delete(url, {headers}).then(handleResult);
}

export function sendPostRequestWithoutToken(route, payload) {
    let url = `${URL_BASE}${route}`;
    return axios.post(url, payload).then(handleResult);
}