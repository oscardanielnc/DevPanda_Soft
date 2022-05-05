
import React, { useState }  from "react";

import './Timetablecell.scss';

// 1: No Disponible
// 2: Disponible
// 3: Seleccionado
// 4: Ocupado

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
            ["state"]: inputs.state
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
            state={inputs.state} onClick={updateState}
            style={{backgroundColor: color}}>
            {description}
        </div>
    );
}
