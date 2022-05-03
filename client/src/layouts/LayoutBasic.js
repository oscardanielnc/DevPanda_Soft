import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StudentNavBar from "../components/navBar/StudentNavbar"


import './LayoutBasic.scss';

export default function LayoutBasic (props) {
    const {children} = props;

    return (
        <div className="main">
            <div className="layout-basic">
                <Header />
                <div className = "row" style={{width: "100%"}}>
                    <div className="layout-basic__navbav">
                        <StudentNavBar/>
                    </div>
                    <div className="layout-basic__content">
                        {children}
                    </div>
                </div>    
                <Footer />
            </div>
        </div>

    )
}