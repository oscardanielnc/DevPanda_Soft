import React, {useState}  from "react";
import { Button, Table,Form,InputGroup,FormControl } from 'react-bootstrap';

import './GeneralData.scss';


export default function GeneralData (props) {
    const {generalData,setGeneralData} = props;
    const changeNames = e => {
        setGeneralData({
            ...generalData,
            [e.target.name]: e.target.value
        })
    }

    const changeLastNames = e => {
        setGeneralData({
            ...generalData,
            [e.target.name]: e.target.value
        })
    }

    const changeCodesPUCP = e => {
        setGeneralData({
            ...generalData,
            [e.target.name]: e.target.value
        })
    }

    const changeEmailPUCP = e => {
        setGeneralData({
            ...generalData,
            [e.target.name]: e.target.value
        })
    }

    const changeCelephone = e => {
        setGeneralData({
            ...generalData,
            [e.target.name]: e.target.value
        })
    }

    const changeEmailAlternative = e => {
        setGeneralData({
            ...generalData,
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
                        onChange={changeNames}
                        value={generalData.names}
                        disabled
                        name="names"/>
                </div>
                <div className="col-sm-6 subtitles">
                    <div>Apellidos</div>
                    <Form.Control placeholder="Escriba sus apellidos" 
                        onChange={changeLastNames}
                        value={generalData.lastNames}
                        disabled
                        name="lastNames"/>
                </div>
            </div>
            <div className="row rows" >
                <div className="col-sm-4 subtitles">
                    <div>Codigo PUCP</div>
                    <Form.Control placeholder="Codigo PUCP" 
                        onChange={changeCodesPUCP}
                        value={generalData.codePUCP}
                        disabled
                        name="codePUCP"/>
                </div>
                <div className="col-sm-8 subtitles">
                    <div>Correo PUCP</div>
                    <InputGroup className="mb-3">
                        <FormControl
                        placeholder="Ingrese su correo educativo"
                        aria-label="example"
                        aria-describedby="basic-asddon2"
                        onChange={changeEmailPUCP}
                        value={generalData.emailPUCP}
                        disabled
                        name="emailPUCP"
                        />
                        <InputGroup.Text id="basic-addon2">@pucp.edu.pe</InputGroup.Text>
                    </InputGroup>

                </div>
            </div>
            <div className="row rows">
                <div className="col-sm-4 subtitles">
                    <div>Teléfono</div>
                    <Form.Control placeholder="Ingrese su número de celular" 
                        onChange={changeCelephone}
                        value={generalData.celephone}
                        disabled
                        name="celephone"/>
                </div>
                <div className="col-sm-8 subtitles">
                    <div>Correo Personal (Opcional)</div>
                    <Form.Control placeholder="Ingrese su correo opcional" 
                        onChange={changeEmailAlternative}
                        value={generalData.emailAlternative}
                        disabled
                        name="emailAlternative"/>
                </div>
            </div>
        </div>
    )
}