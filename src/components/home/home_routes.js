import Course from "../course/course";
import Student from "../student/student"

export const HOME_ROUTES = [
    {
        path: "/dashboard/course",
        component: Course
    },
    {
        path: "/dashboard/student",
        component: Student
    }
];