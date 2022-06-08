import SpecialtyManagement from "../pages/Admin/SpecialtyManagement";
import AddSpecialty from "../pages/Admin/AddSpecialty";
import StudentRegistrationForm from "../pages/Student/StudentRegistrationForm";
import SignUp from "../pages/General/SignUp";
import Error404 from "../pages/General/Error404";
import SupervisorSelection from "../pages/Student/SupervisorSelection";
import RedirectPage from "../pages/General/RedirectPage";
import AgreementReview from "../pages/Supervisor/AgreementReview";
import StudentAgreement from "../pages/Student/StudentAgreement";
import ResignationStudent from "../pages/Student/ResignationStudent";
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
import StudentRegistrarionFormCoordinator from "../pages/CoorSpecialty/StudentRegistrarionFormCoordinator";
import ProcessList from "../pages/CoorSpecialty/ProcessList";

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
        path: "/list-students-agreement/permissions=EF",
        exact: true,
        component: ListStudentsRequests,
    },
    {
        path: "/list-inscriptions-form/permissions=EF",
        exact: true,
        component: ListRegistrationForm,
    },
    {
        path: "/agreement-review/permissions=EF&idStudent=:idStudent",
        exact: true,
        component: AgreementReview,
    },
    // Coordinador especialidad
    {
        path: "/students-management/permissions=E",
        exact: true,
        component: StudentsManagement,
    },
    {
        path: "/list-process/permissions=E",
        exact: true,
        component: ProcessList,
    },
    {
        path: "/config-process/permissions=E",
        exact: true,
        component: ConfigProcess,
    },
    {
        path: "/inscription-config/permissions=E",
        exact: true,
        component: ConfigInscription,
    },
    {
        path: "/supervisors-management/permissions=E",
        exact: true,
        component: SupervisorsManagement,
    },
    {
        path: "/list-students-requests/permissions=E",
        exact: true,
        component: ListAgreementsRequests,
    },
    {
        path: "/registration-review/permissions=E&idStudent=:idStudent",
        exact: true,
        component: StudentRegistrarionFormCoordinator,
    },
    // Admin
    {
        path: "/specialty-management/permissions=A",
        exact: true,
        component: SpecialtyManagement,
    },
    {
        path: "/specialty-add/permissions=A",
        exact: true,
        component: AddSpecialty,
    },
    {
        path: "/coordinators-management/permissions=AF",
        exact: true,
        component: CoordinatorsManagement,//CAMBIA ACÁ
    },
    // Supervisor
    {
        path: "/meetings-management/permissions=SC&idSupervisor=:idSupervisor",
        exact: true,
        component: MeetingsManagement,//cambiar acá
    },
    {
        path: "/list-deliverables/permissions=S",
        exact: true,
        component: DeliverablesList,//cambiar acá
    },
    // Alumno
    {
        path: "/welcome-process/phase=NCON",
        exact: true,
        component:WelcomeProcess,
    },
    {
        path: "/agreement/phase=CONV",
        exact: true,
        component: StudentAgreement,
    },
    {
        path: "/enrollment/phase=MATR",
        exact: true,
        component: EnrollmentStudent,
    },
    {
        path: "/inscription/phase=FINS",
        exact: true,
        component: StudentRegistrationForm,
    },
    {
        path: "/supervisor-selection/phase=ESUP",
        exact: true,
        component: SupervisorSelection,
    },
    {
        path: "/final-report/phase=IFIN",
        exact: true,
        component: FinalReport,
    },
    {
        path: "/deliverables/phase=ENTS",
        exact: true,
        component: DeliverablesStudent,
    },
    {
        path: "/deliverable/code=:code",
        exact: true,
        component: Deliverable,
    },
    {
        path: "/resignation/phase=RNCI",
        exact: true,
        component: ResignationStudent,
    },
    //Error 404
    {
        path: "*", 
        component: Error404,
    }
]

export default routes;