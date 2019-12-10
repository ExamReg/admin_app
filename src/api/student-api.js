import {sendGetRequest} from "./api-send";



export function getStudent(text) {
    let route = "/students?";
    if(text){
        route = route + `text=${text}`
    }
    return sendGetRequest(route)
}