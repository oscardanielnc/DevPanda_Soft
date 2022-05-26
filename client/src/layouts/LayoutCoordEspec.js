import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EspecNavbar from "../components/navBarCoordEspec/EspecNavbar";

import './LayoutCoordEspec.scss';

export default function LayoutCoordEspec (props) {
    const {children} = props;

    return (
        <div className="main">
            <div className="layout-basic">
                <Header />
                <div className = "row layout-basic__superContainer" >
                    <div className="layout-basic__superContainer-navbav">
                        <EspecNavbar />
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