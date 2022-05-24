import React from "react";
import Header from "../../components/Header";
import landin from "../../assets/png/landinxd.png";
import './scss/LandingPage.scss';
import { Button } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

export default function LandingPage () {
    const {user} = useAuth();
    return (
        <div className="landingPage">
            <Header/>
            <h1 className="landingPage__title">Dis is da landin peich prro</h1>
            <div className="landingPage__redirect">
                <h3>Usted ya ha iniciado su proceso de covalidadción de la PSP?</h3>
            {
                user? 
                <Link to="/redirect"><Button variant="primary">Continuar proceso</Button></Link>: 
                <Link to="/sign-up"><Button variant="primary">Empiezaz Ya!</Button></Link>
            }
            </div>
            
            <img src={landin} style={{width: "100%"}}/>
        </div>
    )
}