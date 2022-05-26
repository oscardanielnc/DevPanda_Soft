import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import LayoutBasic from "../../layouts/LayoutBasic";

export default function DeliverablesStudent(){
    const {user} = useAuth();
    return(
        <LayoutBasic>
            <div className="container">
                <h1>Lista de entregables</h1>
                <Link to={`/deliverable/idStudent=${user.idPersona}&idProcess=${user.fidProceso}&code=DEL1`}>Ir a Certificado Taller</Link>
            </div>
        </LayoutBasic>
    )
}