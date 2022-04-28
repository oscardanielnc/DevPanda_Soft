import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { specialtySelectAllApi } from "../api/specialty";
import LayoutBasic from "../layouts/LayoutBasic";
import './GestionEspecialidad.scss';


export default function GestionEspecialidad () {
    const [especialidades, setEspecialidades] = useState([]);

    useEffect(() => {
        specialtySelectAllApi().then(response => {
            console.log(response);
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
                    <div className="col-sm-8 modified" style={{textAlign: "center"}}>Nombre Especialidad</div>                    
                    <div className="col-sm-4 modified" style={{textAlign: "left"}}>Acciones</div>
                </div>
                <Especialidades especialidades={especialidades}/>
            </div>
        </LayoutBasic>
    )
}

function Especialidades ({especialidades}) {
    if(especialidades) return (
        <div className="row rows">
        {
            especialidades.map(element=>(
                <div className="row" key={element.idEspecialidad}>
                <div className="col-sm-8 modified" >{element.nombreEsp}</div>                    
                <div className="col-sm-2 modified"><button type="button" className="btn btn-primary">Editar</button></div>
                <div className="col-sm-2 modified" ><button type="button" className="btn btn-danger">Eliminar</button></div>
                </div>
            ))
        }
        </div>
    )
    return (
        <div className="row rows">
            <p>No se han registrado especialidades todavía.</p>
        </div>
    )
}