import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import LayoutBasic from "../../layouts/LayoutBasic";
import {Form, FormControl} from 'react-bootstrap';
import TableDeliverablesCoordinator from "../../components/Tables/TableDeliverablesCoordinator";
import './scss/DeliverablesCoordinator.scss';
import { getDeliverableByStudentSpecialty } from "../../api/deliverables";

// const data=[
//     {
//         idDeliverable: "1",
//         nameDeliverable: "Certificado Taller",
//         estado: "Sin entregar"
//     },
//     {
//         idDeliverable: "2",
//         nameDeliverable: "Certificado Taller II",
//         estado: "Pendiente de aprobación"
//     }
// ]

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
        name: "Pendiente de aprobación",
        value: "Pendiente de aprobación"
    },
    {
        name: "No entregado",
        value: "No entregado"
    }
]

let textFilter = ""
let textSelect = "-1"

export default function DeliverablesCoordinator(){
    const {user} = useAuth();
    const [entregables, setEntregables] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    //const [filteredData, setFilteredData] = useState(data);

    useEffect(()=> {
        //acá llamar a la función corresponidente
        getDeliverableByStudentSpecialty(user.fidEspecialidad,user.idPersona).then(response => {
            console.log(response)
            if(response.success===true) {
                console.log("En el success el response es: ",response);
                setEntregables(response.data.data);
                setFilteredData(response.data);
            }
        })
    }, [setEntregables])

    const filter = e => {
        const text = e.target.value.toUpperCase();
        
        if(e.target.name === "select") textSelect = text
        else textFilter = text
        
        setFilteredData(entregables.filter(obj => {
            //console.log('textFilter', textFilter)
            //console.log('textSelect', textSelect)
            if(textSelect === "-1") {
                return  obj.nombreAlumno.toUpperCase().includes(textFilter)
            }
            return obj.estado.toUpperCase() === textSelect && obj.nombreAlumno.toUpperCase().includes(textFilter)
       }))

    }

    return(
        <LayoutBasic>
            <div className="container principal">
                <div className="row rows studentRequests__title">
                    <h1>Lista de Entregables</h1>
                </div>
                <div className="row rows studentRequests__title">
                    Buscar por Nombre del entregable
                </div>
                <div className="row rows studentManagement__actions">
                    <FormControl
                        placeholder={"Filtrar entregables"}
                        onChange={filter}
                        name="filter"
                        style={{width: "80%"}}
                    />
                </div>
                <div className="row rows">
                    <TableDeliverablesCoordinator rows={entregables}/>
                </div>
            </div>
            
        </LayoutBasic>
    )
}