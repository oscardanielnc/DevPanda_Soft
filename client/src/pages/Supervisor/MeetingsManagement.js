import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import {ToastContainer, toast} from "react-toastify";
import { changeOneHourSchedule, getSupervisorScheduleApi } from '../../api/schedule';
import ModalStudentManagement from '../../components/Modals/ModalStudentManagement';
import ModalStudentMeeting from '../../components/Modals/ModalStudentMeeting';
import Timetable from '../../components/Timetable/Timetable';
import useAuth from '../../hooks/useAuth';
import LayoutAdministrative from '../../layouts/LayoutAdministrative';
import { isNotEmptyObj } from '../../utils/objects';
import PandaLoaderPage from '../General/PandaLoaderPage';


export default function MeetingsManegement() {
    const {user} = useAuth(); 
    const [schedule, setSchedule] = useState([]);
    const [hourSelecteds, setHourSelecteds] = useState([]);
    const [isEdditing, setIsEdditing] = useState(false);
    const [show, setShow] = useState(false);
    const [hourModalSelected, setHourModalSelected] = useState(null);


    useEffect(() => {
        callSchedule()
     }, [setSchedule])

    const callSchedule = () => {
        setIsEdditing(false)
        setHourSelecteds([])
        getSupervisorScheduleApi(user.idPersona).then(response => {
            if(response.success) {
                setSchedule(response.schedule)
            }
        })
    }
    

    const handleClickCell = (hour, indexDay, indexHour) => {
        let newHourClicked = {}
        const newSchude = schedule.map((day, index) => {
            const newHours = day.hours.map((h, i) => {
                    if(index===indexDay && i===indexHour) {
                        if ((h.state===1 || h.state===2 ) && isEdditing){
                            const newH = {
                                state: h.state===1 ? 2 : 1,
                                idAlumno: hour.idAlumno,
                                id: hour.id
                            }
                            newHourClicked = newH
                            return newH
                        }else if(h.state===4){
                            setHourModalSelected(hour.idAlumno)
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
            if (newHourClicked == null) return true;
            if (newHourClicked == []) return true;
            if (newHourClicked.id == null) return true;
            return value.id != newHourClicked.id;
        });
        setHourSelecteds([
            ...dummy,
            newHourClicked
        ])
        
        setSchedule(newSchude)
    }

    const editHorario = () => {
        setIsEdditing(true)
    }
    const cancelEditedHorario = () => {
        callSchedule()
    }
    const saveEditedHorario = () => {
        if(hourSelecteds.length>0) { //si exsite el estado, no es un objeto vacio
            const dummy = hourSelecteds.filter(function(value, index, arr){
                return isNotEmptyObj(value)
            });
            changeOneHourSchedule(dummy).then(response => {
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
        <ModalStudentMeeting show={show} setShow={setShow} hourModalSelected={hourModalSelected}/>
            <div className="container">
                <div class="row rows">
                    <h1>Disponibilidad y Reuniones</h1>
                </div>
                <div className="row rows">
                    <Timetable inputs={schedule} setInputs={setSchedule} 
                        setHourSelecteds={setHourSelecteds} 
                        hourSelecteds={hourSelecteds} handleClickCell={handleClickCell}
                        />
                </div>
                <div className="row rows boton">
                    <Button className="btn btn-primary" style={{width:"40%"}} onClick={editHorario} hidden={isEdditing}>Editar</Button>
                    <Button className="btn btn-primary" style={{width:"40%"}} onClick={saveEditedHorario} hidden={!isEdditing}>Guardar</Button>
                    <Button className="btn btn-secondary" style={{width:"100px", marginLeft: "10px"}} onClick={cancelEditedHorario} hidden={!isEdditing}>Cancelar</Button>
                </div>
            </div>
            
        </LayoutAdministrative>
    )
    
}