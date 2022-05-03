import Home from "../pages/Home";
import Home2 from "../pages/Home2"
import Error404 from "../pages/Error404";
import Prueba from "../pages/Prueba";

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
    {
        path: "/prueba",
        exact: true,
        component: Prueba,
    }
]

export default routes;