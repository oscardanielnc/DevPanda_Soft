import React from "react";
import { Button, Table } from 'react-bootstrap';

import './TableRegistrationForm.scss';


export default function TableRegistrationForm ({rows}) {
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
                            <Button variant="primary">Visualizar</Button>
                        </td>
                    </tr>
                ))
            }
                
            </tbody>
        </Table>
    )
}