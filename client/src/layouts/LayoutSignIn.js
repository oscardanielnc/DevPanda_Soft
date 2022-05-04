import React from "react";
import Footer from "../components/Footer";


import './LayoutSignIn.scss';

export default function LayoutSignIn (props) {
    const {children} = props;

    return (
        <div className="layout-signin">
            {children}
            <Footer />
        </div>
    )
}