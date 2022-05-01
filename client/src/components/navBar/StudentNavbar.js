import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from './studentSidebarData';
import './StudentNavbar.scss';
import { IconContext } from 'react-icons';

function StudentNavbar (){
    return(
    <>
    <div className='studentSideBar'>
        <ul>
            SidebarData.map()
        </ul>
    </div>
    </>
    )

}


