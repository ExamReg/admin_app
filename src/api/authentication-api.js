import {sendPostRequestWithoutToken, sendGetRequestRoute1} from "./api-send";

export function login(data)
{
    let route="/login";
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