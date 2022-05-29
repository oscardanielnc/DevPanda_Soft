import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import {ToastContainer, toast} from "react-toastify";
import { changeOneHourSchedule, getSupervisorScheduleApi } from '../../api/schedule';
import ModalStudentManagement from '../../components/Modals/ModalStudentManagement';
import ModalStudentMeetingSupervisor from '../../components/Modals/ModalStudentMeetingSupervisor';
import Timetable from '../../components/Timetable/Timetable';
import useAuth from '../../hooks/useAuth';
import LayoutAdministrative from '../../layouts/LayoutAdministrative';
import { isNotEmptyObj } from '../../utils/objects';
import ForbiddenPage from '../General/ForbiddenPage';
import PandaLoaderPage from '../General/PandaLoaderPage';
import Loading from '../General/PandaLoading';


export default function MeetingsManegement() {
    const {user} = useAuth(); 
    const [schedule, setSchedule] = useState([]);
    const [hourSelecteds, setHourSelecteds] = useState([]);
    // const [isEdditing, setIsEdditing] = useState(false);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);
    const [hourModalSelected, setHourModalSelected] = useState(null);
    const idSupervisor = useParams().idSupervisor

    
    const callSchedule = () => {
        // setIsEdditing(false)
        setLoading(true)
        setHourSelecteds([])
        getSupervisorScheduleApi(idSupervisor).then(response => {
            setLoading(false)
            if(response.success) {
                setSchedule(response.schedule)
            }
        })
    }
    
    useEffect(() => {
        callSchedule()
    }, [setSchedule])
    
    if(user.tipoPersonal === "S" && idSupervisor!== user.idPersona)
        return <ForbiddenPage />
        
    const handleClickCell = (hour, indexDay, indexHour) => {
        let newHourClicked = {}
        const newSchude = schedule.map((day, index) => {
            const newHours = day.hours.map((h, i) => {
                    if(index===indexDay && i===indexHour) {
                        // if ((h.state===1 || h.state===2 ) && isEdditing){
                        if ((h.state===1 || h.state===2 )){
                            const newH = {
                                state: h.state===1 ? 2 : 1,
                                idAlumno: hour.idAlumno,
                                id: hour.id
                            }
                            newHourClicked = newH
                            return newH
                        }else if(h.state===4){
                            setHourModalSelected(hour)
                            setShow(true)
                        }
                    }
                    return h
                })
            return {
                day: day.day,
                date: day.date,
                hours: newHours
            }
        })
        // Evita repetidos 
        const dummy = hourSelecteds.filter(function(value, index, arr){ 
            if (newHourClicked === null) return true;
            if (newHourClicked === []) return true;
            if (newHourClicked.id === null) return true;
            return value.id !== newHourClicked.id;
        });
        setHourSelecteds([
            ...dummy,
            newHourClicked
        ])
        
        setSchedule(newSchude)
    }

    // const editHorario = () => {
    //     setIsEdditing(true)
    // }
    const cancelEditedHorario = () => {
        callSchedule()
    }
    const saveEditedHorario = () => {
        if(hourSelecteds.length>0) { //si existe el estado, no es un objeto vacio
            const dummy = hourSelecteds.filter(function(value, index, arr){
                return isNotEmptyObj(value)
            });
            setLoading(true)
            changeOneHourSchedule(dummy).then(response => {
                setLoading(false)
                const resultState = response.success? "success": "error";
                toast[resultState](response.msg, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                if (resultState) {
                    callSchedule()
                }
            })
        } else {
            toast.warning("No ha realizado cambios", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    return(
        <LayoutAdministrative>
            <ToastContainer/>
            <ModalStudentMeetingSupervisor show={show} setShow={setShow} hourModalSelected={hourModalSelected}/>
            
                <div className="container">
                    <div class="row rows">
                        <h1>Disponibilidad y Reuniones</h1>
                    </div>
                    {
                        loading && <Loading/>
                    }
                    {
                        !loading &&
                        <><div className="row rows">
                            <Timetable inputs={schedule} setInputs={setSchedule}
                            setHourSelecteds={setHourSelecteds}
                            hourSelecteds={hourSelecteds} handleClickCell={handleClickCell} />
                        </div>
                        <div className="row rows boton">
                            {/* <Button className="btn btn-primary" style={{width:"40%"}} onClick={editHorario} hidden={isEdditing}>Editar</Button> */}
                            {/* <Button className="btn btn-primary" style={{width:"40%"}} onClick={saveEditedHorario} hidden={!isEdditing}>Guardar</Button> */}
                            <Button className="btn btn-primary" style={{ width: "40%" }} onClick={saveEditedHorario}>Guardar</Button>
                            {/* <Button className="btn btn-secondary" style={{width:"100px", marginLeft: "10px"}} onClick={cancelEditedHorario} hidden={!isEdditing}>Limpiar modificaciones</Button> */}
                            <Button className="btn btn-secondary" style={{ width: "40%", marginLeft: "10px" }} onClick={cancelEditedHorario}>Limpiar modificaciones</Button>
                        </div></>
                    }
                </div>
            
            
        </LayoutAdministrative>
    )
    
}