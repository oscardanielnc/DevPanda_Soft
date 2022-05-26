import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './AdministrativeNavbar.scss';

const secretary = [
    {
        title: "Disponibilidad Supervisores",
        link: `/list-supervisors` //EVALUAR SI LO VAMOS A PONER, ASIES
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

    const supervisor = [
        {
            title: "Disponibilidad y Reuniones",
            link: `/meetings-management/idSupervisor=${user.idPersona}&idProcess=${user.fidProceso}`
        },
        {
            title: "Gestión de Entregables",
            link: `/list-deliverables/idSupervisor=${user.idPersona}&idProcess=${user.fidProceso}`
        }
    ]
    const coorSpecialty = [
        {
            title: "Gestión de alumnos",
            link: `/students-management/idProcess=${user.fidProceso}`
        },
        {
            title: "Revisión de Convenios",
            link: `/list-students-agreement/idProcess=${user.fidProceso}`
        },
        // {
        //     title: "Entregables",
        //     link: `/list-students-deliverables/idProcess=${idProcess}`
        // },
        {
            title: "Gestión de supervisores",
            link: `/supervisors-management/idSpecialty=${user.fidEspecialidad}`
        },
        {
            title: "Configuración del proceso",
            link: `/config-process/idSpecialty=${user.fidEspecialidad}`
        },
        {
            title: "Gestión de Campos Ficha de Inscripción",
            link: `/inscription-config/idSpecialty=${user.fidEspecialidad}`
        },
        {
            title: "Revisión Ficha de Inscripción",
            link: `/list-inscriptions-form/idProcess=${user.fidProceso}`
        },
        {
            title: "Solicitudes sin convenio",
            link: `/list-students-requests/idProcess=${user.fidProceso}`
        }
    ]
    const coorFaci = [
        {
            title: "Revisión de Convenios",
            link: `/list-students-agreement/idProcess=${user.fidProceso}`
        },
        {
            title: "Revisión Ficha de Inscripción",
            link: `/list-inscriptions-form/idProcess=${user.fidProceso}`
        },
        {
            title: "Gestionar Especialidades",
            link: `/specialty-management`
        },
    ]

    useEffect(()=> {
        // switch (user.tipoPersonal) {
        //     case 'S': setNavbar(supervisor); break;
        //     case 'E': setNavbar(coorSpecialty); break;
        //     case 'F': setNavbar(coorFaci); break;
        //     case 'A': setNavbar(admin); break;
        //     default: setNavbar(secretary); break;
        // }
        setNavbar(coorSpecialty);
    }, [setNavbar])
    
    return(
        <div className="administrativeNavbar">
            <nav>
                <ul className="administrativeNavbar__sidebarList">
                    {navbar.map((val,key)=> {
                        return (
                            <NavLink key = {key}
                                to = {val.link}
                                className = {e => 
                                    `administrativeNavbar__sidebarList-dataRow ${e.isActive? "selected" : ""}`
                                  }
                                >
                                <span className='administrativeNavbar__sidebarList-texto'>
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