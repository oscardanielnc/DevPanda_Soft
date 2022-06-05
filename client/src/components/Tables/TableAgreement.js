import React from "react";
import { Button, Table } from 'react-bootstrap';
import { useNavigate,Link } from "react-router-dom";

import './TableAgreement.scss';



export default function TableAgreement ({rows}) {
    
    if(rows.length === 0) {
        return (
            <p>No se han registrado entregas todavía.</p>
        )
    }

    return (
        <Table striped bordered hover className="TableAgreement">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
            {
                rows.map((row, index) => (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{row.nombres}</td>
                        <td>{row.estadoMatriculado}</td>
                        <td className="buttonRequest">
                        
                        <Link to ={`/agreement-review/permissions=EF&idStudent=${row.idPersona}`} 
                            className= "btn btn-primary">Visualizar</Link>
                        </td>
                    </tr>
                ))
            }
                
            </tbody>
        </Table>
    )
}