import React, {useState,useEffect} from "react";
import LayoutBasic from "../../layouts/LayoutBasic";
import SupervisorSelector from "../../components/ImageSelector/SupervisorSelector"
import './scss/SupervisorSelection.scss';
import Timetable from "../../components/Timetable/Timetable";
import { Button } from "react-bootstrap";
import {changeOneHourSchedule, getSupervisorScheduleApi, searchAssessorsBySpecialty} from "../../api/schedule"
import useAuth from "../../hooks/useAuth";
import {ToastContainer, toast} from "react-toastify";
import { isNotEmptyObj } from "../../utils/objects";
import PandaLoaderPage from "../General/PandaLoaderPage";


export default function SupervisorSelection () {
    const {user} = useAuth();
    const [supervisores, setSupervisores] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [hourSelecteds, setHourSelecteds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isEdditing, setIsEdditing] = useState(false);

    useEffect(() => {
        viewDidLoad()
     }, [setSupervisores])


    const viewDidLoad = () => {
        setLoading(true);
        const fetchRequest = async () => {
            const result = await searchAssessorsBySpecialty(user.fidEspecialidad);
            if(result.success) {
                setSupervisores(result.supervisors);
                setLoading(false);
            }
        }
        fetchRequest()
    }

    const getSchedule = (idSup) => {
        setIsEdditing(false)
        getSupervisorScheduleApi(idSup).then(response => {
            if(response.success) {
                setScheduleBy(response.schedule)
            }
        })
    }
    console.log(hourSelecteds)
    const handleClickCell = (hour, indexDay, indexHour) => {
        let newHourClicked = {}
        if (!isEdditing) return;

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
        
        setScheduleBy(newSchude)
    }

    const setScheduleBy = (schedule) => {
        var isEddited = false
        const dummy = schedule.map((day, index) => {
            const newHours = day.hours.map((h, i) => {
                    if(h.state===4 && h.idAlumno === user.idPersona) {
                        const newH = {
                            state: 3,
                            idAlumno: h.idAlumno,
                            id: h.id
                        }
                        isEddited = true
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
        setIsEdditing(!isEddited)
        setSchedule(dummy)
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
        if(schedule.length>0) {
            const hourInArr = hourSelecteds[0];
            if(hourSelecteds.length>0 && isNotEmptyObj(hourInArr)) {
                const arrHours = [
                    {
                        state: 4,
                        idAsesor: getIdSupervisorSelected(),
                        id: hourInArr.id,
                        idAlumno: user.idPersona
                    }
                ]

                changeOneHourSchedule(arrHours).then(response => {
                    const resultState = response.success? "success": "error";
                    toast[resultState](response.msg, {
                        position: "top-right",
                        autoClose: 3000,
                    });
                    viewDidLoad()
                })
            } else {
                toast.warning("No tiene ningun horario seleccionado!", {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        } else {
            toast.warning("No tiene ningun supervisor seleccionado!", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    }

    if(loading) return <PandaLoaderPage type="e"/>
    return(
        <LayoutBasic>
            <ToastContainer />
            <div className='container principal'>
                <div className="row rows">
                    <h1>Elección de Supervisor</h1>
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
                    {
                        isEdditing && <Button className="btn btn-primary" style={{width:"40%"}} onClick={insertHorario}>Agendar</Button>
                    }
                </div>
            </div>     
        </LayoutBasic>        
    )
}