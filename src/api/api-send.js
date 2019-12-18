import axios from "axios";

const URL_BASE1 = process.env.REACT_APP_API_URL + "/api/a";
const URL_BASE2 = process.env.REACT_APP_API_URL + "/api/g";



function handleResult(res) {
    return res.data;
}

export function sendGetRequestRoute1(route) {
    let url = `${URL_BASE1}${route}`;
    let headers = {
        token: localStorage.getItem("token")
    };
    return axios.get(url, { headers }).then(handleResult);
}
export function sendGetRequestRoute2(route) {
    let url = `${URL_BASE2}${route}`;
    let headers = {
        token: localStorage.getItem("token")
    };
    return axios.get(url, { headers }).then(handleResult);
}


export function sendPostRequest(route, payload, headers) {
    let url = `${URL_BASE1}${route}`;
    return axios.post(url, payload, { headers }).then(handleResult);
}

export function sendPutRequest(route, payload) {
    let url = `${URL_BASE1}${route}`;
    let headers = {
        token: localStorage.getItem("token")
    };
    return axios.put(url, payload, { headers }).then(handleResult);
}

export function sendDeleteRequest(route) {
    let url = `${URL_BASE1}${route}`;
    let headers = {
        token: localStorage.getItem("token")
    };
    return axios.delete(url, { headers }).then(handleResult);
}

export function sendPostRequestWithoutToken(route, payload) {
    let url = `${URL_BASE1}${route}`;
    return axios.post(url, payload).then(handleResult);
}