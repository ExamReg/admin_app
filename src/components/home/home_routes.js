import Student from "../student/student"
import Course from "../course/course";
import Room from "../room/room";
import Semester from "../semester/semester";
export const HOME_ROUTES = [
    {
        path: "/dashboard/course",
        component: Course
    },
    {
        path: "/dashboard/student",
        component: Student
    }
    ,
    {
        path:"/dashboard/setting/room",
        component:Room
    },
    {
        path:"/dashboard/setting/semester",
        component:Semester
    }
];