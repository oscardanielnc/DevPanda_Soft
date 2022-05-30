import React from "react";
import { Button, Table } from 'react-bootstrap';
import './TableRegistrationForm.scss';

export default function TableCoordSups ({rows, setShow, setNewData, setMode, showTo}) {
    if(rows.length === 0) {
        return (
            <p>{`Ningun coordinador coincide con la búsqueda o no existen ${showTo} registrados todavía.`}</p>
        )
    }
    const handleClick = coord => {
        setNewData(coord);
        setMode("update")
        setShow(true);
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th> 
                    {
                        showTo==="coordinadores" && <th>Especialidad</th>
                    }
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
            {
                rows.map((row, index) => {
                    const nombreCoord = `${row.nombres.split(" ")[0]} ${row.apellidos.split(" ")[0]}`;
                    const active = (row.activo===0)? "Innactivo": "Activo";
                    return (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{nombreCoord}</td>
                        <td>{active}</td> 
                        {
                            showTo==="coordinadores" && <td>{row.nombreEsp}</td>
                        }
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