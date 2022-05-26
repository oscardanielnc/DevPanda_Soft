
import React from "react";

import './Timetablecell.scss';

// 1: No Disponible
// 2: Disponible
// 3: Seleccionado
// 4: Ocupado

export default function TimetableCell (props){
    const {hour, indexDay, indexHour, handleClickCell} = props;

    let description;
    let color;
    switch (hour.state) {
        case 1:  description = ".";  color = "rgb(222, 226, 230)"; break;
        case 2:  description = "Disponible"; color = "rgb(255, 255, 255)"; break;
        case 3:  description = "Seleccionado"; color = "rgb(126, 255, 185)"; break;
        case 4:  description = "Ocupado"; color = "rgb(255, 254, 152)"; break;
        default: break;
    }

    return (
        <div className="cell" 
            onClick={() => handleClickCell(hour, indexDay, indexHour)}
            style={{backgroundColor: color}}>
            {description}
        </div>
    );
}
