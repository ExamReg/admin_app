import { sendGetRequestRoute1 } from "./api-send";



export function getStudent(query) {
    let route = `/students?page_size=${query.page_size}&page_number=${query.page_number}`;
    if (query.text) {
        route = route + `&text=${query.text}`
    }
    return sendGetRequestRoute1(route)
}