import Student from "../student/student"
import TabCourse from "../tabCourse/tabCourse";

export const HOME_ROUTES = [
    {
        path: "/dashboard/course",
        component: TabCourse
    },
    {
        path: "/dashboard/student",
        component: Student
    }
];