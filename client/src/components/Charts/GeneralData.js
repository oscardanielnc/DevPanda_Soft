import React, {useState}  from "react";
import { Button, Table,Form,InputGroup,FormControl } from 'react-bootstrap';

import './GeneralData.scss';


export default function GeneralData ({data, setData, imStudent=true}) {
    const {generalData} = data;
    console.log("El general data es: ",generalData);
    const handleChange = (e) => {
        setData({
            ...data,
            generalData: {
                ...data.generalData,
                [e.target.name]: e.target.value
            }
        })
    }
    const handleChangeOthers = (e) => {
        const newOthers = data.others.map(elem => {
            if(elem.nombreCampo === e.target.name)
                return {
                    idCampoProceso:elem.idCampoProceso,
                    idCampoLlenado:elem.idCampoLlenado,
                    nombreCampo: e.target.name,
                    seccion: "Datos Generales",
                    flag: elem.flag,
                    valorAlumno: e.target.value   
                }
            return elem;
        })
        setData({
            ...data,
            others: newOthers
        })
    }

    return (
        generalData &&
            <div className="container chartGeneralData">
             <nav className="navbar navbar-fixed-top navbar-inverse bg-inverse "style={{ backgroundColor: "#E7E7E7"}}>
                <h3 style={{"marginLeft":"15px"}}>Datos Generales</h3>
             </nav>
            <div className="row rows">
                <div className="col-sm-6 subtitles">
                    <div>Nombres</div>
                    <Form.Control placeholder="Escriba su nombre" 
                        value={generalData.name}
                        disabled
                        name="names"/>
                </div>
                <div className="col-sm-6 subtitles">
                    <div>Apellidos</div>
                    <Form.Control placeholder="Escriba sus apellidos" 
                        value={generalData.lastname}
                        disabled
                        name="lastNames"/>
                </div>
            </div>
            <div className="row rows" >
                <div className="col-sm-4 subtitles">
                    <div>Codigo PUCP</div>
                    <Form.Control placeholder="Codigo PUCP" 
                        value={generalData.code}
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
                        value={generalData.email}
                        disabled
                        name="emailPUCP"
                        />
                    </InputGroup>

                </div>
            </div>
            <div className="row rows">
                <div className="col-sm-4 subtitles">
                    <div>Teléfono</div>
                    <Form.Control placeholder="Ingrese su número de celular" 
                        onChange={handleChange}
                        value={generalData.celephone}
                        disabled = {!imStudent}
                        name="celephone"/>
                </div>
                <div className="col-sm-8 subtitles">
                    <div>Correo Personal (Opcional)</div>
                    <Form.Control placeholder="Ingrese su correo opcional" 
                        onChange={handleChange}
                        value={generalData.personalEmail}
                        disabled = {!imStudent}
                        name="personalEmail"/>
                </div>
            </div>
            {
                data.others && data.others.map((e,index) => {
                    if(e.seccion === "Datos Generales"){
                        var one = 'Ingrese el ';
                        var two = e.nombreCampo;
                        var texto = one + two;
                        return (
                            <div key={index}>
                                <div className="rowsOthers">{texto}</div>
                                <div className="row rows" style={{"paddingTop":"10px !important"}}>
                                    <Form.Control placeholder={texto}
                                    onChange={handleChangeOthers}
                                    value={e.valorAlumno}
                                    disabled = {!imStudent}
                                    name={e.nombreCampo}/>
                                </div>
                            </div>
                        )
                    }
                })
            }
        </div>
    )
}