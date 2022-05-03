import React, { useState } from 'react';
import { NavItem,Button } from 'react-bootstrap';
import { Link,NavLink } from 'react-router-dom';
import './StudentNavbar.scss';
import {StudentSideBarData} from './StudentSidebarData'
import useAuth from "../../hooks/useAuth"



function StudentNavbar (props){
    const [progreso, setProgreso] = useState(2)
    
    const [littleDisplay, setLittleDisplay] = useState('none')

    function handleClick(){
        if (littleDisplay == 'none'){
            setLittleDisplay('block')
        }else{
            setLittleDisplay('none')
        }
    }

    return(
    <div className="studentNavBar">
        <nav>
            <li >
                <span className='titulo' >
                <Button className='progress' >Tu progreso</Button>

                    <span className='contractIcon'>
                        <i class="bi bi-chevron-down"/>
                    </span>
                    <span className='expandIcon'>
                        <i class="bi bi-chevron-up" />
                    </span>

                </span>         
            </li>
            
            <ul className="sidebarList">
            {StudentSideBarData.map((val,key)=>{
                return (
                    <NavLink key = {key}
                        to = {val.link}
                        className = {`dataRow ${(progreso>key)? "active": ''} ${(window.location.pathname== val.link)? "current": ''}`}
                        >
                        <span className='icono'>
                        {val.icon}
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


