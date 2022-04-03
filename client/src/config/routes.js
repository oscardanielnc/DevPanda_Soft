import Home from "../pages/Home";
import Home2 from "../pages/Home2"
import Error404 from "../pages/Error404";

const routes = [
    {
        path: "/",
        exact: true,
        component: Home,
    },
    {
        path: "/home2",
        exact: true,
        component: Home2,
    },
    {
        path: "*",
        component: Error404,
    },
]

export default routes;