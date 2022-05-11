
import React, { useState }  from "react";

import './Timetablecell.scss';

// 1: No Disponible
// 2: Disponible
// 3: Seleccionado
// 4: Ocupado

export default function TimetableCell ({state, setInputs, inputs, indexDay, indexHour}){
    const selectState = e => {
        const newSchude = inputs.map((day, index) => {
            const newHours = day.hours.map((hour, i) => {
                    if(index===indexDay && i===indexHour && state===2) return 3
                    else if (hour===3) return 2
                    return hour
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
    switch (state) {
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
