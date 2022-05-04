import React, {useState, useEffect, createContext} from "react";
import { getAccessTokenApi } from "../api/auth";
import jwtDecode from "jwt-decode";
// import {
//     getAccessTokenApi, 
//     getRefreshTokenApi, 
//     refreshAccessTokenApi, 
//     logout
// } from '../api/auth';

export const AuthContext = createContext();
export default function AuthProvider({children}) {
    const [userLoading, setUserLoading] = useState({
        user: null,
        isLoading: true
    }) 

    useEffect(()=>{
        checkUserLogin(setUserLoading)
    }, [setUserLoading])

    return (
        <AuthContext.Provider value={userLoading}>
            {children}
        </AuthContext.Provider>
    )
}

function checkUserLogin(setUserLoading) {
    const accessToken = getAccessTokenApi();
    // solo si tenemos el accessToken en el localStorege lo seteamos en accessToken, que es el value de este hook
    if(accessToken) {
        setUserLoading({
            user: jwtDecode(accessToken),
            //user: accessToken,
            isLoading: false
        })
    } else {
        setUserLoading({
            user: null,
            isLoading: false
        })
    }

    // setUser({
    //     user: {
    //         idPersona: 1,
    //         fidEspecialidad: 1,
    //         nombres: "Oscar Daniel",
    //         apellidos: "Navarro Cieza",
    //         correo: "oscar.navarro@pucp.edu.pe",
    //         tipoPersona: 'A',
    //         activo: true,
    //         estadoMatriculado: true,
    //         estadoProceso: 1
    //     },
    //     isLoading: false
    // })
}