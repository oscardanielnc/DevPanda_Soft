import React, {useState}  from "react";
import { Button, Table,Form,InputGroup,FormControl } from 'react-bootstrap';

import './AboutJob.scss';


export default function AboutJob ({data}) {
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
        <div className="container chartAboutJob">
             <nav className="navbar navbar-fixed-top navbar-inverse bg-inverse "style={{ backgroundColor: "#E7E7E7"}}>
                <h3 style={{"marginLeft":"15px"}}>Sobre el puesto</h3>
             </nav>
            <div className="row rows">
                <div className="col-sm-6 subtitles">
                    <div>Nombre del Área</div>
                    <Form.Control placeholder="Escriba el nombre del área" 
                        onChange={inputValidation}
                        value={inputs.nombresAlumno}
                        name="nombresAlumno"/>
                </div>
                <div className="col-sm-6 subtitles">
                    <div>Puesto</div>
                    <Form.Control placeholder="Escriba el puesto a desempeñar" 
                        onChange={inputValidation}
                        value={inputs.apellidosAlumno}
                        name="apellidosAlumno"/>
                </div>
            </div>
            <div className="row rows" >
                <div>Funciones Actividades</div>
                
                <Form.Control className="Cuadro" style={{"marginLeft": "0px"}}
                    placeholder="Describa la funcion principal de su puesto y las actividades principales a desarrollar." 
                    onChange={inputValidation}
                    value={inputs.codigoPUCP}
                    name="codigoPUCP"
                    as="textarea"
                    rows={6}
                    />
            </div>
            
        </div>
    )
}