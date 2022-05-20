import React, {useState}  from "react";
import { Button, Table,Form,InputGroup,FormControl,DropdownButton,Dropdown } from 'react-bootstrap';
import {numberValidation,maxLengthValidation} from "../../utils/formValidation";
import './AboutCompany.scss';


export default function AboutCompany ({data, setData, notgrabado,countries,lineBusiness}) {
    const {aboutCompany} = data;

    const handleChangeText = (e) => {
        if(e.target.name==="ruc"){
            if(numberValidation(e.target) && maxLengthValidation(e.target,11)){
                setData({
                    ...data,
                    aboutCompany: {
                        ...data.aboutCompany,
                        [e.target.name]: e.target.value
                    }
                })
            }
        }else{
            setData({
                ...data,
                aboutCompany: {
                    ...data.aboutCompany,
                    [e.target.name]: e.target.value
                }
            })
        }
    }
    const handleChangeCheck = (e) => {
        if(data.aboutCompany.isNational===true){
            const newData = {
                ...data,
                aboutCompany: {
                    isNational: !data.aboutCompany.isNational,
                    ruc:""
                }
            }
            setData(newData);
        }else{
            const newData = {
                ...data,
                aboutCompany: {
                    isNational: !data.aboutCompany.isNational
                }
            }
            setData(newData);
        }
        
    }

    const handleChangeOthers = (e) => {
        const newOthers = data.others.map(elem => {
            if(elem.nombreCampo === e.target.name)
                return {
                    idCampoProceso:elem.idCampoProceso,
                    idCampoLlenado:elem.idCampoLlenado,
                    nombreCampo: e.target.name,
                    seccion: "Sobre la empresa",
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
    
    const handleChangeCountry = (e) => {
        console.log("Change en country: ",e);
        /*const newOthers = data.others.map(elem => {
            if(elem.nombreCampo === e.target.name)
                return {
                    idCampoProceso:elem.idCampoProceso,
                    idCampoLlenado:elem.idCampoLlenado,
                    nombreCampo: e.target.name,
                    seccion: "Sobre la empresa",
                    flag: elem.flag,
                    valorAlumno: e.target.value   
                }
            return elem;
        })
        setData({
            ...data,
            others: newOthers
        })*/
    }
    
    const handleChangeLine = (e) => {
        console.log("Change en lineBussinnes: ",e);
        /*const newOthers = data.others.map(elem => {
            if(elem.nombreCampo === e.target.name)
                return {
                    idCampoProceso:elem.idCampoProceso,
                    idCampoLlenado:elem.idCampoLlenado,
                    nombreCampo: e.target.name,
                    seccion: "Sobre la empresa",
                    flag: elem.flag,
                    valorAlumno: e.target.value   
                }
            return elem;
        })
        setData({
            ...data,
            others: newOthers
        })*/
    }
    console.log("El data es: ",data );
    let indexCountry=(data.aboutCompany.foreignCountry!==null || data.aboutCompany.foreignCountry!=="")?data.aboutCompany.foreignCountry:-1;
    let indexLine=(data.aboutCompany.foreingLineBusiness!==null || data.aboutCompany.foreingLineBusiness!=="")?data.aboutCompany.foreingLineBusiness:-1;
    console.log("El indexCountry es: ",indexCountry);
    console.log("El indexLine es: ",indexLine);
    return (
        aboutCompany &&
            <div className="container chartSobreEmpresa">
             <nav className="navbar navbar-fixed-top navbar-inverse bg-inverse "style={{ backgroundColor: "#E7E7E7"}}>
                <h3 style={{"marginLeft":"15px"}}>Sobre la empresa</h3>
             </nav>
            <div className="row rows" >
                <div className="col-sm-3 subtitles">
                    <div>Tipo de empresa:</div>
                </div>
                <div className="col-sm-6 subtitles">
                    <Form>
                        <div key={`inline-radio`} className="mb-3">
                        <Form.Check
                            inline
                            label="Nacional"
                            name="National"
                            type="radio"
                            disabled={notgrabado}
                            id={`inline-radio-1`}
                            checked={aboutCompany.isNational}
                            onChange={handleChangeCheck}
                        />
                        <Form.Check
                            inline
                            label="Extranjera"
                            name="Extranjera"
                            type="radio"
                            disabled={notgrabado}
                            id={`inline-radio-2`}
                            checked={!aboutCompany.isNational}
                            onChange={handleChangeCheck}
                        />
                        </div>
                        </Form>
                </div>
                <div className="col-sm-3 subtitles">
                </div>
            </div>
            <div className="row rows" >
                <div style={{"marginTop":"5px"}}>Empresa Nacional</div>
            </div>
            <div className="row rows" >
                <div className="col-sm-1 subtitles">
                <div style={{"marginTop":"5px","marginBottom":"8px"}}>RUC</div>
                </div>
                <div className="col-sm-7 subtitles">
                    <Form.Control placeholder="Ingrese RUC de la empresa" 
                        onChange={handleChangeText}
                        disabled = {!aboutCompany.isNational || notgrabado}
                        value={aboutCompany.ruc}
                        name="ruc"
                        style={{"marginBottom":"8px !important"}}/>
                </div>
            </div>
            <div className="row rows" >
                <div >Nombre de Empresa</div>
            </div>
            <div className="row rows" >
                <Form.Control placeholder="Escriba el nombre de la empresa" 
                        onChange={handleChangeText}
                        disabled = {notgrabado}
                        value={aboutCompany.companyName}
                        name="companyName"
                        style={{"marginBottom":"10px !important"}}/>
            </div>
            <div className="row rows">
                <div className="col-sm-5 subtitles">
                    <div>País</div>
                    <Form.Select className="select" name="foreignCountry" disabled={notgrabado} onChange={handleChangeCountry} defaultValue={indexCountry}>
                        <option select value={indexCountry}>Seleccionar</option>
                        {
                            countries.map((element, index) => (
                                <option value={element.idCountry} 
                                    key={element.idCountry}>{element.name}
                                </option>
                            ))
                        }
                    </Form.Select>
                </div>
                <div className="col-sm-2 subtitles"></div>
                <div className="col-sm-5 subtitles">
                    <div>Giro de la empresa</div>
                    <Form.Select className="select"  name="foreingLineBusiness" disabled={notgrabado} onChange={handleChangeLine}>
                        <option value={indexLine}>Seleccionar</option>
                        {
                            lineBusiness.map((element, index) => (
                                <option value={element.name} 
                                    key={element.idLineBussiness}>{element.name}
                                </option>
                            ))
                        }
                    </Form.Select>
                </div>
                {/*<div className="col-sm-6 subtitles">
                    <div>País</div>
                    <Form.Control placeholder="Escriba el país de la empresa" 
                        onChange={handleChangeText}
                        disabled={notgrabado}
                        value={aboutCompany.companyCountry}
                        name="companyCountry"/>
                </div>
                <div className="col-sm-6 subtitles">
                    <div>Giro de la empresa</div>
                    <Form.Control placeholder="Escriba el giro de la empresa" 
                        onChange={handleChangeText}
                        disabled={notgrabado}
                        value={aboutCompany.companyLineBusiness}
                        name="companyLineBusiness"/>
                </div>*/}
            </div>
            <div className="row rows" >
                <div>Dirección de la empresa</div>
            </div>
            <div className="row rows" >
                <Form.Control placeholder="Escriba la dirección de la empresa" 
                        onChange={handleChangeText}
                        disabled = {notgrabado}
                        value={aboutCompany.companyAddress}
                        name="companyAddress"
                        style={{"marginBottom":"10px !important"}}/>
            </div>
            {
                data.others && data.others.map((e,index) => {
                    if(e.seccion === "Sobre la empresa"){
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