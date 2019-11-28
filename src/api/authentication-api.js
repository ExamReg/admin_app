import {sendPostRequestWithoutToken} from "./api-send";

export function login(data)
{
    let route="/login";
    return sendPostRequestWithoutToken(route, data);
}

