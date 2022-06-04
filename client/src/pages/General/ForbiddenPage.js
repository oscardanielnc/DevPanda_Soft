import React from "react";
import './scss/LandingPage.scss';
import panda403 from "../../assets/gif/403.gif"
import "./scss/ForbiddenPage.scss";
import {Link} from "react-router-dom";
import { getRandomInt } from "../../utils/objects";

export default function ForbiddenPage () {
    const changePosition = e => {
        let l = getRandomInt(-65,65);
        const currL = e.target.style.left;
        let t = getRandomInt(-65,65);
        const currT = e.target.style.left;
        if(Math.abs(l - currL) <30) l =l+30;
        if(Math.abs(t - currT) <30) t =t+30;
        e.target.style.left = `${l}%`
        e.target.style.top = `${t}%`
    }

    return (
        <div className="forbiddenPage">
            <div className="forbiddenPage__title">
                <h1 className="">403: Forbidden</h1>
                <h3>Ustede no tiene permitido acceder a esta página</h3>
            </div>
            <h2 className="forbiddenPage__travieso">Captura al panda travieso para regresar al Landing Page 😁</h2>
            <Link to="/"  onMouseOver={changePosition}>
                <img src={panda403} alt="Panda Not Found"
                    className="forbiddenPage__img" />
            </Link>
        </div>
    )
}