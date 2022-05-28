import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AdministrativeNavbar from "../components/Navbars/AdministrativeNavbar";
import useAuth from "../hooks/useAuth";
import './LayoutBasic.scss';
import ForbiddenPage from "../pages/General/ForbiddenPage";

export default function LayoutAdministrative (props) {
    const {user} = useAuth();
    const {children} = props;

    // solo administrativos pueden acceder a esta pagina 
    if(user.tipoPersona === 'e' || !isAllowed(user.tipoPersonal)) 
        return <ForbiddenPage />

    return (
        <div className="main">
            <div className="layout-basic">
                <Header />
                <div className = "row layout-basic__superContainer" >
                    <div className="layout-basic__superContainer-navbav">
                        <AdministrativeNavbar />
                    </div>
                    <div className="layout-basic__superContainer-content">
                        {children}
                    </div>
                </div>    
                <Footer />
            </div>
        </div>

    )
}

function isAllowed(personalType) {
    const ruta = window.location.href;
    const prePrermisions = ruta.split("permissions=")[1];
    const permissions = prePrermisions.split("&")[0];

    for(let i=0; i<permissions.length; i++) {
        const c = permissions.charAt(i);
        console.log(c)
        if(personalType===c)
            return true
    }
    return false
}