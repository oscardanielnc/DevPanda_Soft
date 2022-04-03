import React from "react";
import {Link} from 'react-router-dom'

import './Header.scss';

export default function Header (props) {
    return (
        <div className="header">
                <div className="header__titulo">
                    <h1>DevPanda</h1>
                </div>
                <div className="header__menu">
                    <Link className="header__menu-option" to="/" >Home</Link>
                    <Link className="header__menu-option" to="/home2" >Home2</Link>
                </div>
            </div>
    )
}