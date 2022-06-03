import useAuth from "../../hooks/useAuth";

export default function AddSpecialty () {
    const {user} = useAuth()
    if(!user) {
        window.location.href = `/`
    } else {
        if(user.tipoPersona==="e")
            window.location.href = `/welcome-process/phase=WPRO`;
        else {
            switch (user.tipoPersonal) {
                case 'S':  
                    window.location.href = `/meetings-management/permissions=SC&idSupervisor=${user.idPersona}`; break;
                case 'E': window.location.href = `/students-management/permissions=E`; break;
                case 'F': window.location.href = `/list-students-agreement/permissions=EF`; break;
                case 'A': window.location.href = `/specialty-management/permissions=A`; break;
                default: window.location.href = `/list-supervisors/permissions=C`; break;
            }
        }
    }
    return null
}