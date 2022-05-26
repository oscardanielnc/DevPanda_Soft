import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './AdministratorNavbar.scss';



export default function(){
    const {user} = useAuth()
    const dataNavbar = [
        {
            title: "Gestionar Especialidades",
            link: `/specialty-management`
        },
        {
            title: "Gestionar Coordinadores",
            link: `/coordinators-management`//esto no existe
        }
    ]
    return(
        <div className="AdministratorNavbar">
            <nav>
                <ul className="AdministratorNavbar__sidebarList" id='sidebarList'>
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



