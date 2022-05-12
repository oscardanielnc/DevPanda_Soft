import React, { useState } from 'react';
import { NavItem,Button, ProgressBar } from 'react-bootstrap';
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
    } ,
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

const offsets =[-380,-160,-70,-30,0,20,32]
    


function StudentNavbar (props){
    
    const transformText = "rotate(90deg) scaleY(.4) scaleX(" + (0.25 + 0.2*(dataNavbar.length-2)) + ") translateX(" + offsets[dataNavbar.length-2] + "px)" 
    const {user} = useAuth()
    const linkProgreso = "student-registration/" + user.idPersona
    // if(!user) return ""
    const [progreso, setProgreso] = useState(user.estadoProceso)
    return(
        
    <div className="studentNavBar">
        {<ProgressBar className= "studentNavBar__progressbar" 
            now={(100*progreso/(dataNavbar.length-1))} 
            variant="success"
            style={{transform: transformText}}
        />}
        <nav className='studentNavBar__Nav'>
            <div>
                <div className='studentNavBar__titulo'>
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
                        to = {(val.link === "/student-registration")? linkProgreso : val.link}
                        className = {`dataRow ${(progreso>key)? "active": ''} ${(window.location.pathname== val.link)? "current": ''}`}
                        >
                        <span className='icono'>
                            <i className="bi bi-check"></i>
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


