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
import {searchAssessorsBySpecialty} from "../api/schedule"

const idEspecialidad = 1
    /*
    const [supervisores, setSupervisores] = useState( [
        {
            id:1,
            name: "Javier Palacios",
            idfacultad:"informatica",
            isSelected: true,
            isMySupervisor: false
        },
        {
            id:2,
            name: "Luis Flores",
            idfacultad:"informatica",
            isSelected: false,
            isMySupervisor: false
        },
        {
            id:3,
            name: "Andres Melgar",
            idfacultad:"informatica",
            isSelected: false,
            isMySupervisor: false
        },
        {
            id:4,
            name:"Pedro Castillo",
            idfacultad:"informatica",
            isSelected: false,
            isMySupervisor: false
        }
    ])
*/

export default function SupervisorSelection () {
    const [supervisores, setSupervisores] = useState([]);
    var [idSupSelected, setIdSupSelected] = useState(9);
    var [flagSeleccion,setflagSeleccion]=useState(0);
    const [horarioSeleccionado,setHorarioSeleccionado]=useState([])
    useEffect(() => {
          searchAssessorsBySpecialty(idEspecialidad).then(response => {
              
              if(response.success) {
                  setSupervisores(response.supervisors);
              }
              console.log('Respuesta:',response)
          })
     }, [setSupervisores])

    useEffect(() => {

   }, [setIdSupSelected])

    const insertHorario = async e => {
        /*
        e.preventDefault();
        //si se selecciona al menos un horario, se hace la insersion de horario
        if(flagSeleccion === 1){
            let response=null;
            response = await changeOneHourSchedule(horarioSeleccionado);
            
            if(response.success){
                toast.success("Se seleccionó correctmente a un horario", {
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

    return( supervisores.length>0 &&
        <LayoutBasic>
            <div className='container principal'>
                <div className="row rows">
                    <h1>Eleccion de Supervisor</h1>
                </div>
                <div className="row" style={{marginLeft: "1.3em"}}>
                    <p style={{marginTop:"10px"}}>
                    Elige al asesor que prefieras para ver su disponibilidad.
                    </p>
                </div>
                <div className="row rows">     
                    <SupervisorSelector supervisores={supervisores} setSupervisores={setSupervisores} setIdSupSelected={setIdSupSelected}/>
                </div>
                <div className="row rows">
                    <Timetable idSupervisor={idSupSelected} setflagSeleccion={setflagSeleccion} setHorarioSeleccionado={setHorarioSeleccionado}/>
                </div>
                <div className="row rows boton">
                    <Button className="btn btn-primary" style={{width:"40%"}} onClick={insertHorario}>Agendar</Button>
                </div>
            </div>     
        </LayoutBasic>        
    )
}