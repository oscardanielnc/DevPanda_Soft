import React, { useEffect, useState } from 'react';
import { Button, OverlayTrigger, ProgressBar, Tooltip } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './StudentNavbar.scss';
import useAuth from "../../hooks/useAuth"
    
function StudentNavbar () {
    const {user} = useAuth();
    const [navbar, setNavbar] = useState([]);

    useEffect(()=> {
        const dataNavbar = [];       
        user.navbar.forEach(item => {
            const newItem = {
                ...item,
                link: getLink(item.code)
            }
            dataNavbar.push(newItem)
        })
        setNavbar(dataNavbar);
    }, [setNavbar])

    const getLink = code => {
        let name = '';
        switch (code) {
            case "CONV": name="/agreement"; break;
            case "NCON": name="/welcome-process"; break;
            case "MATR": name="/enrollment"; break;
            case "FINS": name="/inscription"; break;
            case "ESUP": name="/supervisor-selection"; break;
            case "IFIN": name="/final-report"; break;
            default: name="/deliverables"; break;
        }
        return `${name}/phase=${code}`
    }
    const getColorClassItem = position => {
        const currentPhase = user.estadoProceso;
        if(position < currentPhase) return 'completed';
        else if(position === currentPhase) return 'here';
        else return 'hiddenIcon';
    }
    const getNameTooltip = position => {
        const currentPhase = user.estadoProceso;
        if(position < currentPhase) return 'Completado';
        else if(position === currentPhase) return 'Actual';
        else return 'Bloqueado';
    }
    
    const transformText = `rotate(90deg) scale(${navbar.length/6},0.3) translate(${(navbar.length-6)*30}px, 410px)`;

    return(
    <div className="studentNavBar">
        <ProgressBar className= "studentNavBar__progressbar" 
            now={(100*(user.estadoProceso-1)/(navbar.length-1))} 
            variant="success"
            style={{transform: transformText}}
        />
        <nav className='studentNavBar__Nav'>
            <div>
                <div className='studentNavBar__Nav-titulo'>
                    <span>Tu progreso</span>
                    <Button className='studentNavBar__Nav-progress'
                        // onClick={() => document.getElementById("sidebarList").addClass("displayNone")} 
                        >
                        <i className="bi bi-chevron-down"/>
                    </Button>
                </div>         
            </div>
            
            <ul className="studentNavBar__sideBarList">
            {navbar.map(phase => {
                return (
                    <NavLink key = {phase.order}
                        to = {phase.link}
                        className = {e => 
                            `studentNavBar__sideBarList-dataRow ${getColorClassItem(phase.order)} ${e.isActive? "selected" : ""}`
                          }
                        >
                        <OverlayTrigger overlay={<Tooltip>{getNameTooltip(phase.order)}</Tooltip>}>
                            <span className='studentNavBar__sideBarList-dataRow-icono'><i className="bi bi-check"/></span>
                        </OverlayTrigger>
                        <span className='studentNavBar__sideBarList-dataRow-texto'>{phase.title}</span>
                    </NavLink>
                )
            })}
            </ul>
        </nav>
        <Button variant='secondary' className='studentNavBar__renuncia'>Renuncia</Button>
    </div>

    )

}

export default StudentNavbar;


