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
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                            </svg> 
                        </span>
                        <span className='expandIcon'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                            </svg>
                        </span>

                    </span>         
            </li>
            
                <ul className="sidebarList">
                {StudentSideBarData.map((val,key)=>{
                    return <li key = {key} className= "dataRow" >
                            <NavLink 
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
                            </li>
                })}
                </ul>
                <Button className="btn btn-secondary" style={{width:"80%"}} >Renuncia</Button>

        </nav>

    </div>

    )

}

export default StudentNavbar;


