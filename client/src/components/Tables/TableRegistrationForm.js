import React from "react";
import { Button, Table } from 'react-bootstrap';
import { useNavigate,Link } from "react-router-dom";

import './TableRegistrationForm.scss';



export default function TableRegistrationForm ({rows, idProcess=1, phase="FINS"}) {
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
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{row.nombreAlumno}</td>
                        <td>{row.estado}</td>
                        <td>
                        <Link to ={`/registration-review/permissions=E&idStudent=${row.idAlumno}`} 
                            className= "btn btn-primary">Visualizar</Link>
                        </td>
                    </tr>
                ))
            }
                
            </tbody>
        </Table>
    )
}