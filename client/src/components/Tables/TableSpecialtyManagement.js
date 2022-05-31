import React from "react";
import { Button, Table } from 'react-bootstrap';

import './TableSpecialtyManagement.scss';


export default function TableSpecialtyManagement ({rows, setShow, setNewData, setMode}) {
    if(rows.length === 0) {
        return ( 
            <p>No se han registrado especialidades todavía.</p>
        )
    }
    const handleClick = data => {
        setNewData(data);
        setMode("update")
        setShow(true);
    }
    return (
        <Table striped bordered hover className="tableSpecialtyManagement">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Código</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
            {
                rows.map((row, index) => (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{row.nombreEsp}</td>
                        <td>{row.codigo}</td>
                        <td>{row.activo===1? "Activo": "Inactivo"}</td>
                        <td>
                            <Button variant="primary" onClick={() => handleClick(row)}>Editar</Button>
                        </td>
                    </tr>
                ))
            }
                
            </tbody>
        </Table>
    )
}