import React from "react";
import './SupervisorSelector.scss';

export default function SupervisorSelector ({supervisores,setSupervisores, getSchedule,disable}) {
    if(!supervisores) return <h3>No system!</h3>
    if(supervisores.lenght === 0) return <h3>No existen supervisores en tu especialidad</h3>
    return (
        <div className="supervisors" style={{pointerEvents: disable ? "none": "all"}}>
            {
            supervisores.map((element) => (                
                <Supervisor element={element} getSchedule = {getSchedule}
                    key={element.id} setSupervisores={setSupervisores} 
                    supervisores={supervisores}/>
            ))
            }
        </div>
        
    )
}

function Supervisor ({element, setSupervisores, supervisores, getSchedule}) {
    const selectSup = () =>{
        const newSupervisors = supervisores.map(e => {
            const isThisObj = e.id === element.id
            const sup = {
                id: e.id,
                name: e.name,
                isSelected: isThisObj,
                isMySupervisor: e.isMySupervisor
            }
            return sup
        })
        getSchedule(element.id)
        setSupervisores(newSupervisors);
    }
    console.log(element)
    return (
        <div className={"supervisor" + (element.isSelected? " supervisor__selected": "")} onClick={selectSup}>
            <i className="bi bi-person"></i>
            <p  style={{marginTop:"10px"}}>   
                {element.name}
            </p>
        </div>
    )
}