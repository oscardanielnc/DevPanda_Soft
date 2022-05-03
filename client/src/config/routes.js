import GestionEspecialidad from "../pages/GestionEspecialidad";
import AgregarEspecialidad from "../pages/AgregarEspecialidad";
import StudentRegistrationForm from "../pages/StudentRegistrationForm";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import RevConveniosCoordEsp from "../pages/RevisionConveniosCoordEsp";

import Error404 from "../pages/Error404";
import FACINavbar from "../components/navBarCoordFACI/FACINavbar";
import StudentNavbar from "../components/navBar/StudentNavbar";

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
        path: "/signin",
        exact: true,
        component: SignIn,
    },
    {
        path: "/signup",
        exact: true,
        component: SignUp,
    },
    {
        path: "/revisionconvenioscoordinadoresp",
        exact: true,
        component: RevConveniosCoordEsp,
        path: "/FACInavbar",
        component: FACINavbar,
    },
    {
        path: "/Stunavbar",
        component: StudentNavbar,
    },
    {
        path: "*",
        component: Error404,
    },
]

export default routes;