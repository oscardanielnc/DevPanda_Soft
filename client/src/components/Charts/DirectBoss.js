import React, {useState}  from "react";
import { Button, Table,Form,InputGroup,FormControl } from 'react-bootstrap';

import './DirectBoss.scss';


export default function DirectBoss ({data, setData, notgrabado}) {
    const {aboutBoss} = data;

    const handleChange = (e) => {
        setData({
            ...data,
            aboutBoss: {
                ...data.aboutBoss,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleChangeOthers = (e) => {
        const newOthers = data.others.map(elem => {
            if(elem.name === e.target.name) 
                return {
                    section: "Sobre el jefe",
                    value: e.target.value,
                    name: e.target.name
                }
            return elem;
        })
        setData({
            ...data,
            others: newOthers
        })
    }

    return (
        <div className="container chartaboutBoss">
             <nav className="navbar navbar-fixed-top navbar-inverse bg-inverse "style={{ backgroundColor: "#E7E7E7"}}>
                <h3 style={{"marginLeft":"15px"}}>Sobre el Jefe Directo</h3>
             </nav>
            <div className="row rows">
                <div className="col-sm-6 subtitles">
                    <div>Nombre del Responsable/Tutor</div>
                    <Form.Control placeholder="Escriba el nombre del responable/tutor" 
                        onChange={handleChange}
                        disabled={notgrabado}
                        value={aboutBoss.name}
                        name="name"/>
                </div>
                <div className="col-sm-6 subtitles">
                    <div>Área o Departamento</div>
                    <Form.Control placeholder="Escriba el área o departamento del responble/tutor" 
                        onChange={handleChange}
                        value={aboutBoss.area}
                        disabled={notgrabado}
                        name="area"/>
                </div>
            </div>
            <div className="row rows" >
                <div className="col-sm-6 subtitles">
                    <div>Correo</div>
                    <Form.Control placeholder="Ingrese el correo de su jefe directo" 
                        onChange={handleChange}
                        value={aboutBoss.email}
                        disabled={notgrabado}
                        name="email"/>
                </div>
                <div className="col-sm-6 subtitles">
                    <div>Teléfono</div>
                    <Form.Control placeholder="Ingrese el número de celular" 
                        onChange={handleChange}
                        value={aboutBoss.telephone}
                        disabled={notgrabado}
                        name="telephone"/>
                </div>
            </div>
            {
                data.others.map((e,index) => {
                    if(e.section === "Sobre el jefe"){
                        var one = 'Ingrese el ';
                        var two = e.name;
                        var texto = one + two;
                        return (
                            <div>
                                <div className="rowsOthers">{texto}</div>
                                <div className="row rows" style={{"paddingTop":"10px !important"}}>
                                    <Form.Control placeholder={texto}
                                    onChange={handleChangeOthers}
                                    value={e.value}
                                    disabled = {notgrabado}
                                    name={e.name}/>
                                </div>
                            </div>
                        )
                    }
                })
            }
        </div>
    )
}