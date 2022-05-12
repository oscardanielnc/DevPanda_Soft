import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import './SupervisorSelector.scss';



export default function SupervisorSelector ({supervisores,setSupervisores, setIdSupSelected}) {
    return (
        <div className="supervisors" >
            {
            supervisores.map((element) => (                
                <Supervisor element={element} 
                    key={element.id} setSupervisores={setSupervisores} 
                    supervisores={supervisores} setIdSupSelected={setIdSupSelected}/>
            ))
            }
        </div>
        
    )
}

function Supervisor ({element, setSupervisores, supervisores, setIdSupSelected}) {
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
        setIdSupSelected(element.id)
        setSupervisores(newSupervisors);
    }
    return (
        
        <div className="supervisor" onClick={selectSup} seleccionSup={selectSup} style={element.isSelected?{backgroundColor: 'gray'}:{backgroundColor: 'white'}}>

            <i className="bi bi-person"></i>
            <p  style={{marginTop:"10px"}}>   
                {element.name}
            </p>
        </div>
    )
}