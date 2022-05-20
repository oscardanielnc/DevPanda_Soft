import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './FACINavbar.scss';



export default function(){
    const {user} = useAuth()
    const dataNavbar = [
        {
            title: "Revisión de Convenio y Plan de Aprendizaje",
            link: `/agreement-review/idStudent=${5}&idProcess=${user.fidProceso}`
        },
        {
            title: "Revisión Ficha de Inscripción",
            link: `/list-inscriptions-form/idSup=${user.idPersona}&idProcess=${user.fidProceso}`
        },
        {
            title: "Gestión de Especialidades (Admin)",
            link: "/"
        },
        {
            title: "Añadir especialidad (Admin)",
            link: "/add-specialty"
        }
    ]
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



