import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StudentNavBar from "../components/navBar/StudentNavbar"


import './LayoutBasic.scss';

export default function LayoutBasic (props) {
    const {children} = props;

    return (
        <div class="container"> 
            <div className="layout-basic">
                <Header />
                
                    <div class = "row">
                        <div class = "col-sm-3">
                            <StudentNavBar/>
                        </div>
                        <div className = "col align-self-center">
                            {children}
                        </div>
                    </div>    
                        
                <Footer />
            </div>
        </div>
    )
}