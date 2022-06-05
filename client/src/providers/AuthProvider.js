import React, {useState, createContext} from "react";
import { getAccessTokenApi, logout } from "../api/auth";
import jwtDecode from "jwt-decode";

let preUser = null
const accessToken = getAccessTokenApi();
if(accessToken) {
    preUser = jwtDecode(accessToken);
} else {
    logout();
    preUser = null
}

export const AuthContext = createContext();
export default function AuthProvider({children}) {
    const [user, setUser] = useState(preUser);

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}
