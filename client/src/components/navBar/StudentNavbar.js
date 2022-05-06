import React, { useState } from 'react';
import { NavItem,Button } from 'react-bootstrap';
import { Link,NavLink } from 'react-router-dom';
import './StudentNavbar.scss';
import useAuth from "../../hooks/useAuth"

const dataNavbar = [
    {
        title: "Convenio y Plan de Aprendizaje",
        link: "/student-agreement"
    },
    {
        title: "Matrícula",
        link: "/m"
    },
    {
        title: "Ficha de inscripción",
        link: "/student-registration"
    },
    {
        title: "Elección del supervisor",
        link: "/supervisor-selection"
    },
    {
        title: "Entregables",
        link: "/deliverables"
    },
    {
        title: "Coordinador Convenio",
        link: "/agreement-review"
    }
]

function StudentNavbar (props){
    const [progreso, setProgreso] = useState(2)
    
    return(
    <div className="studentNavBar">
        <nav>
            <div>
                <div className='studentNavBar__titulo' >
                    <span>Tu progreso</span>
                    <Button className='studentNavBar__progress'
                        onClick={() => document.getElementById("sidebarList").addClass("displayNone")} >
                        <i className="bi bi-chevron-down"/>
                    </Button>
                </div>         
            </div>
            
            <ul className="sidebarList" id='sidebarList'>
            {dataNavbar.map((val,key)=>{
                return (
                    <NavLink key = {key}
                        to = {val.link}
                        className = {`dataRow ${(progreso>key)? "active": ''} ${(window.location.pathname== val.link)? "current": ''}`}
                        >
                        <span className='icono'>
                            <i class="bi bi-check"></i>
                        </span>
                
                        <span className='texto'>
                            {val.title}
                        </span>
                    </NavLink>
                )
            })}
            </ul>
            <Button className="btn btn-secondary" style={{width:"80%"}} >Renuncia</Button>
        </nav>
    </div>

    )

}

export default StudentNavbar;


