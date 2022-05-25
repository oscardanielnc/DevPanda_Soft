import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SecretaryNavbar from "../components/navBarSecretary/SecretaryNavbar";

import './LayoutSecretary.scss';

export default function LayoutSecretary (props) {
    const {children} = props;

    return (
        <div className="main">
            <div className="layout-basic">
                <Header />
                <div className = "row layout-basic__superContainer" >
                    <div className="layout-basic__superContainer-navbav">
                        <SecretaryNavbar />
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