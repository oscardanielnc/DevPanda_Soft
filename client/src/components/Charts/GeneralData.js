import React, {useState}  from "react";
import { Button, Table,Form,InputGroup,FormControl } from 'react-bootstrap';
import {emailValidation,numberValidation,maxLengthValidation} from "../../utils/formValidation"

import './GeneralData.scss';


export default function GeneralData ({data, setData, imStudent=true,isSaved,correctoFormato,setCorrectoFormato}) {
    const {generalData} = data;
    const handleChange = (e) => {
        if(e.target.name==="personalEmail"){
            console.log("El valor es: ",e.target.value);
            if(emailValidation(e.target) || e.target.value===""){
                e.target.classList.add("success");
                setCorrectoFormato(true);
            }else{
                e.target.classList.add("error");
                setCorrectoFormato(false);
            }
            
            setData({
                ...data,
                generalData: {
                    ...data.generalData,
                    [e.target.name]: e.target.value
                }
            }) 
        }else{
            if(e.target.name==="cellphone"){
                if(numberValidation(e.target) && maxLengthValidation(e.target,9)){
                    e.target.classList.add("success");
                    setCorrectoFormato(true);
                    setData({
                        ...data,
                        generalData: {
                            ...data.generalData,
                            [e.target.name]: e.target.value
                        }
                    })
                } else {
                    if(e.target.value!==""){
                        e.target.value=data.generalData.cellphone;
                        if(numberValidation(e.target) && maxLengthValidation(e.target,9)){
                            e.target.classList.add("success");
                            setCorrectoFormato(true);
                        }else{
                            e.target.classList.add("error");
                            setCorrectoFormato(false);
                        }
                    }else{
                        setData({
                            ...data,
                            generalData: {
                                ...data.generalData,
                                [e.target.name]: e.target.value
                            }
                        })
                    }
                }
            }else{
                setData({
                    ...data,
                    generalData: {
                        ...data.generalData,
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
                    <div>Teléfono *</div>
                    <Form.Control placeholder="Ingrese su número de celular" 
                        onChange={handleChange}
                        value={generalData.cellphone}
                        disabled = {isSaved}
                        name="cellphone"/>
                </div>
                <div className="col-sm-8 subtitles">
                    <div>Correo Personal (Opcional)</div>
                    <Form.Control placeholder="Ingrese su correo opcional" 
                        onChange={handleChange}
                        value={generalData.personalEmail}
                        disabled = {isSaved}
                        name="personalEmail"/>
                </div>
            </div>
            {
                data.others && data.others.map((e,index) => {
                    if(e.seccion === "Datos Generales"){
                        var one = 'Ingrese el ';
                        var two = e.nombreCampo;
                        var texto = one + two+":";
                        var texto2=texto;
                        if(e.flag==="opcional"){
                            texto=texto+ " (Opcional)";
                        }else{
                            texto=texto+ " *";
                        }
                        return (
                            <div key={index}>
                                <div className="rowsOthers">{texto}</div>
                                <div className="row rows" style={{"paddingTop":"10px !important"}}>
                                    <Form.Control placeholder={texto2}
                                    onChange={handleChangeOthers}
                                    value={e.valorAlumno}
                                    disabled = {isSaved}
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