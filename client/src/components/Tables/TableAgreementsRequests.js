import React from "react";
import { Button, Table } from 'react-bootstrap';
import { useNavigate,Link } from "react-router-dom";

import './TableAgreementsRequests.scss';



export default function TableAgreementsRequests ({rows}) {
    if(rows.length === 0) {
        return (
            <p>No se han registrado entregas todavía.</p>
        )
    }


    return (
        <Table striped bordered hover className="TableAgreementsRequests">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Especialidad</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
            {
                rows.map((row, index) => (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{row.nombreAlumno}</td>
                        <td>{row.especialidad}</td>
                        <td>{row.estado}</td>
                        <td>
                        <Link to ={"/student-registration-review/" + row.idAlumno} className= "btn btn-primary">Visualizar</Link>
                        </td>
                    </tr>
                ))
            }
                
            </tbody>
        </Table>
    )
}