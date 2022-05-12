import SpecialtyManagement from "../pages/SpecialtyManagement";
import AddSpecialty from "../pages/AddSpecialty";
import StudentRegistrationForm from "../pages/StudentRegistrationForm";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Error404 from "../pages/Error404";
import SupervisorSelection from "../pages/SupervisorSelection";
import FACINavbar from "../components/navBarCoordFACI/FACINavbar";
import StudentNavbar from "../components/navBar/StudentNavbar";
import Agreement from "../pages/Agreement";
import AgreementReview from "../pages/AgreementReview";
import StudentAgreement from "../pages/StudentAgreement";
import Deliverables from "../pages/Deliverables";
import FinalReport from "../pages/FinalReport"
import ListRegistrationForm from "../pages/ListRegistrationForm";
const routes = [
    {
        path: "/",
        exact: true,
        component: SpecialtyManagement,
    },
    {  path: "/listRegistrationForm",
        exact: true,
        component: ListRegistrationForm},
    {
        path: "/add-specialty",
        exact: true,
        component: AddSpecialty,
    },
    {
        path: "/student-registration/:idAlumno",
        exact: true,
        component: StudentRegistrationForm,
    },
    {
        path: "/student-agreement",
        exact: true,
        component: StudentAgreement,
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
        path: "/supervisor-selection",
        exact: true,
        component: SupervisorSelection,
    },
    {
        path: "/agreement-review",
        exact: true,
        component: AgreementReview,
    },
    {
        path: "/final-report",
        exact: true,
        component: FinalReport,
    },
    {
        path: "/deliverables",
        exact: true,
        component: Deliverables,
    },

    {
        path: "*",
        component: Error404,
    }
]

export default routes;