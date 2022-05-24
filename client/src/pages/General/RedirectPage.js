import useAuth from "../../hooks/useAuth";

export default function AddSpecialty () {
    const {user} = useAuth()
    if(!user) {
        window.location.href = `/`
    } else {
        if(user.tipoPersona==="e")
            window.location.href = `/agreement/idStudent=${user.idPersona}&idProcess=${user.fidProceso}`
        else window.location.href = `/students-management`
    }
    return null
}
