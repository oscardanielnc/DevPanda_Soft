import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SupervisorNavbar from "../components/navBarSupervisor/SupervisorNavbar";

import './LayoutSupervisor.scss';

export default function LayoutSupervisor(props) {
    const {children} = props;

    return (
        <div className="main">
            <div className="layout-basic">
                <Header />
                <div className = "row layout-basic__superContainer" >
                    <div className="layout-basic__superContainer-navbav">
                        <SupervisorNavbar />
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