import { sendPostRequestWithoutToken, sendGetRequestRoute1, sendPutRequest } from "./api-send";

export function login(data) {
    let route = "/login";
    console.log(route)
    return sendPostRequestWithoutToken(route, data);
}

export function registerUser(data) {
    let route = "/register";
    return sendPostRequestWithoutToken(route, data)
}

export function getProfile() {
    let route = "/profile";
    return sendGetRequestRoute1(route);
}
export function changePassword(payload) {
    let route = "/passwords";
    return sendPutRequest(route, payload);
}