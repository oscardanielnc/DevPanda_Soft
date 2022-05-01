import React, {useState}  from "react";
import { Button, Table,Form,InputGroup,FormControl } from 'react-bootstrap';

import './GeneralData.scss';


export default function GeneralData ({data}) {
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
        <div className="container chartGeneralData">
             <nav className="navbar navbar-fixed-top navbar-inverse bg-inverse "style={{ backgroundColor: "#E7E7E7"}}>
                <h3 style={{"marginLeft":"15px"}}>Datos Generales</h3>
             </nav>
            <div className="row rows">
                <div className="col-sm-6 subtitles">
                    <div>Nombres</div>
                    <Form.Control placeholder="Escriba su nombre" 
                        onChange={inputValidation}
                        value={inputs.nombresAlumno}
                        name="nombresAlumno"/>
                </div>
                <div className="col-sm-6 subtitles">
                    <div>Apellidos</div>
                    <Form.Control placeholder="Escriba sus apellidos" 
                        onChange={inputValidation}
                        value={inputs.apellidosAlumno}
                        name="apellidosAlumno"/>
                </div>
            </div>
            <div className="row rows" >
                <div className="col-sm-4 subtitles">
                    <div>Codigo PUCP</div>
                    <Form.Control placeholder="Codigo PUCP" 
                        onChange={inputValidation}
                        value={inputs.codigoPUCP}
                        name="codigoPUCP"/>
                </div>
                <div className="col-sm-8 subtitles">
                    <div>Correo PUCP</div>
                    <InputGroup className="mb-3">
                        <FormControl
                        placeholder="example"
                        aria-label="example"
                        aria-describedby="basic-addon2"
                        />
                        <InputGroup.Text id="basic-addon2">@pucp.edu.pe</InputGroup.Text>
                    </InputGroup>

                </div>
            </div>
            <div className="row rows">
                <div className="col-sm-4 subtitles">
                    <div>Teléfono</div>
                    <Form.Control placeholder="Ingrese su número de celular" 
                        onChange={inputValidation}
                        value={inputs.nombresAlumno}
                        name="nombresAlumno"/>
                </div>
                <div className="col-sm-8 subtitles">
                    <div>Correo Personal (Opcional)</div>
                    <Form.Control placeholder="Ingrese su correo opcional" 
                        onChange={inputValidation}
                        value={inputs.apellidosAlumno}
                        name="apellidosAlumno"/>
                </div>
            </div>
        </div>
    )
}