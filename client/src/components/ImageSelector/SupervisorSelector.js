import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import './SupervisorSelector.scss';



export default function SupervisorSelector ({supervisor}) {
    return (
        <div className="supervisors">{
            supervisor.map((element) => (                
            <Supervisor element={element} />
            ))
            }
        </div>
        
    )
}

function Supervisor ({element}) {
    return (
        <div className="supervisor">
            <i class="bi bi-person"></i>
            <p  style={{marginTop:"10px"}}>   
                {element.name}
            </p>
        </div>
    )
}