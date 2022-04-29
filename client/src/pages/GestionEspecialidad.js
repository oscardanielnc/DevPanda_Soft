import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { specialtySelectAllApi } from "../api/specialty";
import TableSpecialtyManagement from "../components/Tables/TableSpecialtyManagement";
import LayoutBasic from "../layouts/LayoutBasic";
import './GestionEspecialidad.scss';


export default function GestionEspecialidad () {
    const [especialidades, setEspecialidades] = useState([]);

    useEffect(() => {
        specialtySelectAllApi().then(response => {
            setEspecialidades(response);
        })
    }, [setEspecialidades])


    return (
        <LayoutBasic>
            <div className="container principal">
                <div className="row rows" style={{textAlign: "center"}}>
                    <h1>Gestión de especialidades</h1>
                </div>
                <div className="row rows" style={{marginRight: "0px",marginLeft:"auto", }}>
                    <Link className="btn btn-primary" style={{"width":"100px"}} to="./agregarEspecialidad">Agregar</Link>
                </div>
                <div className="row rows">
                    <TableSpecialtyManagement rows={especialidades}/>
                </div>
            </div>
        </LayoutBasic>
    )
}