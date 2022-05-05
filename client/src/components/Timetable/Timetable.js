import React, { useState }  from "react";

import './Timetable.scss';
import TimetableCell from "./TimetableCell/Timetablecell";


export default function Timetable ({horario, states}){
    const [inputs, setInputs] = useState({
        days: [
            {
                name: "Lunes 4",
                hours: [
                    { state: 1 },
                    { state: 1 },
                    { state: 1 },
                    { state: 2 },
                    { state: 2 },
                    { state: 2 },
                    { state: 2 },
                    { state: 1 },
                    { state: 1 },
                    { state: 2 },
                    { state: 2 },
                    { state: 2 },
                    { state: 1 },
                    { state: 1 }
                ]
            }, {
                name: "Martes 5",
                hours: [
                    { state: 1 },
                    { state: 1 },
                    { state: 1 },
                    { state: 2 },
                    { state: 2 },
                    { state: 2 },
                    { state: 2 },
                    { state: 1 },
                    { state: 1 },
                    { state: 2 },
                    { state: 2 },
                    { state: 2 },
                    { state: 1 },
                    { state: 1 }
                ]
            }, {
                name: "Miercoles 6",
                hours: [
                    { state: 1 },
                    { state: 1 },
                    { state: 1 },
                    { state: 2 },
                    { state: 2 },
                    { state: 2 },
                    { state: 2 },
                    { state: 1 },
                    { state: 1 },
                    { state: 2 },
                    { state: 2 },
                    { state: 2 },
                    { state: 1 },
                    { state: 1 }
                ]
            }, {
                name: "Jueves 7",
                hours: [
                    { state: 1 },
                    { state: 1 },
                    { state: 1 },
                    { state: 2 },
                    { state: 2 },
                    { state: 2 },
                    { state: 2 },
                    { state: 1 },
                    { state: 1 },
                    { state: 2 },
                    { state: 2 },
                    { state: 2 },
                    { state: 1 },
                    { state: 1 }
                ]
            }, {
                name: "Viernes 8",
                hours: [
                    { state: 1 },
                    { state: 1 },
                    { state: 1 },
                    { state: 2 },
                    { state: 2 },
                    { state: 2 },
                    { state: 1 },
                    { state: 1 },
                    { state: 1 },
                    { state: 2 },
                    { state: 2 },
                    { state: 2 },
                    { state: 2 },
                    { state: 1 }
                ]
            }, {
                name: "Sabado 7",
                hours: [
                    { state: 1 },
                    { state: 1 },
                    { state: 1 },
                    { state: 2 },
                    { state: 1 },
                    { state: 1 },
                    { state: 1 },
                    { state: 1 },
                    { state: 1 },
                    { state: 2 },
                    { state: 2 },
                    { state: 2 },
                    { state: 1 },
                    { state: 1 }
                ]
            },{
                name: "Lunes 9",
                hours: [
                    { state: 1 },
                    { state: 1 },
                    { state: 1 },
                    { state: 2 },
                    { state: 2 },
                    { state: 2 },
                    { state: 2 },
                    { state: 1 },
                    { state: 1 },
                    { state: 2 },
                    { state: 2 },
                    { state: 2 },
                    { state: 1 },
                    { state: 1 }
                ]
            }, {
                name: "Martes 10",
                hours: [
                    { state: 1 },
                    { state: 1 },
                    { state: 1 },
                    { state: 2 },
                    { state: 2 },
                    { state: 2 },
                    { state: 2 },
                    { state: 1 },
                    { state: 1 },
                    { state: 2 },
                    { state: 2 },
                    { state: 2 },
                    { state: 1 },
                    { state: 1 }
                ]
            }, {
                name: "Miercoles 11",
                hours: [
                    { state: 1 },
                    { state: 1 },
                    { state: 1 },
                    { state: 2 },
                    { state: 2 },
                    { state: 2 },
                    { state: 2 },
                    { state: 1 },
                    { state: 1 },
                    { state: 2 },
                    { state: 2 },
                    { state: 2 },
                    { state: 1 },
                    { state: 1 }
                ]
            }, {
                name: "Jueves 12",
                hours: [
                    { state: 1 },
                    { state: 1 },
                    { state: 1 },
                    { state: 2 },
                    { state: 2 },
                    { state: 2 },
                    { state: 2 },
                    { state: 1 },
                    { state: 1 },
                    { state: 2 },
                    { state: 2 },
                    { state: 2 },
                    { state: 1 },
                    { state: 1 }
                ]
            }, {
                name: "Viernes 13",
                hours: [
                    { state: 1 },
                    { state: 1 },
                    { state: 1 },
                    { state: 2 },
                    { state: 2 },
                    { state: 2 },
                    { state: 1 },
                    { state: 1 },
                    { state: 1 },
                    { state: 2 },
                    { state: 2 },
                    { state: 2 },
                    { state: 2 },
                    { state: 1 }
                ]
            }, {
                name: "Sabado 14",
                hours: [
                    { state: 1 },
                    { state: 1 },
                    { state: 1 },
                    { state: 2 },
                    { state: 1 },
                    { state: 1 },
                    { state: 1 },
                    { state: 1 },
                    { state: 1 },
                    { state: 2 },
                    { state: 2 },
                    { state: 2 },
                    { state: 1 },
                    { state: 1 }
                ]
            }
        ],
        hourRange: [
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
    })
    const [indexs, setIndex] = useState({
        actual:0, // page actual
        separator: 6
    })

    const leftPage = e => {
        // Verifica que no se salga del limite 
        if (indexs.actual > 0){
            setIndex({
                actual:  indexs.actual - 1,
                separator: indexs.separator
            })
        }
    }
    const rigthPage = e => {
        // Verifica que no se salga del limite 
        if (Math.ceil(inputs.days.length/indexs.separator) -1 > indexs.actual){
            setIndex({
                actual:  indexs.actual + 1,
                separator: indexs.separator
            })
        }
    }

    
    return (
        <div>
            <div className="indicatorPage">
                    <div className="btn btn-primary left" onClick={leftPage}>Anterior</div>
                    <div className="btn btn-primary right" onClick={rigthPage}>Siguiente</div>
                </div>
            <div className="row center">
                <div className="col col-2 col-lg-1">
                    <div className="headerTime">Hora</div>
                     {
                        inputs.hourRange.map((hour, index) => (
                        <p className="hourRangeCell">{hour}</p>
                        ))
                    }
                </div>
                {
                    inputs.days.filter( (day, index) => index < (indexs.actual + 1)*indexs.separator && index >= indexs.actual * indexs.separator).map( (day, index) => {
                        return (
                        <div className="col">
                            <div className="headerTime">{day.name}</div>
                            {
                            day.hours.map((hour, indexHour) => (
                                <TimetableCell hour={hour} change={setInputs} inputsSuper={inputs} indexDay={index} indexHour ={indexHour}></TimetableCell>
                            ))
                            }
                        </div>
                    )})
                }
                
            </div>
        </div>);
}