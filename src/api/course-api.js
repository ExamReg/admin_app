import { sendGetRequestRoute1, sendGetRequestRoute2 , sendPostRequest} from './api-send';

export function getCourse(id_semester, text) {
    let route = `/courses?id_semester=${id_semester}&text=${text}`;
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
        'content-type': 'application/x-www-form-urlencoded'
    };
    return sendPostRequest(route, data, headers);
}