import Login from "./components/login/login";
import Home from "./components/home/home";
import Register from "./components/register/register";

export const APP_ROUTES = [
    {
        path: "/login",
        component: Login,
        require_authen: false
    },
    // {
    //     path: "/register",
    //     component: Menu,
    //     require_authen: false
    // },
    {
        path: "/dashboard",
        component: Home,
        require_authen: true
    }, {
        path: "/register",
        component: Register,
        require_authen: false
    }
];