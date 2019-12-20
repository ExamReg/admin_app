import {sendGetRequestRoute1, sendPostRequest} from "./api-send";

export function getListRoom() {
    let route="/rooms";
    return sendGetRequestRoute1(route);
}
export function addNewRoom(data) {
    let route = "/rooms";
    let headers = {
        "content-type":"application/json",
        "token":localStorage.getItem("token")
    }
    return sendPostRequest(route, data, headers)
}