import React, {useState}  from "react";
import { Button, Table,Form,InputGroup,FormControl } from 'react-bootstrap';

import './DirectBoss.scss';


export default function DirectBoss (props) {
    const {directBoss,setDirectBoss} = props;
    let notgrabado=(directBoss.name==null||directBoss.name)?true:false;
    const changeName = e => {
        setDirectBoss({
            ...directBoss,
            [e.target.name]: e.target.value
        })
    }

    const changeArea = e => {
        setDirectBoss({
            ...directBoss,
            [e.target.name]: e.target.value
        })
    }

    const changeEmail = e => {
        setDirectBoss({
            ...directBoss,
            [e.target.name]: e.target.value
        })
    }

    const changeCelephone = e => {
        setDirectBoss({
            ...directBoss,
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
                        onChange={changeName}
                        disabled={notgrabado}
                        value={directBoss.name}
                        name="name"/>
                </div>
                <div className="col-sm-6 subtitles">
                    <div>Área o Departamento</div>
                    <Form.Control placeholder="Escriba el área o departamento del responble/tutor" 
                        onChange={changeArea}
                        value={directBoss.area}
                        disabled={notgrabado}
                        name="area"/>
                </div>
            </div>
            <div className="row rows" >
                <div className="col-sm-6 subtitles">
                    <div>Correo</div>
                    <Form.Control placeholder="Ingrese el correo de su jefe directo" 
                        onChange={changeEmail}
                        value={directBoss.email}
                        disabled={notgrabado}
                        name="email"/>
                </div>
                <div className="col-sm-6 subtitles">
                    <div>Teléfono</div>
                    <Form.Control placeholder="Ingrese el número de celular" 
                        onChange={changeCelephone}
                        value={directBoss.celephone}
                        disabled={notgrabado}
                        name="celephone"/>
                </div>
            </div>
            
        </div>
    )
}