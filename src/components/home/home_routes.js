import Student from "../student/student"
import ListCourse from "../courses/listCourse";
import Room from "../room/room";
import Semester from "../semester/semester";
import Course from "../courses/course/course";
import Exam from "../exam/exam";
export const HOME_ROUTES = [
    {
        path: "/dashboard/courses",
        component: ListCourse,
        exact: true
    },
    {
        path: "/dashboard/student",
        component: Student,
        exact: false
    }
    ,
    {
        path:"/dashboard/setting/room",
        component:Room,
        exact: false
    },
    {
        path:"/dashboard/exam",
        component:Exam,
        exact: false
    },
    {
        path:"/dashboard/setting/semester",
        component:Semester,
        exact: false
    },
    {
        path:"/dashboard/courses/setting",
        component:Course,
        exact: false
    }
];