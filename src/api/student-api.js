import {sendGetRequestRoute1, sendPostRequest, sendPutRequest} from "./api-send";



export function getStudent(query) {
    let route = `/students?page_size=${query.page_size}&page_number=${query.page_number}`;
    if (query.text) {
        route = route + `&text=${query.text}`
    }
    return sendGetRequestRoute1(route)
}

export function resetPasswordOfStudent(id_student) {
    let route = `/students/${id_student}/passwords`;
    return sendPutRequest(route);
}

export function updateStudent(id_student, payload) {
    let route = `/students/${id_student}`;
    return sendPutRequest(route, payload);
}

export function importStudent(payload) {
    let route = "/students/import";
    return sendPostRequest(route, payload, {
        token: localStorage.getItem("token"),
        'content-type': 'multipart/form-data'
    });
}