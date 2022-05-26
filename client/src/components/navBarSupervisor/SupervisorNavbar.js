import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './SupervisorNavbar.scss';



export default function(){
    const {user} = useAuth()
    const dataNavbar = [
        {
            title: "Agregar disponibilidad",
            link: `/add-disponibility/idSupervisor=${user.idPersona}`//esto no existe
        },
        {
            title: "Gestión de Reuniones",
            link: `/meetings-management/idSupervisor=${user.idPersona}`//esto no existe
        },
        {
            title:"Revision de entregable Informe Parcial",
            link: `/list-deliverables-partial`//esto no existe
        },
        
        {
            title: "Revision de entregable Informe Final",
            link: "/list-deliverables-final"//esto no existe
        }
    ]
    return(
        <div className="SupervisorNavbar">
            <nav>
                <ul className="SupervisorNavbar__sidebarList" id='sidebarList'>
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



