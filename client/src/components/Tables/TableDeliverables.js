import React from "react";
import { Button, Table } from 'react-bootstrap';
import { useNavigate,Link } from "react-router-dom";

import './TableRegistrationForm.scss';

export default function TableDeliverables ({rows, idProcess=1, phase="ENTS"}) {
    if(rows.length === 0) {
        return (
            <p>No se han registrado entregas todavía.</p>
        )
    }
    

    return (
        <Table striped bordered hover className="TableRegistrationForm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Estado</th>
                    <th>Visualización</th>
                </tr>
            </thead>
            <tbody>
            {
                rows.map((row, index) => (
                    //console.log("ID alumno:",row.idAlumno),
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{row.nameDeliverable}</td>
                        <td>{row.estado}</td>
                        <td>
                        <Link to ={`/deliverables/idStudent=${row.idStudent}&idProcess=${row.idProcess}&code=${row.code}`} 
                            className= "btn btn-primary">Visualizar</Link>
                        </td>
                    </tr>
                ))
            }
                
            </tbody>
        </Table>
    )
}