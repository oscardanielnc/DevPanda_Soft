import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './EspecNavbar.scss';



export default function(){
    const {user} = useAuth()
    const dataNavbar = [
        {
            title: "Gestión de alumnos (Coor Esp)",
            link: `/students-management`
        },
        {
            title: "Revisión de Convenio y Plan de Aprendizaje",
            link: `/list-students-agreement`
        },
        {
            title:"Revision de entregables",
            link: `/list-students-deliverables`//esto no existe
        },
        {
            title: "Gestión de supervisores",
            link: `/supervisors-management`//esto no existe
        },
        {
            title: "Configuración del proceso",
            link: "/config-process"//esto no existe
        },
        {
            title: "Gestión de campos ficha de inscripción",
            link: `/registration-config`//esto no existe
        },
        {
            title: "Revisión Ficha de Inscripción",
            link: `/list-inscriptions-form`
        },
        {
            title: "Solicitudes sin convenio",
            link: "/list-students-requests"
        }
    ]
    return(
        <div className="EspecNavBar">
            <nav>
                <ul className="EspecNavBar__sidebarList" id='sidebarList'>
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



