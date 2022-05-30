import React, {useState,useEffect} from "react";
import LayoutBasic from "../../layouts/LayoutBasic";
import SupervisorSelector from "../../components/ImageSelector/SupervisorSelector"
import './scss/SupervisorSelection.scss';
import Timetable from "../../components/Timetable/Timetable";
import { Alert, Button } from "react-bootstrap";
import {changeOneHourSchedule, getMeetingByStudent, getSupervisorScheduleApi, searchAssessorsBySpecialty} from "../../api/schedule"
import useAuth from "../../hooks/useAuth";
import {ToastContainer, toast} from "react-toastify";
import { isNotEmptyObj } from "../../utils/objects";
import PandaLoaderPage from "../General/PandaLoaderPage";
import Loading from "../General/PandaLoading";
import ModalStudentMeetingSupervisor from "../../components/Modals/ModalStudentMeetingSupervisor";
import ModalStudentMeetingStudent from "../../components/Modals/ModalStudentMeetingStudent";


export default function SupervisorSelection () {
    const {user} = useAuth();
    const [supervisores, setSupervisores] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [hourSelecteds, setHourSelecteds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [scheduledMeeting, setScheduledMeeting] = useState(null);
    const [hasMeeting, setHasMeeting] = useState(true);
    const [hourModalSelected, setHourModalSelected] = useState(null);

    useEffect(() => {
        console.log("Obtener si tiene reuniones")
        setLoading(true)
        getMeetingByStudent(user.idPersona).then(response => {
            setLoading(false)
            if (response.success){
                setScheduledMeeting(response.meeting)
            }else{
                setScheduledMeeting(null)
            }
            setHasMeeting(response.hasMeeting ?? false)
        })
    }, [hasMeeting])

    useEffect(() => {
        console.log("Obtener supervisores")
        setLoading(true);
        setSupervisores([])
        searchAssessorsBySpecialty(user.fidEspecialidad).then( result =>{
            if(result.success) {
                setLoading(false);
                const dummy = result.supervisors.map( supervisor => {
                    if (scheduledMeeting !== null){
                        if(scheduledMeeting, scheduledMeeting.fidAsesor, scheduledMeeting.fidAsesor === supervisor.id){
                            supervisor.isSelected = true;
                            getSchedule(supervisor.id)
                        }
                    }
                    return supervisor
                })
                setSupervisores(dummy);
            }
        })
     }, [scheduledMeeting])



    const showToast = ( msg, state = "warning") => {
        toast[state](msg, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    const getSchedule = (idSup) => {
        console.log("Obtener horario de supervisor", idSup)
        setScheduleBy([])
        setHourSelecteds([])
        setLoading(true);
        getSupervisorScheduleApi(idSup).then(response => {
            setLoading(false);
            if(response.success) {
                setScheduleBy(response.schedule)
            }
        })
    }
    const handleClickCell = (hour, indexDay, indexHour) => {
        let newHourClicked = {}

        const newSchude = schedule.map((day, index) => {
            const newHours = day.hours.map((h, i) => {
                    if(index===indexDay && i===indexHour && hour.state===2) {
                        const newH = {
                            state: 3,
                            idAlumno: hour.idAlumno,
                            id: hour.id,
                            link: hour.link
                        }
                        newHourClicked = newH
                        return newH
                    }
                    else if(hasMeeting && index===indexDay && i===indexHour && hour.state===3){
                        setHourModalSelected(h)
                        setShow(true)
                    }
                    else if (h.state===3) return {
                        state: 2,
                        idAlumno: hour.idAlumno,
                        id: h.id,
                        link: h.link
                    }
                    return h
                })
            return {
                day: day.day,
                date: day.date,
                hours: newHours
            }
        })

        if (hasMeeting) return;
        setHourSelecteds([
            // ...hourSelecteds,
            newHourClicked
        ])
        
        setScheduleBy(newSchude)
    }

    const setScheduleBy = (schedule) => {
        const dummy = schedule.map((day, index) => {
            const newHours = day.hours.map((h, i) => {
                    if(h.state===4 && h.idAlumno === user.idPersona && h.id === scheduledMeeting.idHorario) {
                        const newH = {
                            state: 3,
                            idAlumno: h.idAlumno,
                            id: h.id,
                            link: h.link
                        }
                        return newH
                    }
                    return h
                })
            return {
                day: day.day,
                date: day.date,
                hours: newHours
            }
        })
        setSchedule(dummy)
    }
    
    const getIdSupervisorSelected = () => {
        let id = null
        supervisores.forEach(item => {
            if(item.isSelected) {
                id = item.id
            }
        })
        return id;
    }

    const insertHorario = () => {
        if(hasMeeting){
            showToast("Ya tienes una reunión programada.", "warning")
        }
        if(schedule.length>0) {
            const hourInArr = hourSelecteds[0];
            if(hourSelecteds.length>0 && isNotEmptyObj(hourInArr)) {
                const arrHours = [
                    {
                        state: 4,
                        idAsesor: getIdSupervisorSelected(),
                        id: hourInArr.id,
                        idAlumno: user.idPersona,
                        idProcess: user.fidProceso
                    }
                ]

                setLoading(true);
                changeOneHourSchedule(arrHours).then(response => {
                    setLoading(false);
                    showToast(response.msg, response.success? "success": "error")
                    setHasMeeting(true)
                })
            } else {
                showToast("No tiene ningún horario seleccionado.", "warning")
            }
        } else {
            showToast("No tiene ningún supervisor seleccionado", "warning")
        }
    }

    return(
        <LayoutBasic>
            <ToastContainer />
            <ModalStudentMeetingStudent show={show} setShow={setShow} hourModalSelected={scheduledMeeting}/>
            <div className='container principal'>
                <div className="row rows">
                    <h1>Elección de supervisor</h1>
                </div>
                { hasMeeting && scheduledMeeting && <Alert key={'warning'} variant={'warning'}>Recuerda que tienes una reunión con tu supervisor, programada para el {scheduledMeeting.fecha} a las {scheduledMeeting.hora-1}:00</Alert>}
                
                {
                    supervisores &&
                    <><div className="row" style={{ marginLeft: "1.3em" }}>
                        { !hasMeeting && <p style={{ marginTop: "10px" }}>
                            Elige al asesor que prefieras para ver su disponibilidad.
                        </p>}
                    </div>
                    <div className="row rows">
                        <SupervisorSelector supervisores={supervisores} setSupervisores={setSupervisores} getSchedule={getSchedule} disable={hasMeeting}/>
                    </div></>
                }{
                    !loading && schedule.length > 0 && <><div className="row rows">
                        <Timetable inputs={schedule} setInputs={setSchedule}
                            setHourSelecteds={setHourSelecteds}
                            hourSelecteds={hourSelecteds} handleClickCell={handleClickCell} />
                    </div><div className="row rows boton">
                        {!hasMeeting && <Button className="btn btn-primary" style={{ width: "40%" }} onClick={insertHorario}>Agendar</Button>}
                    </div></>
                }
                {
                    loading && <div className="row rows"><Loading/></div>
                }
            </div>     
        </LayoutBasic>        
    )
}