import React from "react";
import { logout } from "../api/auth";
import Logo from "../assets/png/logoPUCP.PNG";
import LogoUsuario from "../assets/png/usuarioImagen.PNG";
import useAuth from "../hooks/useAuth";
import { signInApi } from "../api/auth";
import GoogleLogin from 'react-google-login';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import './Header.scss';

export default function Header () {
    const {user} = useAuth();

    return (
        <div className="header">
            <div className="header__left">
                <div className="header__lefttitulo">
                    <img src={Logo} alt="Jeison Romero"
                    style={{marginTop: "10px"}}
                    />
                </div>
            </div>
            {user? <HeaderLogged user={user}/>: <HeaderNotLogged />}
        </div>
    )
}

function HeaderLogged ({user}) {
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
    const handleLogOut = () => {
        logout();
        window.location.href = "/";
    }
    const fullName = `${user.nombres.split(' ')[0]}  ${user.apellidos.split(' ')[0]}`;
    return (
        <div className="header__right">
            <div className="header__rightnombreUsuario">
                <div>
                    {typeUser}: <br/>
                </div>
                <div>
                    <strong>{fullName}<br/></strong>
                </div>
            </div>
            <div className="header__rightusuarioImagen"
                onClick={()=> document.getElementById("logout").classList.toggle('hidden')}>
                <img src={LogoUsuario} alt="Jeison Romero"/>
            </div>
            <div className="header__logout hidden" id="logout">
                <div className="header__logout-info">
                    <span>{user.correo}</span>
                    {user.codigo && <strong>{user.codigo}</strong>}
                </div>
                <div className="header__logout-btn">
                    <button className="btn btn-light btn-custm" 
                        onClick={handleLogOut}>
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </div>
    )
}
function HeaderNotLogged () {
    const responseGoogle = async (response) => {
        const result = await signInApi(response.profileObj.email);

        if(result.success) {
            const {accessToken} = result;
            localStorage.setItem("ACCESS_TOKEN", accessToken);
            window.location.href = "/redirect";
        } else {
            toast.error(result.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    return(
        <div className="header__right-notlogged">
            <GoogleLogin
                className="btn btn-light header__right-notlogged-btn" 
                clientId="217315516782-dimqetb06qceps0d7su07rtlmr4s1bli.apps.googleusercontent.com"
                buttonText="Iniciar sesión"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
            <Link className="btn btn-danger header__right-notlogged-btn" 
                to="/sign-up">
                Registrarse
            </Link>
            <ToastContainer />  
        </div>
    )
}