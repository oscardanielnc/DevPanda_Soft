import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './SecretaryNavbar.scss';



export default function(){
    const {user} = useAuth()
    const dataNavbar = [
        {
            title: "Disponibilidad Supervisores",
            link: `/list-supervisors`
        }
    ]
    return(
        <div className="SecretaryNavbar">
            <nav>
                <ul className="SecretaryNavbar__sidebarList" id='sidebarList'>
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



