import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { specialtySelectAllApi } from "../../api/specialty";
import TableResignationRequests from "../../components/Tables/TableResignationRequests";
import LayoutAdministrative from '../../layouts/LayoutAdministrative';
import useAuth from "../../hooks/useAuth";
import FilterData from "../../components/Filters/FilterData";
import {Form, FormControl} from 'react-bootstrap';
import useWindowDimensions from "../../hooks/useWindowResize";

import {getListStudentsRequests} from  "../../api/request";


const dataDummy = [
    /*
    {
        idSolicitud: 1,
        idAlumno : 1,
        nombreAlumno: "Javier Palacios",
        estado: "Aprobado",
        codigo:""
    },
    {
        idSolicitud: 2,
        idAlumno : 2,
        nombreAlumno: "Gianfranco Montoya",
        estado: "Aprobado",
        codigo:""
    },
    {
        idSolicitud: 3,
        idAlumno : 3,
        nombreAlumno: "Oscar Navarro",
        estado: "Sin Calificar",
        codigo:""
    },
    {
        idSolicitud: 4,
        idAlumno : 4,
        nombreAlumno: "Christian Ramirez",
        estado: "Sin Calificar",
        codigo:""
    },
    {
        idSolicitud: 5,
        idAlumno : 5,
        nombreAlumno: "Jeison Romero",
        estado: "Aprobado",
        codigo:""
    },
    {
        idSolicitud: 6,
        idAlumno : 6,
        nombreAlumno: "Marcelo Hurtado",
        estado: "Aprobado",
        codigo:""
    },
    {
        idSolicitud: 7,
        idAlumno : 7,
        nombreAlumno: "Leandro Saenz",
        estado: "Desaprobado",
        codigo:""
    },
    {
        idSolicitud: 8,
        idAlumno : 8,
        nombreAlumno: "José Huertas",
        estado: "Aprobado",
        codigo:""
    },
    {
        idSolicitud: 9,
        idAlumno : 9,
        nombreAlumno: "Diego Rodriguez",
        estado: "Aprobado",
        codigo:""
    }
    */
]

const states = [
    {
        name: "Aprobado",
        value: "Aprobado"
    },
    {
        name: "Desaprobado",
        value: "Desaprobado"
    },
    {
        name: "Sin revisar",
        value: "Sin revisar"
    }
]

const statesSpecialty = [
    {
        name: "Informática",
        value: "Informática"
    },
    {
        name: "Industrial",
        value: "Industrial"
    }
]

let textFilter = ""
let textSelect = "-1"




export default function ListResignationRequests () {
    window.scrollTo(0, 0);
    const {user} = useAuth();
    const [alumnos, setAlumnos] = useState([]);
    const [statesSpecialty2, setStatesSpecialty2] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    // const [textFilter, setTextFilter] = useState("");
    // const [textSelect, setTextSelect] = useState("-1");

    //console.log(useAuth()); // el useAuth() nos permite acceder a la informacion del usuario desde cualquier lugar. Por ahora ese objeto esta hardcodeado.
    console.log("El user tiene: ",user);   
    
    useEffect(()=> {
        const fetchData = async () => {
            getListStudentsRequests(user.fidProceso).then(response => {
                console.log(response)            
                if(response.success===true) {
                    console.log("En el success el response es: ",response);
                    setAlumnos(response.data);
                    setFilteredData(response.data);
                }

            })
        }
        fetchData()
    }, [setAlumnos])


    useEffect(()=> {
        const fetchData = async () => {
            specialtySelectAllApi().then(response => {
                console.log(response)            
                if(response.success===true) {
                    console.log("En el success el response especial es: ",response);
                    setStatesSpecialty2(response.specialties);
                }
            })
        }
        fetchData()
    }, [setStatesSpecialty2])

    const filter = e => {
        const text = e.target.value.toUpperCase();
        if(e.target.name === "select") textSelect = text
        else textFilter = text
        
        setFilteredData(alumnos.filter(obj => {
            //console.log('textFilter', textFilter)
            //console.log('textSelect', textSelect)
            if(textSelect === "-1") {
                return  obj.nombreAlumno.toUpperCase().includes(textFilter)
            }
            return obj.estado.toUpperCase() === textSelect && obj.nombreAlumno.toUpperCase().includes(textFilter)
       }))

    }
    
    const Component = () =>{
        const {height,width} = useWindowDimensions();
    }

    return (
        
        <LayoutAdministrative>
            
            <div className="container principal">
                <div className="row rows studentManagement__title">
                    <h1>Solicitudes de renuncia de PSP</h1>
                </div>
                <div className="row rows studentRequests__title">
                    Buscar por nombres, estado o especialidad. 
                </div>
                <div className="row rows studentManagement__actions">
                    <FormControl
                        placeholder={"Filtrar alumnos"}
                        onChange={filter}
                        name="filter"
                        style={{width: "60%"}}
                    />
                    
                    <Form.Select className="studentManagement__select form-select" style={{width: "20%"}} onChange={filter} name="select">
                        <option value="-1">Especialidad</option>
                        {
                            statesSpecialty2.map((element, index) => (
                                <option value={element.idEspecialidad} 
                                    key={index}>{element.nombreEsp}
                                </option>
                            ))
                        }
                    </Form.Select>
                    <Form.Select className="studentManagement__select form-select" style={{width: "20%"}} onChange={filter} name="select">
                        <option value="-1">Estado</option>
                        {
                            states.map((element, index) => (
                                <option value={element.value} 
                                    key={index}>{element.name}
                                </option>
                            ))
                        }
                    </Form.Select>
                    
                </div>
                <div className="row rows">
                    <TableResignationRequests rows={filteredData}/>
                </div>

            </div>
        </LayoutAdministrative>
    )
}

