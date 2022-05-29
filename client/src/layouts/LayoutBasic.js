import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StudentNavBar from "../components/Navbars/StudentNavbar"


import './LayoutBasic.scss';
import useAuth from "../hooks/useAuth";
import ForbiddenPage from "../pages/General/ForbiddenPage";

export default function LayoutBasic (props) {
    const {user} = useAuth();
    const {children} = props;

       
    // solo almnos pueden acceder a esta pagina 
    if(user.tipoPersona !== 'e') 
        return <ForbiddenPage />

    return (
        <div className="main">
            <div className="layout-basic">
                <Header />
                <div className = "row layout-basic__superContainer" >
                    <div className="layout-basic__superContainer-navbav">
                        <StudentNavBar/>
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