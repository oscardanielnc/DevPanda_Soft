import React, {useState,useEffect} from "react";
import LayoutBasic from "../layouts/LayoutBasic";
import SupervisorSelector from "../components/ImageSelector/SupervisorSelector"
import './SupervisorSelection.scss';
import Timetable from "../components/Timetable/Timetable";
import { Button } from "react-bootstrap";
import {changeOneHourSchedule, getSupervisorScheduleApi, searchAssessorsBySpecialty} from "../api/schedule"
import useAuth from "../hooks/useAuth";
import {ToastContainer, toast} from "react-toastify";
import { isNotEmptyObj } from "../utils/objects";

// const supervisoresDummy = [
//     {
//         id:1,
//         name: "Javier Palacios",
//         idfacultad:"informatica",
//         isSelected: true,
//         isMySupervisor: false
//     },
//     {
//         id:2,
//         name: "Luis Flores",
//         idfacultad:"informatica",
//         isSelected: false,
//         isMySupervisor: false
//     },
//     {
//         id:3,
//         name: "Andres Melgar",
//         idfacultad:"informatica",
//         isSelected: false,
//         isMySupervisor: false
//     },
//     {
//         id:4,
//         name:"Pedro Castillo",
//         idfacultad:"informatica",
//         isSelected: false,
//         isMySupervisor: false
//     }
// ]

export default function SupervisorSelection () {
    const {user} = useAuth();
    const [supervisores, setSupervisores] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [hourSelecteds, setHourSelecteds] = useState([]);

    useEffect(() => {
        const fetchRequest = async () => {
            const result = await searchAssessorsBySpecialty(user.fidEspecialidad);
            if(result.success) {
                setSupervisores(result.supervisors);
            }
        }
        fetchRequest()
     }, [setSupervisores])

    const getSchedule = (idSup) => {
        getSupervisorScheduleApi(idSup).then(response => {
            if(response.success) {
                setSchedule(response.schedule)
            }
        })
    }
    console.log(hourSelecteds)
    const handleClickCell = (hour, indexDay, indexHour) => {
        let newHourClicked = {}
        const newSchude = schedule.map((day, index) => {
            const newHours = day.hours.map((h, i) => {
                    if(index===indexDay && i===indexHour && hour.state===2) {
                        const newH = {
                            state: 3,
                            idAlumno: hour.idAlumno,
                            id: hour.id
                        }
                        newHourClicked = newH
                        return newH
                    }
                    else if (h.state===3) return {
                        state: 2,
                        idAlumno: hour.idAlumno,
                        id: h.id
                    }
                    return h
                })
            return {
                day: day.day,
                date: day.date,
                hours: newHours
            }
        })
        setHourSelecteds([
            // ...hourSelecteds,
            newHourClicked
        ])
        
        setSchedule(newSchude)
    }
    // const isSomeHourSelected = () => {
    //     let isSelected = false
    //     schedule.forEach(day => {
    //         day.hours.forEach(hour => {
    //             if(hour.state===3) isSelected = true
    //         })
    //     })
    //     return isSelected
    // }

    const insertHorario = () => {
        if(schedule.length>0) {
            const hourInArr = hourSelecteds[0];
            if(hourSelecteds.length>0 && isNotEmptyObj(hourInArr)) { //si exsite el estado, no es un objeto vacio
                const arrHours = [
                    {
                        state: 4,
                        id: hourInArr.id,
                        idAlumno: user.idPersona
                    }
                ]

                changeOneHourSchedule(arrHours).then(response => {
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
                })
            } else {
                toast.warning("No tiene ningun horario seleccionado!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } else {
            toast.warning("No tiene ningun supervisor seleccionado!", {
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
        <LayoutBasic>
            <ToastContainer />
            <div className='container principal'>
                <div className="row rows">
                    <h1>Eleccion de Supervisor</h1>
                </div>
                <div className="row" style={{marginLeft: "1.3em"}}>
                    <p style={{marginTop:"10px"}}>
                    Elige al asesor que prefieras para ver su disponibilidad.
                    </p>
                </div>
                <div className="row rows">     
                    <SupervisorSelector supervisores={supervisores} setSupervisores={setSupervisores} getSchedule={getSchedule}/>
                </div>
                <div className="row rows">
                    <Timetable inputs={schedule} setInputs={setSchedule} 
                        setHourSelecteds={setHourSelecteds} 
                        hourSelecteds={hourSelecteds} handleClickCell={handleClickCell}
                        />
                </div>
                <div className="row rows boton">
                    <Button className="btn btn-primary" style={{width:"40%"}} onClick={insertHorario}>Agendar</Button>
                </div>
            </div>     
        </LayoutBasic>        
    )
}