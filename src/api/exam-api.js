import {sendGetRequestRoute1, sendPostRequest} from "./api-send";

export function getExams(id_semester, textSearch) {
    let route = `/exams?id_semester=${id_semester}&text=${textSearch}`;
    return sendGetRequestRoute1(route);
}
export function addNewExam(data) {
    let route = "/exams";
    return sendPostRequest(route, data);
}