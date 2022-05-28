import React from "react";
import panda404 from '../../assets/gif/404.gif';
import {Link} from 'react-router-dom';
import './scss/Error404.scss'

export default function Error404 () {
    return (
        <div className="error404">
            <div className="error404__title">
                <h1 className="">404: Page not found</h1>
                <Link className="btn btn-light error404__btn" to = "/" >Regresar al Landing Page</Link>
            </div>
            <img src={panda404} alt="Panda Not Found" className="error404__img"/>
        </div>
    )
}