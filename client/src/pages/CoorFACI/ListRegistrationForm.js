import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { specialtySelectAllApi } from "../../api/specialty";
import TableRegistrationForm from "../../components/Tables/TableRegistrationForm";
import LayoutAdministrative from "../../layouts/LayoutAdministrative";
import './scss/ListRegistrationForm.scss';
import useAuth from "../../hooks/useAuth";
import FilterData from "../../components/Filters/FilterData";
import {Form, FormControl} from 'react-bootstrap';
import useWindowDimensions from "../../hooks/useWindowResize";
import {getListStudentsInscriptionForm} from  "../../api/registrationForm";


const dataDummy = [
    /*
    {
        idAlumno : "1",
        nombreAlumno: "Carlos Lescano",
        estado: "Aprobado"
    },
    {
        idAlumno : "2",
        nombreAlumno: "Gianfranco Montoya",
        estado: "Aprobado"
    },
    {
        idAlumno : "3",
        nombreAlumno: "Oscar Navarro",
        estado: "Sin Calificar"
    },
    {
        idAlumno : "4",
        nombreAlumno: "Christian Ramirez",
        estado: "Sin Calificar"
    },
    {
        idAlumno : "5",
        nombreAlumno: "Jeison Romero",
        estado: "Aprobado"
    },
    {
        idAlumno : "6",
        nombreAlumno: "Marcelo Hurtado",
        estado: "Aprobado"
    },
    {
        idAlumno : "7",
        nombreAlumno: "Leandro Saenz",
        estado: "Desaprobado"
    },
    {
        idAlumno : "8",
        nombreAlumno: "José Huertas",
        estado: "Aprobado"
    },
    {
        idAlumno : "9",
        nombreAlumno: "Diego Rodriguez",
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
        name: "Observado",
        value: "Observado"
    },
    {
        name: "Sin calificar",
        value: "Sin calificar"
    },
    {
        name: "Sin entregar",
        value: "Sin entregar"
    }
]

let textFilter = ""
let textSelect = "-1"




export default function ListRegistrationForm () {
    
    const [alumnos, setAlumnos] = useState([]);
    const [filteredData, setFilteredData] = useState(dataDummy);
    // const [textFilter, setTextFilter] = useState("");
    // const [textSelect, setTextSelect] = useState("-1");

    let idEspecialidad = 1
    //console.log(useAuth()); // el useAuth() nos permite acceder a la informacion del usuario desde cualquier lugar. Por ahora ese objeto esta hardcodeado.


    useEffect(()=> {
        getListStudentsInscriptionForm(1).then(response => {
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
        
        <LayoutAdministrative>
            <div className="container principal">
                <div className="row rows studentManagement__title">
                    <h1>Ficha de Inscripción - Listado de entregas</h1>
                </div>
                <div className="row rows studentManagement__actions">
                    <FormControl
                        placeholder={"Filtrar alumnos"}
                        onChange={filter}
                        name="filter"
                        style={{width: "80%"}}
                    />
                        
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
                    <TableRegistrationForm rows={filteredData}/>
                </div>

            </div>
        </LayoutAdministrative>
    )
}

