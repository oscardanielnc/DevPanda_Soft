import React from "react";
import { Button, Table } from 'react-bootstrap';
import { useNavigate,Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import './TableRegistrationForm.scss';

export default function TableDeliverables ({rows, idProcess=1, phase="ENTS"}) {
    const {user} = useAuth();
    if(rows.length === 0) {
        return (
            <p>No se han registrado entregas todavía.</p>
        )
    }
    console.log("rows:",rows);
    const getState = e => {
        let state;
        if(e === "S"){
            state="Archivo no enviado";
        }   
        if(e === "A"){
            state="Aprobado";
        }
        if(e === "O"){
            state="Observado";
        }    
        if(e === "P"){
            state = "Pendiente de aprobación";
        } 
        return state;
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
                    //console.log("ID alumno:",row.idAlumno),
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{row.nameDeiverable}</td>
                        <td>{getState(row.estado)}</td>
                        <td>
                        <Link to ={`/deliverable/code=${row.idDeliverable}`} 
                            className= "btn btn-primary">Visualizar</Link>
                        </td>
                    </tr>
                ))
            }
                
            </tbody>
        </Table>
    )
}