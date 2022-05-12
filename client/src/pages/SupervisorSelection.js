import React, {useState,useEffect} from "react";
import LayoutBasic from "../layouts/LayoutBasic";
import {Form} from 'react-bootstrap';
import { Link } from "react-router-dom";
import ToastPanda from "../components/Toast/ToastPanda";
import SupervisorSelector from "../components/ImageSelector/SupervisorSelector"
import { Image } from "react-bootstrap";
import './SupervisorSelection.scss';
import Timetable from "../components/Timetable/Timetable";
import { Button } from "react-bootstrap";
import {searchAssessorsBySpecialty} from "../api/administratives"

const idAlumno = 5;
const dataDummy = [
    {
        id:9,
        name: "Javier Palacios",
        idfacultad:"informatica",
        isSelected: true,
        isMySupervisor: false
    },
    {
        id:10,
        name: "Luis Flores",
        idfacultad:"informatica",
        isSelected: false,
        isMySupervisor: false
    },
    {
        id:11,
        name: "Andres Melgar",
        idfacultad:"informatica",
        isSelected: false,
        isMySupervisor: false
    }
]

export default function SupervisorSelection () {
    const [supervisores, setSupervisores] = useState([]);
    const [idSupSelected, setIdSupSelected] = useState(1);
    console.log(supervisores, idSupSelected)
    useEffect(() => {
        // searchAssessorsBySpecialty(idAlumno).then(response => {
            // if(response.success) {
                // setSupervisores(response.supervisores);
                setSupervisores(dataDummy);
            // }
            // console.log('Respuesta:',response)
        // })
    }, [setSupervisores])
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
                    <SupervisorSelector supervisores={supervisores} setSupervisores={setSupervisores} setIdSupSelected={setIdSupSelected}/>
                </div>
                <div className="row rows">
                    <Timetable idSupervisor={idSupSelected}/>
                </div>
                <div className="row rows boton">
                    <Button className="btn btn-primary" style={{width:"40%"}}>Agendar</Button>
                </div>
            </div>     
        </LayoutBasic>        
    )
}