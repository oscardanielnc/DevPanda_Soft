import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AdministrativeNavbar from "../components/Navbars/AdministrativeNavbar";

import './LayoutAdministrator.scss';

export default function LayoutAdministrator (props) {
    const {children} = props;

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