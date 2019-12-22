import { sendGetRequestRoute1, sendGetRequestRoute2, sendPostRequest } from './api-send';

export function getCourse(query) {
    let route = `/courses?page_size=${query.page_size}&page_number=${query.page_number}&id_semester=${query.id_semester}`;
    if (query.text) {
        route += `&text=${query.text}`
    }
    return sendGetRequestRoute1(route)
}
export function getSemester() {
    let route = "/semesters";
    return sendGetRequestRoute2(route)
}
export function addNewCourse(data) {
    let route = "/courses";
    let headers = {
        token: localStorage.getItem("token"),
        'content-type': 'multipart/form-data'
    };
    return sendPostRequest(route, data, headers);
}
export function getCourseInfo(id_cs) {
    let route = `/courses/${id_cs}`;
    return sendGetRequestRoute2(route);
}
export function getStudentInCourse(id_cs) {
    let route = `/courses/${id_cs}/students`;
    return sendGetRequestRoute1(route);
}

export function postStudentNotEnoughCondition(id_cs, payload) {
    let route = `/courses/${id_cs}/import`;
    let headers = {
        token: localStorage.getItem("token"),
        'content-type': 'multipart/form-data'
    };
    return sendPostRequest(route, payload, headers)
}