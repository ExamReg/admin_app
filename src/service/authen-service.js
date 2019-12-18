let listCallback = [];


export function registerEvent(from, call){
    listCallback[from] = call;
}

function runCallBack() {
    for(let call in listCallback){
        listCallback[call]();
    }
}

export function logOut() {
    localStorage.removeItem("token");
    runCallBack();
}
