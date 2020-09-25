import {sendGetRequestRoute1, sendPostRequest, sendPutRequest} from "./api-send";

export function getExams(query) {
    let route = `/exams?id_semester=${query.id_semester}&text=${query.text}&page_size=${query.page_size}&page_number=${query.page_number}`;
    return sendGetRequestRoute1(route);
}
export function addNewExam(data) {
    let route = "/exams";
    let headers = {
        token: localStorage.getItem("token")
    };
    return sendPostRequest(route, data, headers);
}
export function editExam(data, idSlot) {
    let route = `/exams/${idSlot}`;
    return sendPutRequest(route, data);
}

export function printStudentInExam(id_slot) {
    let route = `/exams/students/print?id_slot=${id_slot}`;
    return sendGetRequestRoute1(route)
}