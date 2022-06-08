import React from "react";
import {Table} from 'react-bootstrap';
import {Link} from "react-router-dom";
import "./TableFinalReport.scss"

export default function TableFinalReport ({rows}) {    
    if(rows.length === 0) {
        return (
            <p>No se han registrado entregas.</p>
        )
    }

    return (
        <Table striped bordered hover className="TableFinalReport">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Estado de revisión</th>
                </tr>
            </thead>
            <tbody>
            {
                rows.map((row, index) => (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{row.nombreAlumno}</td>
                        <td>{row.estado}</td>
                        <td className="buttonRequest">
                        
                        <Link to ={`/final-report-review/permissions=S&idStudent=${row.idAlumno}`} 
                            className= "btn btn-primary">Visualizar</Link>
                        </td>
                    </tr>
                ))
            }
                
            </tbody>
        </Table>
    )
}