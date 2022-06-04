import React from "react";
import { Button, Table } from 'react-bootstrap';

import './TableRegistrationForm.scss';



export default function TableEnrollment ({rows, setShow, setNewDataStudent, matr}) {
    if(rows.length === 0) {
        return (
            <p>Ningun Alumno coincide con la busqueda o no existen alumnos registrados todavía.</p>
        )
    }
    const handleClick = student => {
        setNewDataStudent(student);
        setShow(true);
    }

    return (
        <Table striped bordered hover className="">
            <thead>
                <tr>
                    <th>#</th>
                    {matr && <th>Estado</th>}
                    <th>Nombre</th>
                    <th>Grupo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
            {
                rows.map((row, index) => {
                    const nombreAlumno = `${row.nombres.split(" ")[0]} ${row.apellidos.split(" ")[0]}`;
                    return (
                    <tr key={index}>
                        <td>{index+1}</td>
                        {
                            matr && 
                            <td>{(row.estadoMatriculado)===1? "Matriculado": "No matriculado"}</td>
                        }
                        <td>{nombreAlumno}</td>
                        <td>{(row.grupoAsignado)? `Grupo ${row.grupoAsignado}`: "Sin grupo"}</td>
                        <td>
                            <Button variant="primary" onClick={() => handleClick(row)}>Editar</Button>
                        </td>
                    </tr>
                )})
            }
                
            </tbody>
        </Table>
    )
}