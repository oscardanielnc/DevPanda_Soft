import React, {useState, useEffect, createContext} from "react";
//import jwtDecode from "jwt-decode";
// import {
//     getAccessTokenApi, 
//     getRefreshTokenApi, 
//     refreshAccessTokenApi, 
//     logout
// } from '../api/auth';

export const AuthContext = createContext();
export default function AuthProvider({children}) {
    const [user, setUser] = useState({
        user: null,
        isLoading: true
    }) 

    useEffect(()=>{
        checkUserLogin(setUser)
    }, [setUser])

    return (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    )
}

function checkUserLogin(setUser) {
    //const accessToken = getAccessTokenApi()
    // if(!accessToken) {
    //     const refreshToken = getRefreshTokenApi()
    //     if(!refreshToken) {
    //         logout()
    //         setUser({
    //             user: null,
    //             isLoading: false
    //         })
    //     } else {
    //         refreshAccessTokenApi(refreshToken)
    //     }
    // } else {
    //     setUser({
    //         user: 
    //             jwtDecode(accessToken)
    //         ,
    //         isLoading: false
    //     })
    // }
    setUser({
        user: {
            idPersona: 1,
            fidEspecialidad: 1,
            nombres: "Oscar Daniel",
            apellidos: "Navarro Cieza",
            correo: "oscar.navarro@pucp.edu.pe",
            tipoPersona: 'A',
            activo: true,
            estadoMatriculado: true,
            estadoProceso: 1
        },
        isLoading: false
    })
}