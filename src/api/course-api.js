import { sendGetRequestRoute1, sendGetRequestRoute2 } from './api-send';

export function getCourse(id_semester) {
    let route = `/courses?id_semester=${id_semester}`;
    return sendGetRequestRoute1(route)
}
export function getSemester() {
    let route = "/semesters";
    return sendGetRequestRoute2(route)
}