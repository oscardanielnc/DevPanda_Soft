import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FACINavbar from "../components/navBarCoordFACI/FACINavbar";

import './LayoutCoordFACI.scss';

export default function LayoutBasic (props) {
    const {children} = props;

    return (
        <div className="main">
            <div className="layout-basic">
                <Header />
                <div className = "row layout-basic__superContainer" >
                    <div className="layout-basic__superContainer-navbav">
                        <FACINavbar />
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