import React, {useState}  from "react";
import { Button, Table,Form,InputGroup,FormControl } from 'react-bootstrap';

import './DirectBoss.scss';


export default function DirectBoss ({data}) {
    const [inputs, setInputs] = useState({
        nombresAlumno: "",
        apellidosAlumno: "",
        codigoPUCP:"",
        correoPUCP:"",
        flagConvenio: false
    })
    const inputValidation = e => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div className="container chartDirectBoss">
             <nav className="navbar navbar-fixed-top navbar-inverse bg-inverse "style={{ backgroundColor: "#E7E7E7"}}>
                <h3 style={{"marginLeft":"15px"}}>Sobre el Jefe Directo</h3>
             </nav>
            <div className="row rows">
                <div className="col-sm-6 subtitles">
                    <div>Nombre del Responsable/Tutor</div>
                    <Form.Control placeholder="Escriba el nombre del responable/tutor" 
                        onChange={inputValidation}
                        value={inputs.nombresAlumno}
                        name="nombresAlumno"/>
                </div>
                <div className="col-sm-6 subtitles">
                    <div>Área o Departamento</div>
                    <Form.Control placeholder="Escriba el área o departamento del responble/tutor" 
                        onChange={inputValidation}
                        value={inputs.apellidosAlumno}
                        name="apellidosAlumno"/>
                </div>
            </div>
            <div className="row rows" >
                <div className="col-sm-6 subtitles">
                    <div>Correo</div>
                    <Form.Control placeholder="Ingrese el correo de su jefe directo" 
                        onChange={inputValidation}
                        value={inputs.nombresAlumno}
                        name="nombresAlumno"/>
                </div>
                <div className="col-sm-6 subtitles">
                    <div>Teléfono</div>
                    <Form.Control placeholder="Ingrese el número de celular" 
                        onChange={inputValidation}
                        value={inputs.apellidosAlumno}
                        name="apellidosAlumno"/>
                </div>
            </div>
            
        </div>
    )
}