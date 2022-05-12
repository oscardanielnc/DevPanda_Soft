import React, { useEffect, useState }  from "react"; 
import { getSupervisorScheduleApi } from "../../api/schedule";

import './Timetable.scss';
import TimetableCell from "./TimetableCell/Timetablecell";

const hourRange = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00"
]

const dataDummy = [
    {
        day: "Lunes",
        date: "04-05-2022",
        hours: [1,1,1,3,2,2,4,4,4,2,2,2,1,1]
    },
    {
        day: "Martes",
        date: "05-05-2022",
        hours: [1,1,1,2,2,2,4,4,4,2,2,2,1,1]
    },
    {
        day: "Miércoles",
        date: "06-05-2022",
        hours: [1,1,1,2,2,2,4,4,4,2,2,2,1,1]
    },
    {
        day: "Jueves",
        date: "07-05-2022",
        hours: [1,1,1,2,2,2,4,4,4,2,2,2,1,1]
    },
    {
        day: "Viernes",
        date: "08-05-2022",
        hours: [1,1,1,2,2,2,4,4,4,2,2,2,1,1]
    },
    {
        day: "Lunes",
        date: "09-05-2022",
        hours: [1,1,1,2,2,2,4,4,4,2,2,2,1,1]
    },
    {
        day: "Martes",
        date: "05-05-2022",
        hours: [1,1,1,2,2,2,4,4,4,2,2,2,1,1]
    },
    {
        day: "Miércoles",
        date: "06-05-2022",
        hours: [1,1,1,2,2,2,4,4,4,2,2,2,1,1]
    },
    {
        day: "Jueves",
        date: "07-05-2022",
        hours: [1,1,1,2,2,2,4,4,4,2,2,2,1,1]
    },
    {
        day: "Viernes",
        date: "08-05-2022",
        hours: [1,1,1,2,2,2,4,4,4,2,2,2,1,1]
    }
]

export default function Timetable ({idSupervisor}){
    const [inputs, setInputs] = useState([])
    const [indexs, setIndex] = useState({
        actual:0, // page actual
        separator: 5
    })
    useEffect(()=> {
        getSupervisorScheduleApi(idSupervisor).then(response => {
            if(response.success) {
                console.log(response)
                setInputs(response.schedule)
            }
        })
    },setInputs)

    const leftPage = e => {
        // Verifica que no se salga del limite 
        if (inputs.length>0 && indexs.actual > 0){
            setIndex({
                actual: indexs.actual - 1,
                separator: indexs.separator
            })
        }
    }
    const rigthPage = e => {
        // Verifica que no se salga del limite 
        if (inputs.length>0 && indexs.actual < inputs.length - indexs.separator){
            setIndex({
                actual: indexs.actual + 1,
                separator: indexs.separator
            })
        }
    }
    
    return ( inputs.length>0 &&
        <div>
            <div className="indicatorPage">
                    <div className="btn btn-primary left" onClick={leftPage}>Anterior</div>
                    <div className="btn center"><b>{inputs[indexs.actual].date}</b> al <b>{inputs[indexs.actual+indexs.separator-1].date}</b></div>
                    <div className="btn btn-primary right" onClick={rigthPage}>Siguiente</div>
                </div>
            <div className="row center">
                <div className="col col-2 col-lg-1">
                    <div className="headerTime">Hora</div>
                     {
                        hourRange && hourRange.map((hour, index) => (
                            <p key={index} className="hourRangeCell">{hour}</p>
                        ))
                    }
                </div>
                {
                    inputs.map( (day, indexDay) => {
                        return (
                            indexDay>=indexs.actual && indexDay<indexs.actual+indexs.separator &&
                            <div className="col" key={indexDay}>
                                <div className="headerTime">{`${day.day}  ${day.date}`}</div>
                                {
                                day.hours.map((state, indexHour) => (
                                    <TimetableCell state={state} setInputs={setInputs} inputs={inputs} indexDay={indexDay} key={indexHour} indexHour={indexHour}></TimetableCell>
                                ))
                                }
                            </div>
                        )
                    })
                }
                
            </div>
        </div>);
}