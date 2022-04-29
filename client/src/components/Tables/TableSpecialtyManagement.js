import React from "react";
import { Button, Table } from 'react-bootstrap';

import './TableSpecialtyManagement.scss';


export default function TableSpecialtyManagement ({rows}) {
    if(!rows) {
        return (
            <div className="row rows">
                <p>No se han registrado especialidades todavía.</p>
            </div>
        )
    }
    return (
        <Table striped bordered hover className="tableSpecialtyManagement">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
            {
                rows.map((row, index) => (
                    <tr key={row.idEspecialidad}>
                        <td>{index+1}</td>
                        <td>{row.nombreEsp}</td>
                        <td>
                            <Button variant="primary">Editar</Button>
                            <Button variant="danger">Eliminar</Button>
                        </td>
                    </tr>
                ))
            }
                
            </tbody>
        </Table>
    )
}