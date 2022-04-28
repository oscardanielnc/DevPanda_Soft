import React from "react";
import {Link} from 'react-router-dom';
import Logo from "../asserts/img/png/logoPUCP.PNG";
import LogoUsuario from "../asserts/img/png/usuarioImagen.PNG";
import './Header.scss';

export default function Header (props) {
    return (
        <div className="header">
                <div className="header__left">
                    <div className="header__lefttitulo">
                        <img src={Logo} alt="Jeison Romero"
                        style={{marginTop: "10px"}}
                        />
                    </div>
                </div>
                <div className="header__right">
                    <div className="header__rightnombreUsuario">
                        <div>
                            Coordinador:<br/>
                        </div>
                        <div>
                            Carlos Alberto<br/>
                        </div>
                    </div>
                    <div className="header__rightusuarioImagen">
                        <img src={LogoUsuario} alt="Jeison Romero"/>
                    </div>
                </div>
            </div>
    )
}