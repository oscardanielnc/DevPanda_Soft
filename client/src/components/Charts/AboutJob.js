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
            
        </div>
    )
}