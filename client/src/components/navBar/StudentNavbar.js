import React, { useState } from 'react';
import { NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './StudentNavbar.scss';
import {StudentSideBarData} from './StudentSidebarData'



function StudentNavbar (){
    return(
    <div className="studentNavBar">
        <nav>
            <li >
                <span className='titulo' style={{"paddingLeft":"30px"}} >
                Tu progreso 
                </span>
            </li>
            <ul className="sidebarList">
            {StudentSideBarData.map((val,key)=>{
                return <li key = {key} className= "dataRow" id ={window.location.pathname == val.link ? "active" : ""}>
                        <Link to = {val.link}>
                            <span className='icono'>
                            {val.icon}
                            </span>
                       
                            <span className='texto'>
                                
                                {val.title}
                            </span>
                        </Link>
                        </li>
            })}
            </ul>
        </nav>
    </div>

    )

}

export default StudentNavbar;


