import React from "react";
import {Link} from 'react-router-dom';
import Logo from "../asserts/img/png/logoPUCP.PNG";
import LogoUsuario from "../asserts/img/png/usuarioImagen.PNG";
import useAuth from "../hooks/useAuth";
import './Header.scss';

export default function Header () {
    const {user} = useAuth()
    if(!user) {
        window.location.href = "/sign-in"
    }
    let typeUser = "";
    if(user.tipoPersona === 'e') typeUser="Estudiante"
    else {
        switch (user.tipoPersonal) {
            case 'S': typeUser="Supervisor"; break;
            case 'E': typeUser="Coordinador Especialidad"; break;
            case 'F': typeUser="Coordinador de FACI"; break;
            case 'A': typeUser="Administrador"; break;
            default: typeUser="Secretaria"; break;
        }
    }
    const fullName = `${user.nombres.split(' ')[0]}  ${user.apellidos.split(' ')[0]}`
    return ( user &&
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
                            {typeUser}: <br/>
                        </div>
                        <div>
                            <strong>{fullName}<br/></strong>
                        </div>
                    </div>
                    <div className="header__rightusuarioImagen">
                        <img src={LogoUsuario} alt="Jeison Romero"/>
                    </div>
                </div>
            </div>
    )
}