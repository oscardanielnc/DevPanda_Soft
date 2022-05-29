import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './AdministrativeNavbar.scss';

const secretary = [
    {
        title: "Disponibilidad Supervisores",
        link: `/list-supervisors/permissions=C` //EVALUAR SI LO VAMOS A PONER, ASIES
    }
]
const admin = [
    {
        title: "Gestionar Especialidades",
        link: `/specialty-management/permissions=AF`
    },
    {
        title: "Gestionar Coordinadores",
        link: `/coordinators-management/permissions=AF`
    }
]

export default function AdministrativeNavbar() {
    const {user} = useAuth(); 
    const [navbar, setNavbar] = useState([]);

    const supervisor = [
        {
            title: "Disponibilidad y Reuniones",
            link: `/meetings-management/permissions=SC&idSupervisor=${user.idPersona}&idProcess=${user.fidEspecialidad}`
        },
        {
            title: "Gestión de Entregables",
            link: `/list-deliverables/permissions=S&idProcess=${user.fidEspecialidad}`
        }
    ]
    const coorSpecialty = [ 
        {
            title: "Gestión de alumnos",
            link: `/students-management/permissions=E&idProcess=${user.fidEspecialidad}`
        },
        {
            title: "Solicitudes sin convenio",
            link: `/list-students-requests/permissions=E&idProcess=${user.fidEspecialidad}`
        },
        {
            title: "Revisión de Convenios",
            link: `/list-students-agreement/permissions=EF&idProcess=${user.fidEspecialidad}`
        },
        // {
        //     title: "Entregables",
        //     link: `/list-students-deliverables/idProcess=${idProcess}`
        // },
        {
            title: "Gestión de supervisores",
            link: `/supervisors-management/permissions=E`
        },
        {
            title: "Configuración del proceso",
            link: `/config-process/permissions=E`
        },
        {
            title: "Gestión de Campos Ficha de Inscripción",
            link: `/inscription-config/permissions=E`
        },
        {
            title: "Revisión Ficha de Inscripción",
            link: `/list-inscriptions-form/permissions=EF&idProcess=${user.fidEspecialidad}`
        },
    ]
    const coorFaci = [
        {
            title: "Revisión de Convenios",
            link: `/list-students-agreement/permissions=EF&idProcess=${user.fidEspecialidad}`
        },
        {
            title: "Revisión Ficha de Inscripción",
            link: `/list-inscriptions-form/permissions=EF&idProcess=${user.fidEspecialidad}`
        },
        {
            title: "Gestionar Especialidades",
            link: `/specialty-management/permissions=AF`
        },
        {
            title: "Gestionar Coordinadores",
            link: `/coordinators-management/permissions=AF`
        }
    ]

    useEffect(()=> {
        switch (user.tipoPersonal) {
            case 'S': setNavbar(supervisor); break;
            case 'E': setNavbar(coorSpecialty); break;
            case 'F': setNavbar(coorFaci); break;
            case 'A': setNavbar(admin); break;
            default: setNavbar(secretary); break;
        }
        // setNavbar(coorSpecialty);
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

// // te devolvere
// const objGet = {
//     firstname: "",
//     lastname: "",
//     email: "",
//     code: "",
//     zoom: {
//         link: "",
//         date: "dd/MM/aaaa",
//         hour: "23:59"
//     }
// }
// // me envias
// const obtPut = {
//     idHorario: 1,
//     link: ""
// }


// crear supervisores y coorEspecialides <-----------
// excel <-----------
// modificar fidAsesor cuando ya selecciona asies  
// coordEsp vigente <-----------
// docs con horas como moment <-----------
// bloqueo