
import React, { useState }  from "react";

import './Timetablecell.scss';

// 1: No Disponible
// 2: Disponible
// 3: Seleccionado

export default function TimetableCell ({hour, change, inputsSuper, indexDay, indexHour}){
    const [inputs, setInputs] = useState({
        state: hour.state,
        hour: hour.time
    })

    const updateState = e => {
        switch (inputs.state) {
            // Cambia de Disponible a Seleccionado
            case 2: inputs.state = 3; break;
            case 3: inputs.state = 2; break;
            default: break;
        }
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
        // Obtenemos una copia y lo modificamos
        const changeInputs = inputsSuper
        changeInputs.days[indexDay].hours[indexHour].state = inputs.state
        change(changeInputs)
    }

    var description
    var color 
    switch (inputs.state) {
        case 1:  
        description = "."; 
        color = "rgb(209, 209, 209)"
        break;
        case 2:  
        description = "Disponible"; 
        color = "rgb(255, 255, 255)"
        break;
        case 3:  
        description = "Seleccionado"; 
        color = "rgb(130, 255, 120)"
        break;
        default: break;
    }

    return (
        <div className="cell" 
            state={inputs.state} onClick={updateState}
            style={{backgroundColor: color}}>
            {description}
        </div>
    );
}
