import React, { useState }  from "react"; 

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
        date: "04-05-2022",
        hours: [1,1,1,3,2,2,4,4,4,2,2,2,1,1]
    },
    {
        date: "05-05-2022",
        hours: [1,1,1,2,2,2,4,4,4,2,2,2,1,1]
    },
    {
        date: "06-05-2022",
        hours: [1,1,1,2,2,2,4,4,4,2,2,2,1,1]
    },
    {
        date: "07-05-2022",
        hours: [1,1,1,2,2,2,4,4,4,2,2,2,1,1]
    },
    {
        date: "08-05-2022",
        hours: [1,1,1,2,2,2,4,4,4,2,2,2,1,1]
    },
    {
        date: "09-05-2022",
        hours: [1,1,1,2,2,2,4,4,4,2,2,2,1,1]
    },
    {
        date: "10-05-2022",
        hours: [1,1,1,2,2,2,4,4,4,2,2,2,1,1]
    },
    {
        date: "11-05-2022",
        hours: [1,1,1,2,2,2,4,4,4,2,2,2,1,1]
    },
    {
        date: "12-05-2022",
        hours: [1,1,1,2,2,2,4,4,4,2,2,2,1,1]
    },
    {
        date: "13-05-2022",
        hours: [1,1,1,2,2,2,4,4,4,2,2,2,1,1]
    },
    {
        date: "14-05-2022",
        hours: [1,1,1,2,2,2,4,4,4,2,2,2,1,1]
    },
]

export default function Timetable ({horario, states}){
    const [inputs, setInputs] = useState(dataDummy)
    const [indexs, setIndex] = useState({
        actual:0, // page actual
        separator: 6
    })

    const leftPage = e => {
        // Verifica que no se salga del limite 
        if (indexs.actual > 0){
            setIndex({...indexs,
                ['actual']: (indexs.actual - 1)})
        }
    }
    const rigthPage = e => {
        // Verifica que no se salga del limite 
        if (inputs , Math.ceil(inputs.length/indexs.separator) -1 > indexs.actual){
            setIndex({...indexs,
                ['actual']: (indexs.actual + 1)})
        }
    }
    let diaInicio = ""
    let diaFin = ""
    if (inputs) {
        diaInicio = inputs[indexs.actual*indexs.separator].date
        diaFin = inputs[(indexs.actual+1)*indexs.separator-1].date
    }
    
    return ( inputs &&
        <div>
            <div className="indicatorPage">
                    <div className="btn btn-primary left" onClick={leftPage}>Anterior</div>
                    <div className="btn center"><b>{diaInicio}</b> al <b>{diaFin}</b></div>
                    <div className="btn btn-primary right" onClick={rigthPage}>Siguiente</div>
                </div>
            <div className="row center">
                <div className="col col-2 col-lg-1">
                    <div className="headerTime">Hora</div>
                     {
                        hourRange && hourRange.map((hour, index) => (
                            <p className="hourRangeCell">{hour}</p>
                        ))
                    }
                </div>
                {
                    inputs.map( (day, indexDay) => {
                        return (
                            (indexDay < (indexs.actual + 1)*indexs.separator && indexDay >= indexs.actual * indexs.separator) && <div className="col">
                            <div className="headerTime">{day.date}</div>
                            {
                            day.hours.map((state, indexHour) => (
                                <TimetableCell state={state} setInputs={setInputs} inputs={inputs} indexDay={indexDay} key={indexHour} indexHour={indexHour}></TimetableCell>
                            ))
                            }
                        </div>
                    )})
                }
                
            </div>
        </div>);
}