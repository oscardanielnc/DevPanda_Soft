import SpecialtyManagement from "../pages/Admin/SpecialtyManagement";
import AddSpecialty from "../pages/Admin/AddSpecialty";
import StudentRegistrationForm from "../pages/Student/StudentRegistrationForm";
import SignUp from "../pages/General/SignUp";
import Error404 from "../pages/General/Error404";
import SupervisorSelection from "../pages/Student/SupervisorSelection";
import RedirectPage from "../pages/General/RedirectPage";
import AgreementReview from "../pages/Supervisor/AgreementReview";
import StudentAgreement from "../pages/Student/StudentAgreement";
import DeliverablesStudent from "../pages/Student/DeliverablesStudent";
import Deliverable from "../pages/Student/Deliverable";
import FinalReport from "../pages/Student/FinalReport"
import ListRegistrationForm from "../pages/CoorFACI/ListRegistrationForm";
import landingPage from "../pages/General/LandingPage";
import EnrollmentStudent from "../pages/Student/EnrollmentStudent";
import StudentsManagement from "../pages/CoorSpecialty/StudentsManagement";
import ListAgreementsRequests from "../pages/CoorFACI/ListAgreementsRequests";
import WelcomeProcess from "../pages/Student/WelcomeProcess";
import ConfigProcess from "../pages/CoorSpecialty/ConfigProcess";
import ConfigInscription from "../pages/CoorSpecialty/ConfigInscription";
import ListStudentsRequests from "../pages/CoorSpecialty/ListStudentsRequests";
import SupervisorsManagement from "../pages/CoorSpecialty/SupervisorsManagement";
import CoordinatorsManagement from "../pages/Admin/CoordinatorsManagement";
import MeetingsManagement from "../pages/Supervisor/MeetingsManagement";
import DeliverablesList from "../pages/Supervisor/DeliverablesList";

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
    {
        path: "/list-students-agreement/idProcess=:idProcess",
        exact: true,
        component: ListAgreementsRequests,
    },
    {
        path: "/list-inscriptions-form/idProcess=:idProcess",
        exact: true,
        component: ListRegistrationForm,
    },
    
    // Coordinador especialidad
    {
        path: "/students-management/idProcess=:idProcess",
        exact: true,
        component: StudentsManagement,
    },
    {
        path: "/config-process/idSpecialty=:idSpecialty",
        exact: true,
        component: ConfigProcess,
    },
    {
        path: "/inscription-config/idSpecialty=:idSpecialty",
        exact: true,
        component: ConfigInscription,
    },
    {
        path: "/supervisors-management/idSpecialty=:idSpecialty",
        exact: true,
        component: SupervisorsManagement,
    },
    {
        path: "/list-students-requests/idProcess=:idProcess",
        exact: true,
        component: ListStudentsRequests,
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
        component: CoordinatorsManagement,//CAMBIA ACÁ
    },
    // Supervisor
    {
        path: "/agreement-review/idStudent=:idStudent&idProcess=:idProcess",
        exact: true,
        component: AgreementReview,
    },
    {
        path: "/meetings-management/idSupervisor=:idSupervisor&idProcess=:idProcess",
        exact: true,
        component: MeetingsManagement,//cambiar acá
    },
    {
        path: "/list-deliverables/idSupervisor=:idSupervisor&idProcess=:idProcess",
        exact: true,
        component: DeliverablesList,//cambiar acá
    },
    // Alumno
    {
        path: "/welcome-process/idStudent=:idStudent&idProcess=:idProcess&phase=WPRO",
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
        component: DeliverablesStudent,
    },
    {
        path: "/deliverable/idStudent=:idStudent&idProcess=:idProcess&code=:code",
        exact: true,
        component: Deliverable,
    },
    //Error 404
    {
        path: "*", 
        component: Error404,
    }
]

export default routes;