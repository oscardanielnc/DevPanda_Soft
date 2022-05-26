import React, {useState}  from "react";
import { Button, Table,Form,InputGroup,FormControl } from 'react-bootstrap';
import {emailValidation,numberValidation,maxLengthValidation} from "../../utils/formValidation";
import './DirectBoss.scss';


export default function DirectBoss ({data, setData, notgrabado}) {
    const {aboutBoss} = data;

    const handleChange = (e) => {
        if(e.target.name==="cellphone"){
            if(numberValidation(e.target)&& maxLengthValidation(e.target,9)){
                e.target.classList.add("success");
                setData({
                    ...data,
                    aboutBoss: {
                        ...data.aboutBoss,
                        [e.target.name]: e.target.value
                    }
                })
            }else {
                if(e.target.value!==""){
                    e.target.value=data.aboutBoss.cellphone;
                    if(numberValidation(e.target) && maxLengthValidation(e.target,9)){
                        e.target.classList.add("success");
                    }else{
                        e.target.classList.add("error");
                    }
                }else{
                    setData({
                        ...data,
                        aboutBoss: {
                            ...data.aboutBoss,
                            [e.target.name]: e.target.value
                        }
                    })
                }
            }
        }
        else{
            if(e.target.name==="email"){
                if(emailValidation(e.target)){
                    e.target.classList.add("success");
                }else{
                    e.target.classList.add("error");
                }
                setData({
                    ...data,
                    aboutBoss: {
                        ...data.aboutBoss,
                        [e.target.name]: e.target.value
                    }
                })
                
            }else{
                setData({
                    ...data,
                    aboutBoss: {
                        ...data.aboutBoss,
                        [e.target.name]: e.target.value
                    }
                })
            }
        }
    }

    const handleChangeOthers = (e) => {
        const newOthers = data.others.map(elem => {
            if(elem.nombreCampo === e.target.name)
                return {
                    idCampoProceso:elem.idCampoProceso,
                    idCampoLlenado:elem.idCampoLlenado,
                    nombreCampo: e.target.name,
                    seccion: "Sobre el jefe",
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
                        value={aboutBoss.cellphone}
                        disabled={notgrabado}
                        name="cellphone"/>
                </div>
            </div>
            {
                data.others && data.others.map((e,index) => {
                    if(e.seccion === "Sobre el jefe"){
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