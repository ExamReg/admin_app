import { sendGetRequestRoute1 } from "./api-send";



export function getStudent(text) {
    let route = "/students?";
    if (text) {
        route = route + `text=${text}`
    }
    return sendGetRequestRoute1(route)
}