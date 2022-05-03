import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FACINavbar.scss';
import {FACISideBarData} from './FACISidebarData'

export default function(){
    return(
        <div className="FACINavBar">
        <nav>
            <ul className="sidebarList">
            {FACISideBarData.map((val,key)=>{
                return <li key = {key} className= "dataRow" id ={window.location.pathname === val.link ? "active" : ""}>
                        <Link to = {val.link}>
                                               
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