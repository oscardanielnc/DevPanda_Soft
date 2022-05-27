import useAuth from "../../hooks/useAuth";

export default function AddSpecialty () {
    const {user} = useAuth()
    if(!user) {
        window.location.href = `/`
    } else {
        if(user.tipoPersona==="e")
            window.location.href = `/welcome-process/idStudent=${user.idPersona}&idProcess=${user.fidProceso}&phase=WPRO`;
        else window.location.href = `/students-management/idProcess=${user.fidProceso}`
    }
    return null
}