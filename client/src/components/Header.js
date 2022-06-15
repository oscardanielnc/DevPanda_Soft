import React, { useEffect } from "react";
import { logout } from "../api/auth";
import Logo from "../assets/png/logoPUCP.PNG";
import useAuth from "../hooks/useAuth";
import { signInApi } from "../api/auth";
import GoogleLogin from 'react-google-login';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import './Header.scss';
import jwtDecode from "jwt-decode";
import { GOOGLE_ID } from "../api/config";

export default function Header () {
    const {user} = useAuth();

    return (
        <div className="header">
            <div className="header__left">
                <div className="header__lefttitulo">
                <Link to="/">
                    <img src={Logo} alt="Jeison Romero"
                    style={{marginTop: "10px"}}
                    />
                </Link>
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
            <div className="header__right-specialty"><span>{user.nombreEsp && user.nombreEsp.toUpperCase()}</span></div>
            <div className="header__rightnombreUsuario">
                <div>
                    {typeUser}: <br/>
                </div>
                <div>
                    <strong>{fullName}<br/></strong>
            {/* <span>(Ingeniería informática)</span> */}
                </div>
            </div>
            <div className="header__rightusuarioImagen"
                onClick={()=> document.getElementById("logout").classList.toggle('hidden')}>
                    {user.foto? <img src={user.foto} className="header__rightusuarioImagen-img"/>: 
                        <i className="bi bi-person header__rightusuarioImagen-user"></i>}
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
    useEffect(()=> {
        /* global google */
        google.accounts.id.initialize({
            client_id: GOOGLE_ID,
            callback: responseGoogle
        })
        google.accounts.id.renderButton(document.getElementById("google-btn-signin"),
            {theme: "outline", size: "large"}
        )
    }, [])
    const responseGoogle = async (response) => {
        const jwtResponse = jwtDecode(response.credential);
        console.log(jwtResponse.email, jwtResponse.picture)
        const result = await signInApi(jwtResponse.email, jwtResponse.picture);
        console.log(result)

        if(result.success) {
            const {accessToken} = result;
            console.log(accessToken)
            localStorage.setItem("ACCESS_TOKEN", accessToken);
            window.location.href = "/redirect";
        } else {
            toast.error(result.message, {
                position: "top-right",
                autoClose: 3000,
            });
        }
    }

    return(
        <div className="header__right-notlogged">
            {/* <GoogleLogin
                className="btn btn-light header__right-notlogged-btn" 
                clientId="217315516782-dimqetb06qceps0d7su07rtlmr4s1bli.apps.googleusercontent.com"
                buttonText="Iniciar sesión"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            /> */}
            <div id="google-btn-signin"></div>
            <Link className="btn btn-danger header__right-notlogged-btn" 
                to="/sign-up">
                Registrarse
            </Link>
            <ToastContainer />  
        </div>
    )
}