import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import LayoutBasic from "../../layouts/LayoutBasic";
import {Form, FormControl} from 'react-bootstrap';
import TableDeliverables from "../../components/Tables/TableDeliverables";
import './scss/DeliverablesStudent.scss';

const data=[
    {
        idDeliverable: "1",
        nameDeliverable: "Certificado Taller",
        estado: "Sin entregar"
    },
    {
        idDeliverable: "2",
        nameDeliverable: "Certificado Taller II",
        estado: "Pendiente de aprobación"
    }
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

export default function DeliverablesStudent(){
    const {user} = useAuth();

    const [filteredData, setFilteredData] = useState(data);

    return(
        <LayoutBasic>
            <div className="container principal">
                <div className="row rows studentRequests__title">
                    <h1>Lista de Entregables</h1>
                </div>
                {/* <Link to={`/deliverable/idStudent=${user.idPersona}&idProcess=${user.fidProceso}&code=DEL1`}>Ir a Certificado Taller</Link> */}
                {/* <div className="row rows Deliverables__actions">
                    {/* <FormControl
                        placeholder={"Filtrar entregables"} 
                        onChange={filter}
                        name="filter"
                        style={{width: "80%"}}
                    /> }
                        
                    <Form.Select className="Deliverables__select form-select" style={{width: "20%"}} onChange={filter} name="select">
                        <option value="-1">Estado</option>
                        {
                            states.map((element, index) => (
                                <option value={element.value} 
                                    key={index}>{element.name}
                                </option>
                            ))
                        }
                    </Form.Select>
                </div> */}
                <div className="row rows">
                    <TableDeliverables rows={filteredData}/>
                </div>
            </div>
            
        </LayoutBasic>
    )
}