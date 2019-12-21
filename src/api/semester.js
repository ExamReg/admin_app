import {sendPostRequest, sendPutRequest} from "./api-send";

export function createNewSemester(data) {
    let route = "/semesters";
    let headers = {
        "content-type":"application/json",
        "token":localStorage.getItem("token")
    }
    return sendPostRequest(route, data, headers);
}
export function editSemester(id_semester, data) {
    let route = `/semesters/${id_semester}`;
    return sendPutRequest(route, data)
}