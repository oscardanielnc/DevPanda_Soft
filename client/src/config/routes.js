import SpecialtyManagement from "../pages/SpecialtyManagement";
import AddSpecialty from "../pages/AddSpecialty";
import StudentRegistrationForm from "../pages/StudentRegistrationForm";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Error404 from "../pages/Error404";
import SupervisorSelection from "../pages/SupervisorSelection";
import RedirectPage from "../pages/RedirectPage";
import AgreementReview from "../pages/AgreementReview";
import StudentAgreement from "../pages/StudentAgreement";
import Deliverables from "../pages/Deliverables";
import FinalReport from "../pages/FinalReport"
import ListRegistrationForm from "../pages/ListRegistrationForm";
const routes = [ 
    // General
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
        path: "/redirect",
        exact: true,
        component: RedirectPage,
    },
    // Admin
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
    // Supervisor
    {  path: "/list-inscriptions-form/idSup=:idSup&idProcess=:idProcess",
        exact: true,
        component: ListRegistrationForm
    },
    {
        path: "/agreement-review/idStudent=:idStudent&idProcess=:idProcess",
        exact: true,
        component: AgreementReview,
    },
    // Alumno
    {
        path: "/agreement/idStudent=:idStudent&idProcess=:idProcess",
        exact: true,
        component: StudentAgreement,
    },
    {
        path: "registration/idStudent=:idStudent&idProcess=:idProcess",
        exact: true,
        component: Error404,
    },
    {
        path: "inscription/idStudent=:idStudent&idProcess=:idProcess",
        exact: true,
        component: StudentRegistrationForm,
    },
    {
        path: "/supervisor-selection/idStudent=:idStudent&idProcess=:idProcess",
        exact: true,
        component: SupervisorSelection,
    },
    {
        path: "/final-report/idStudent=:idStudent&idProcess=:idProcess",
        exact: true,
        component: FinalReport,
    },
    {
        path: "/deliverables/idStudent=:idStudent&idProcess=:idProcess",
        exact: true,
        component: Deliverables,
    },
    {
        path: "*",
        component: Error404,
    }
]

export default routes;