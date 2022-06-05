import React from "react";
import { Button, Table } from 'react-bootstrap';

import './TableInscriptionFields.scss';



export default function TableInscriptionFields ({rows, setShow, setNewDataStudent, matr}) {
    if(rows.length === 0) {
        return (
            <p>Ningun Alumno coincide con la busqueda o no existen alumnos registrados todavía.</p>
        )
    }
    const handleClick = student => {
        setNewDataStudent(student);
        setShow(true);
    }
    //onClick={() => handleClick(row)}
    return (
        <Table striped bordered hover className="">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Campo</th>
                    <th>Seccion</th>
                </tr>
            </thead>
            <tbody>
            {
                rows.map((row, index) => {
                    return (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{row.nameField}</td>
                        <td>{row.seccion}</td>
                    </tr>
                )})
            }
                
            </tbody>
        </Table>
    )
}