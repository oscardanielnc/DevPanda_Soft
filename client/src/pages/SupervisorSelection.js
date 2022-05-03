import React, {useState} from "react";
import LayoutBasic from "../layouts/LayoutBasic";
import {Form} from 'react-bootstrap';
import { Link } from "react-router-dom";
import ToastPanda from "../components/Toast/ToastPanda";
import SupervisorSelector from "../components/ImageSelector/SupervisorSelector"
import { Image } from "react-bootstrap";
import './SupervisorSelection.scss';

const supervisores = [
    {
        name: "Javier Palacios"
    },
    {
        name: "Luis Flores"
    },
    {
        name: "Andres Melgar"
    },
    {
        name:"Christian Ramirez"
    }
]

export default function SupervisorSelection () {
    return(
        <LayoutBasic>
            <div className='container principal'>
                <div className="row rows">
                    <h1>Eleccion de Supervisor</h1>
                </div>
                <div className="row row-sec">
                    <h5 style={{marginTop:"10px"}}>
                    Elige al asesor que prefieras para ver su disponibilidad.
                    </h5>
                </div>
                <div className="row">     
                        <SupervisorSelector supervisor={supervisores}/>
                </div>
            </div>     
        </LayoutBasic>        
    )
}

