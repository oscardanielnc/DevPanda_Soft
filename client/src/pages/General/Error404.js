import React from "react";
import panda404 from '../../assets/png/panda404.png';
import {Link} from 'react-router-dom';
import './scss/Error404.scss'

export default function Error404 () {
    return (
        <div className="error404">
            <h1 className="error404__title">404: Page not found</h1>
            <Link className="btn btn-light error404__btn" to = "/" >Regresar al Landing Page</Link>
            <img src={panda404} alt="Panda Not Found" className="error404__img"/>
        </div>
    )
}