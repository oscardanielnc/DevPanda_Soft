import SpecialtyManagement from "../pages/SpecialtyManagement";
import AddSpecialty from "../pages/AddSpecialty";
import StudentRegistrationForm from "../pages/StudentRegistrationForm";
import SignUp from "../pages/General/SignUp";
import Error404 from "../pages/General/Error404";
import SupervisorSelection from "../pages/SupervisorSelection";
import RedirectPage from "../pages/General/RedirectPage";
import AgreementReview from "../pages/AgreementReview";
import StudentAgreement from "../pages/StudentAgreement";
import Deliverables from "../pages/Deliverables";
import FinalReport from "../pages/FinalReport"
import ListRegistrationForm from "../pages/ListRegistrationForm";
import landingPage from "../pages/General/LandingPage";
import EnrollmentStudent from "../pages/Student/EnrollmentStudent";
import StudentsManagement from "../pages/CoorSpecialty/StudentsManagement";
import ListAgreementsRequests from "../pages/ListAgreementsRequests";
import WelcomeProcess from "../pages/WelcomeProcess";

const routes = [ 
    // General
    {
        path: "/",
        exact: true,
        component: landingPage,
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
    //Coordinador FACI
    
    // Coordinador especialidad
    {
        path: "/students-management",
        exact: true,
        component: StudentsManagement,
    },
    {
        path: "/list-students-requests",
        exact: true,
        component: ListAgreementsRequests,
    },
    {
        path: "/list-students-agreement",
        exact: true,
        component: ListAgreementsRequests,//CAMBIA ACÁ
    },
    {
        path: "/list-supervisors",
        exact: true,
        component: Deliverables,//CAMBIAR ACÁ
    },
    {
        path: "/student-registration-review/idStudent=:idStudent",
        exact: true,
        component: StudentRegistrationForm,//CAMBIAR ACÁ

    },
    // Admin
    {
        path: "/specialty-management",
        exact: true,
        component: SpecialtyManagement,
    },
    {
        path: "/specialty-add",
        exact: true,
        component: AddSpecialty,
    },
    {
        path: "/coordinators-management",
        exact: true,
        component: SpecialtyManagement,//CAMBIA ACÁ
    },
    // Supervisor
    {  path: "/list-inscriptions-form",
        exact: true,
        component: ListRegistrationForm
    },
    {
        path: "/agreement-review/idStudent=:idStudent&idProcess=:idProcess",
        exact: true,
        component: AgreementReview,
    },
    {
        path: "/add-disponibility/idSupervisor=:idSupervisor",
        exact: true,
        component: SupervisorSelection,//cambiar acá
    },
    {
        path: "/meetings-management/idSupervisor=:idSupervisor",
        exact: true,
        component: SupervisorSelection,//cambiar acá
    },
    {  path: "/list-deliverables-partial",
        exact: true,
        component: ListRegistrationForm,//cambiar acá
    },
    {  path: "/list-deliverables-final",
        exact: true,
        component: ListRegistrationForm,//cambiar acá
    },
    // Alumno
    {
        path: "/welcome-process",
        exact: true,
        component:WelcomeProcess,
    },
    {
        path: "/agreement/idStudent=:idStudent&idProcess=:idProcess&phase=:phase",
        exact: true,
        component: StudentAgreement,
    },
    {
        path: "enrollment/idStudent=:idStudent&idProcess=:idProcess&phase=:phase",
        exact: true,
        component: EnrollmentStudent,
    },
    {
        path: "inscription/idStudent=:idStudent&idProcess=:idProcess&phase=:phase",
        exact: true,
        component: StudentRegistrationForm,
    },
    {
        path: "/supervisor-selection/idStudent=:idStudent&idProcess=:idProcess&phase=:phase",
        exact: true,
        component: SupervisorSelection,
    },
    {
        path: "/final-report/idStudent=:idStudent&idProcess=:idProcess&phase=:phase",
        exact: true,
        component: FinalReport,
    },
    {
        path: "/deliverables/idStudent=:idStudent&idProcess=:idProcess&phase=:phase",
        exact: true,
        component: Deliverables,
    },
    {
        path: "*",
        component: Error404,
    }
]

export default routes;