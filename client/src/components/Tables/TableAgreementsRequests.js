import React from "react";
import { Button, Table } from 'react-bootstrap';
import { useNavigate,Link } from "react-router-dom";
import ModalAgreementRequest from "../Modals/ModalAgreementRequest";
import './TableAgreementsRequests.scss';
import { useState } from "react";
import useAuth from "../../hooks/useAuth";


export default function TableAgreementsRequests ({rows, idProcess=1, phase="CONV"}) {
    const {user} = useAuth();
    const [show,setShow]=useState(false);
    const [showSm,setShowSm]=useState(false);
    

    if(rows.length === 0) {
        return (
            <p>No se han registrado entregas todavía.</p>
        )
    }

    console.log("Solis:",rows);

    return (
        <Table striped bordered hover className="TableAgreementsRequests">
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
                        <td>{row.nombreAlumno}</td>
                        <td>{row.estado}</td>
                        <td className="buttonRequest">
                            <Button className="btn btn-primary" style={{width:"30%",marginRight:"50px"}} onClick={()=>setShow(true)}>Visualizar</Button>
                            <ModalAgreementRequest show={show} setShow={setShow} user={user}showSm={showSm}setShowSm={setShowSm}student={row}></ModalAgreementRequest>
                        </td>
                    </tr>
                ))
            }
                
            </tbody>
        </Table>
    )
}