import React from "react";
import './scss/LandingPage.scss';
import panda403 from "../../assets/gif/403.gif"
import "./scss/ForbiddenPage.scss";

export default function ForbiddenPage () {
    return (
        <div className="forbiddenPage">
            <div className="forbiddenPage__title">
                <h1 className="">403: Forbidden</h1>
                <h3>Ustede no tiene permitido acceder a esta página</h3>
            </div>
            <img src={panda403} alt="Panda Not Found" className="forbiddenPage__img"/>
        </div>
    )
}