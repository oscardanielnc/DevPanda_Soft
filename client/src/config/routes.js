import SpecialtyManagement from "../pages/SpecialtyManagement";
import AddSpecialty from "../pages/AddSpecialty";
import StudentRegistrationForm from "../pages/StudentRegistrationForm";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Error404 from "../pages/Error404";
import Prueba from "../pages/Prueba";
import SupervisorSelection from "../pages/SupervisorSelection";
import FACINavbar from "../components/navBarCoordFACI/FACINavbar";
import StudentNavbar from "../components/navBar/StudentNavbar";
import Agreement from "../pages/Agreement";

const routes = [
    {
        path: "/",
        exact: true,
        component: SpecialtyManagement,
    },
    {
        path: "/add-specialty",
        exact: true,
        component: AddSpecialty,
    },
    {
        path: "/student-registration",
        exact: true,
        component: StudentRegistrationForm,
    },
    {
        path: "/sign-in",
        exact: true,
        component: SignIn,
    },
    {
        path: "/sign-up",
        exact: true,
        component: SignUp,
    },
    {
        path: "/agreement",
        exact: true,
        component: Agreement,
    },    
    {   
        path: "/FACInavbar", // esto no lo toco porque lo vamos a eliminar, no es una pagina
        exact: true,
        component: FACINavbar,
    },
    {
        path: "/prueba",// esto no lo toco porque lo vamos a eliminar, no es una pagina
        exact: true,
        component: Prueba,
    },
    {
        path: "/supervisor-selection",
        exact: true,
        component: SupervisorSelection,
    },
    {
        path: "*",
        component: Error404,
    }
]

export default routes;