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
    const dataDummy = {
        "idAlumno":1,
        "supervisor":{
            "nombre":"Andres Melgar",
            "horario":{
                "seleccionado":true,
                "dia":5,
                "mes":4,
                "anio":2022,
                "hora":8,
            }
        }
    }
    const [data, setData] = useState(dataDummy)
    let result=true;
    const insert = async e => {
        /*
        e.preventDefault();
        //si se selecciona al menos un horario, se hace la insersion de horario
        if(data.supervisor.horario.seleccionado === true){
            let response=null;
            response = await selectSupervisorSchedule(data);
            
            if(response.success){
                toast.success("Se seleccionó correctmente a un supervisor", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }else{
                toast.error('Ups, ha ocurrido un error', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }   
        }*/
    }
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
                <div className="row rows">
                    <Timetable/>
                </div>
                <div className="row rows boton">
                    <Button className="btn btn-primary" style={{width:"40%"}}>Agendar</Button>
                </div>
            </div>     
        </LayoutBasic>        
    )
}