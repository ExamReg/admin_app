import Student from "../student/student"
import TabCourse from "../tabCourse/tabCourse";
import Setting from "../setting/setting"
export const HOME_ROUTES = [
    {
        path: "/dashboard/course",
        component: TabCourse
    },
    {
        path: "/dashboard/student",
        component: Student
    }
    ,
    {
        path:"/dashboard/setting",
        component:Setting
    }
];