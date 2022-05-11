import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './FACINavbar.scss';

const dataNavbar = [
    {
        title: "Convenio",
        link: "/agreement-review"
    },
    {
        title: "Gestión de Especialidades",
        link: "/"
    },
    {
        title: "Revisión Ficha de Inscripción",
        link: "/listRegistrationForm"
    },
    {
        title: "Revisión de Convenios",
        link: "/add-specialty"
    },
    {
        title: "Entregables - Alumno",
        link: "/deliverables"
    }

]

export default function(){
    return(
        <div className="FACINavBar">
            <nav>
                <ul className="FACINavBar__sidebarList" id='sidebarList'>
                    {dataNavbar.map((val,key)=>{
                        return (
                            <NavLink key = {key}
                                to = {val.link}
                                className = {`dataRow`}
                                >
                                <span className='texto'>
                                    {val.title}
                                </span>
                            </NavLink>
                        )
                    })}
                </ul>
            </nav>
        </div>
    )
    
}



