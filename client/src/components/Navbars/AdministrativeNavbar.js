import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
// import './EspecNavbar.scss';
const supervisor = [
    {
        title: "Agregar disponibilidad",
        link: `/add-disponibility`//esto no existe
    },
    {
        title: "Gestión de Reuniones",
        link: `/meetings-management`//esto no existe
    },
    {
        title: "Gestión de Entregables",
        link: `/list-deliverables`//esto no existe
    }
]
const coorSpecialty = [
    {
        title: "Gestión de alumnos",
        link: `/students-management`
    },
    {
        title: "Revisión de Convenios",
        link: `/list-students-agreement`
    },
    {
        title: "Entregables",
        link: `/list-students-deliverables`
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
        title: "Gestión de Campos Ficha de Inscripción",
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
const coorFaci = [
    {
        title: "Revisión de Convenios",
        link: `/list-students-agreement`
    },
    {
        title: "Revisión Ficha de Inscripción",
        link: `/list-inscriptions-form`
    },
    {
        title: "Gestionar Especialidades",
        link: `/specialty-management`
    },
]
const secretary = [
    {
        title: "Disponibilidad Supervisores",
        link: `/list-supervisors`
    }
]
const admin = [
    {
        title: "Gestionar Especialidades",
        link: `/specialty-management`
    },
    {
        title: "Gestionar Coordinadores",
        link: `/coordinators-management`
    }
]


export default function AdministrativeNavbar() {
    const {user} = useAuth(); 
    const [navbar, setNavbar] = useState([]);

    useEffect(()=> {
        switch (user.tipoPersonal) {
            case 'S': setNavbar(supervisor); break;
            case 'E': setNavbar(coorSpecialty); break;
            case 'F': setNavbar(coorFaci); break;
            case 'A': setNavbar(admin); break;
            default: setNavbar(secretary); break;
        }
    }, [setNavbar])
    
    return(
        <div className="EspecNavBar">
            <nav>
                <ul className="EspecNavBar__sidebarList" id='sidebarList'>
                    {navbar.map((val,key)=>{
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