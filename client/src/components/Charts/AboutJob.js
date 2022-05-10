import React, {useState}  from "react";
import { Button, Table,Form,InputGroup,FormControl } from 'react-bootstrap';

import './AboutJob.scss';


export default function AboutJob ({data, setData, notgrabado}) {
    const {aboutJob} = data;

    const handleChange = (e) => {
        setData({
            ...data,
            aboutJob: {
                ...data.aboutJob,
                [e.target.name]: e.target.value
            }
        })
        console.log(data)
    }

    const handleChangeOthers = (e) => {
        const newOthers = data.others.map(elem => {
            if(elem.nombreCampo === e.target.name)
                return {
                    idCampoProceso:elem.idCampoProceso,
                    idCampoLlenado:elem.idCampoLlenado,
                    nombreCampo: e.target.name,
                    seccion: "Sobre el puesto",
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
        <div className="container chartAboutJob">
             <nav className="navbar navbar-fixed-top navbar-inverse bg-inverse "style={{ backgroundColor: "#E7E7E7"}}>
                <h3 style={{"marginLeft":"15px"}}>Sobre el puesto</h3>
             </nav>
            <div className="row rows">
                <div className="col-sm-6 subtitles">
                    <div>Nombre del Área</div>
                    <Form.Control placeholder="Escriba el nombre del área" 
                        onChange={handleChange}
                        disabled={notgrabado}
                        value={aboutJob.areaName}
                        name="areaName"/>
                </div>
                <div className="col-sm-6 subtitles">
                    <div>Puesto</div>
                    <Form.Control placeholder="Escriba el puesto a desempeñar" 
                        onChange={handleChange}
                        disabled={notgrabado}
                        value={aboutJob.jobTitle}
                        name="jobTitle"/>
                </div>
            </div>
            <div className="row rows" >
                <div>Funciones Actividades</div>
                
                <Form.Control className="Cuadro" style={{"marginLeft": "0px"}}
                    placeholder="Describa la funcion principal de su puesto y las actividades principales a desarrollar." 
                    onChange={handleChange}
                    disabled={notgrabado}
                    value={aboutJob.activities}
                    name="activities"
                    as="textarea"
                    rows={6}
                    />
            </div>
            {
                data.others && data.others.map((e,index) => {
                    if(e.seccion === "Sobre el puesto"){
                        var one = 'Ingrese el ';
                        var two = e.nombreCampo;
                        var texto = one + two;
                        return (
                            <div>
                                <div className="rowsOthers">{texto}</div>
                                <div className="row rows" style={{"paddingTop":"10px !important"}}>
                                    <Form.Control placeholder={texto}
                                    onChange={handleChangeOthers}
                                    value={e.valorAlumno}
                                    disabled = {notgrabado}
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