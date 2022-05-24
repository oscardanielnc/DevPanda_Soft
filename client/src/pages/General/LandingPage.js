import React from "react";
import Header from "../../components/Header";
import landin from "../../assets/png/landinxd.png";
import './scss/LandingPage.scss';

export default function landingPage () {
    return (
        <div className="landingPage">
            <Header/>
            <h1 className="landingPage__title">Dis is da landin peich prro</h1>
            <img src={landin} style={{width: "100%"}}/>
        </div>
    )
}