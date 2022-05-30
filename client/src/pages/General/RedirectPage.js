import useAuth from "../../hooks/useAuth";

export default function AddSpecialty () {
    const {user} = useAuth()
    if(!user) {
        window.location.href = `/`
    } else {
        if(user.tipoPersona==="e")
            window.location.href = `/welcome-process/idStudent=${user.idPersona}&idProcess=${user.fidProceso}&phase=WPRO`;
        else {
            switch (user.tipoPersonal) {
                case 'S': 
                    window.location.href = `/meetings-management/permissions=S&idSupervisor=${user.idPersona}&idProcess=${user.fidProceso}`; break;
                case 'E': window.location.href = `/students-management/permissions=E&idProcess=${user.fidProceso}`; break;
                case 'F': window.location.href = `/specialty-management/permissions=AF`; break;
                case 'A': window.location.href = `/specialty-management/permissions=AF`; break;
                default: window.location.href = `/list-supervisors/permissions=C`; break;
            }
        }
    }
    return null
}