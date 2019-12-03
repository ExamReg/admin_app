import Login from "./components/login/login";
import Menu from "./components/Menu";
import Header from "./components/header/header";

export const APP_ROUTES = [
    {
        path: "/login",
        component: Login,
        require_authen: false
    }, {
        path: "/register",
        component: Menu,
        require_authen: false
    }, {
        path: "/dashboard",
        component: Header,
        require_authen: true
    }, {
        path: "/settings",
        component: Header,
        require_authen: true
    }
];