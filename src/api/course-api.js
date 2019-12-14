import { sendGetRequestRoute1, sendGetRequestRoute2 } from './api-send';

export function getCourse() {
    let route = "/courses";
    // if (text) {
    //     route = route + `text=${text}`
    // }
    return sendGetRequestRoute1(route)
}
export function getSemester() {
    let route = "/semesters";
    return sendGetRequestRoute2(route)
}