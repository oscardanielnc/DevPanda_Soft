import React, {useState} from "react";
import LayoutBasic from "../layouts/LayoutBasic";
import {Form} from 'react-bootstrap';
import { Link } from "react-router-dom";
import ToastPanda from "../components/Toast/ToastPanda";
import SupervisorSelector from "../components/ImageSelector/SupervisorSelector"
import { Image } from "react-bootstrap";
import './SupervisorSelection.scss';
import Timetable from "../components/Timetable/Timetable";
import { Button } from "react-bootstrap";



export default function SupervisorSelection () {
    const [supervisores, setSupervisores] = useState( [
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
            name:"Pedro Castillo"
        }
    ])
    return(
        <LayoutBasic>
            <div className='container principal'>
                <div className="row rows">
                    <h1>Eleccion de Supervisor</h1>
                </div>
                <div className="row" style={{"margin-left": "1.3em"}}>
                    <p style={{marginTop:"10px"}}>
                    Elige al asesor que prefieras para ver su disponibilidad.
                    </p>
                </div>
                <div className="row rows">     
                        <SupervisorSelector supervisor={supervisores}/>
                </div>
                <div className="row rows boton">
                    <Button className="btn btn-primary" style={{width:"40%"}}>Agendar</Button>
                </div>
            </div>     
        </LayoutBasic>        
    )
}

