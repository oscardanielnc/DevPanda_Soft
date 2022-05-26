import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { specialtySelectAllApi } from "../api/specialty";
import TableAgreementsRequests from "../components/Tables/TableAgreementsRequests";
import LayoutBasic from "../layouts/LayoutCoordFACI";
import './ListAgreementsRequests.scss';
import useAuth from "../hooks/useAuth";
import FilterData from "../components/Filters/FilterData";
import {Form, FormControl} from 'react-bootstrap';
import useWindowDimensions from "../hooks/useWindowResize";
import {getListStudentsRequests} from  "../api/request";


const dataDummy = [
    /*
    {
        idAlumno : "1",
        nombreAlumno: "Carlos Lescano",
        especialidad: "Ing. Informática",
        estado: "Aprobado"
    },
    {
        idAlumno : "2",
        nombreAlumno: "Gianfranco Montoya",
        especialidad: "Ing. Industrial",
        estado: "Aprobado"
    },
    {
        idAlumno : "3",
        nombreAlumno: "Oscar Navarro",
        especialidad: "Ing. Telecomunicaciones",
        estado: "Sin Calificar"
    },
    {
        idAlumno : "4",
        nombreAlumno: "Christian Ramirez",
        especialidad: "Ing. Informática",
        estado: "Sin Calificar"
    },
    {
        idAlumno : "5",
        nombreAlumno: "Jeison Romero",
        especialidad: "Ing. Industrial",
        estado: "Aprobado"
    },
    {
        idAlumno : "6",
        nombreAlumno: "Marcelo Hurtado",
        especialidad: "Ing. Telecomunicaciones",
        estado: "Aprobado"
    },
    {
        idAlumno : "7",
        nombreAlumno: "Leandro Saenz",
        especialidad: "Ing. Informática",
        estado: "Desaprobado"
    },
    {
        idAlumno : "8",
        nombreAlumno: "José Huertas",
        especialidad: "Ing. Informática",
        estado: "Aprobado"
    }
    */
]

const states = [
    {
        name: "Aprobado",
        value: "Aprobado"
    },
    {
        name: "Rechazado",
        value: "Rechazado"
    },
    {
        name: "Sin revisar",
        value: "Sin revisar"
    }
]

let textFilter = ""
let textSelect = "-1"




export default function ListAgreementsRequests () {
    //link: `/agreement-review/idStudent=${5}&idProcess=${user.fidProceso}`
    const {user} = useAuth();
    const [alumnos, setAlumnos] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    // const [textFilter, setTextFilter] = useState("");
    // const [textSelect, setTextSelect] = useState("-1");

    let idEspecialidad = 1

    console.log("El user tiene: ",user);
    useEffect(()=> {
        //acá llamar a la función corresponidente
        getListStudentsRequests(1).then(response => {
            if(response.success===true) {
                console.log("En el success el response es: ",response);
                setAlumnos(response.data);
                setFilteredData(response.data);
            }
        })
    }, [setAlumnos])

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
        
        <LayoutBasic>
            <div className="container principal">
                <div className="row rows studentRequests__title">
                    <h1>Solicitudes para realizar PSP sin convenio</h1>
                </div>
                <div className="row rows studentRequests__title">
                    Buscar por Nombre, Apellidos o Estado
                </div>
                <div className="row rows studentRequests__actions">
                    <FormControl
                        placeholder={"Filtrar alumnos"} 
                        onChange={filter}
                        name="filter"
                        style={{width: "80%"}}
                    />
                        
                    <Form.Select className="studentRequests__select form-select" style={{width: "20%"}} onChange={filter} name="select">
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
                    <TableAgreementsRequests rows={filteredData}/>
                </div>

            </div>
        </LayoutBasic>
    )
}

