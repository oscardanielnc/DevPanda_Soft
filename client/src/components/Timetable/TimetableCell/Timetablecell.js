
import React, { useState }  from "react";

import './Timetablecell.scss';

// 1: No Disponible
// 2: Disponible
// 3: Seleccionado
// 4: Ocupado

export default function TimetableCell (props){
    const {hour, setInputs, inputs, indexDay, indexHour, setHourSelecteds, hourSelecteds} = props;
    const selectState = e => {
        const newSchude = inputs.map((day, index) => {
            const newHours = day.hours.map((h, i) => {
                    if(index===indexDay && i===indexHour && hour.state===2) {
                        const newH = {
                            state: 3,
                            id: hour.id
                        }
                        setHourSelecteds([
                            ...hourSelecteds,
                            {
                                state: 4,
                                id: hour.id
                            }
                        ])
                        return newH
                    }
                    else if (h.state===3) return {
                        state: 2,
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
        
        setInputs(newSchude)
    }

    let description
    let color 
    switch (hour.state) {
        case 1:  
        description = "."; 
        color = "rgb(222, 226, 230)"
        break;
        case 2:  
        description = "Disponible"; 
        color = "rgb(255, 255, 255)"
        break;
        case 3:  
        description = "Seleccionado"; 
        color = "rgb(126, 255, 185)";
        break;
        case 4: 
        description = "Ocupado";
        color = "rgb(255, 254, 152)"
        break;
        default: break;
    }

    return (
        <div className="cell" 
            onClick={selectState}
            style={{backgroundColor: color}}>
            {description}
        </div>
    );
}
