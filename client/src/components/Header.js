import React from "react";
import {Link} from 'react-router-dom';
import Logo from "../asserts/img/png/logoPUCP.PNG";
import LogoUsuario from "../asserts/img/png/usuarioImagen.PNG";
import './Header.scss';

export default function Header (props) {
    return (
        <div className="header">
                <div className="header__titulo">
                    <img src={Logo} alt="Jeison Romero"
                    style={{marginTop: "10px"}}
                    />
                </div>
                <div className="header__menu">
                    <Link className="header__menu-option" to="/" >Home</Link>
                    <Link className="header__menu-option" to="/home2" >Home2</Link>
                </div>
                <div className="header__nombreUsuario">
                    <div>
                        Coordinador:<br/>
                    </div>
                    <div>
                        Carlos Alberto<br/>
                    </div>
                </div>
                <div className="header__usuarioImagen">
                    <img src={LogoUsuario} alt="Jeison Romero"/>
                </div>
            </div>
    )
}