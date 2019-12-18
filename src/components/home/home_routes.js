import Course from "../course/course";
import Student from "../student/student"

export const HOME_ROUTES = [
    {
        path: "/dashboard/course",
        exact: true,
        component: Course
    },
    {
        path: "/dashboard/student",
        exact: true,
        component: Student
    }
];