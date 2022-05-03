import GestionEspecialidad from "../pages/GestionEspecialidad";
import AgregarEspecialidad from "../pages/AgregarEspecialidad";
import StudentRegistrationForm from "../pages/StudentRegistrationForm";
import Error404 from "../pages/Error404";
import SupervisorSelection from "../pages/SupervisorSelection";

const routes = [
    {
        path: "/",
        exact: true,
        component: GestionEspecialidad,
    },
    {
        path: "/agregarEspecialidad",
        exact: true,
        component: AgregarEspecialidad,
    },
    {
        path: "/studentRegistrationForm",
        exact: true,
        component: StudentRegistrationForm,
    },
    {
        path: "*",
        component: Error404,
    },
    {
        path: "/supervisorselection",
        exact: true,
        component: SupervisorSelection,
    }
]

export default routes;