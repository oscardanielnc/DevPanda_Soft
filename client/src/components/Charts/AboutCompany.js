import React, {useState}  from "react";
import { Button, Table,Form,InputGroup,FormControl,DropdownButton,Dropdown } from 'react-bootstrap';
import {numberValidation,maxLengthValidation,minLengthValidation} from "../../utils/formValidation";
import './AboutCompany.scss';


export default function AboutCompany ({data, setData, notgrabado,countries,lineBusiness, correctoFormato,setCorrectoFormato,validacionesCompany}) {
    const {aboutCompany} = data;
    //console.log("Countries es: ",countries);
    //console.log("Lineas de negocio son: ",lineBusiness);
    const handleChangeText = (e) => {
        if(e.target.name==="ruc"){
            console.log("El valor es: ",e.target.value);
            if(numberValidation(e.target) && maxLengthValidation(e.target,11)){
                if(minLengthValidation(e.target,9)){
                    e.target.classList.add("success");
                    validacionesCompany[0]=true;
                    setCorrectoFormato(true);
                }else{
                    e.target.classList.add("error");
                    validacionesCompany[0]=false;
                    setCorrectoFormato(false);
                }
                setData({
                    ...data,
                    aboutCompany: {
                        ...data.aboutCompany,
                        [e.target.name]: e.target.value
                    }
                })
            }else {
                if(e.target.value!==""){
                    e.target.value=data.aboutCompany.ruc;
                    if(numberValidation(e.target) && maxLengthValidation(e.target,11)){
                        e.target.classList.add("success");
                        validacionesCompany[0]=true;
                        setCorrectoFormato(true);
                    }else{
                        e.target.classList.add("error");
                        validacionesCompany[0]=false;
                        setCorrectoFormato(false);
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
            console.log("Cambiando a extranjera");
            const newData = {
                ...data,
                aboutCompany: {
                    isNational: !data.aboutCompany.isNational,
                    ruc:"",
                    companyName:data.aboutCompany.companyName,
                    country:data.aboutCompany.country,
                    lineBusiness:data.aboutCompany.lineBusiness,
                    companyAddress:data.aboutCompany.companyAddress
                }
            }
            const boxInput= document.getElementById("idFormCompanyRUC");
            console.log("El box input es: ",boxInput);
            boxInput.classList.remove("success");
            boxInput.classList.remove("error");
            setData(newData);
        }else{
            console.log("Cambiando a nacional");
            const newData = {
                ...data,
                aboutCompany: {
                    isNational: !data.aboutCompany.isNational,
                    ruc:"",
                    companyName:data.aboutCompany.companyName,
                    country:data.aboutCompany.country,
                    lineBusiness:data.aboutCompany.lineBusiness,
                    companyAddress:data.aboutCompany.companyAddress
                }
            }
            setData(newData);
        }
        //e.target.classList.add("form-control");
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
        //console.log("Change en country: ",e);
        setData({
            ...data,
            aboutCompany: {
                ...data.aboutCompany,
                [e.target.name]: parseInt(e.target.value)
            }
        })
    }
    
    const handleChangeLine = (e) => {
        //console.log("Change en lineBussinnes: ",e);
        setData({
            ...data,
            aboutCompany: {
                ...data.aboutCompany,
                [e.target.name]: parseInt(e.target.value)
            }
        })
    }
    //console.log("El data es: ",data );
    let indexCountry=(data.aboutCompany.country!==null || data.aboutCompany.country!=="")?data.aboutCompany.country:-1;
    let indexLine=(data.aboutCompany.lineBusiness!==null || data.aboutCompany.lineBusiness!=="")?data.aboutCompany.lineBusiness:-1;
    //console.log("El indexCountry es: ",indexCountry);
    //console.log("El indexLine es: ",indexLine);
    return (
            <div className="container chartSobreEmpresa">
             <nav className="navbar navbar-fixed-top navbar-inverse bg-inverse "style={{ backgroundColor: "#E7E7E7"}}>
                <h3 style={{"marginLeft":"15px"}}>Sobre la empresa</h3>
             </nav>
            <div className="row rows" >
                <div className="col-sm-3 subtitles">
                    <div>Tipo de empresa: *</div>
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
            <div className="row rows ruc" >
                <div className="TitleSpecial" >
                Si es empresa nacional
                </div>
                <div className="col-sm-1 subtitles">
                <div style={{"marginTop":"5px","marginBottom":"8px"}}>RUC:</div>
                </div>
                <div className="col-sm-7 subtitles">
                    <Form.Control placeholder="Ingrese RUC de la empresa" 
                        id="idFormCompanyRUC"
                        onChange={handleChangeText}
                        disabled = {!aboutCompany.isNational || notgrabado}
                        value={aboutCompany.ruc}
                        name="ruc"
                        style={{"marginBottom":"8px !important"}}/>
                </div>
            </div>
            <div className="row rows" >
                Nombre de Empresa: *
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
                    <div>País: *</div>
                    <Form.Select className="select" defaultValue={indexCountry} name="country" disabled={notgrabado} onChange={handleChangeCountry} >
                        <option value={-1}>Seleccionar</option>
                        {
                            countries.map((element, index) => (
                                <option value={element.idPais} 
                                    key={element.idPais}>{element.nombrePais}
                                </option>
                            ))
                        }
                    </Form.Select>
                </div>
                <div className="col-sm-2 subtitles"></div>
                <div className="col-sm-5 subtitles">
                    <div>Giro de la empresa: *</div>
                    <Form.Select className="select" defaultValue={indexLine} name="lineBusiness" disabled={notgrabado} onChange={handleChangeLine}>
                        <option value={-1}>Seleccionar</option>
                        {
                            lineBusiness.map((element, index) => (
                                <option value={element.idLineaNegocio} 
                                    key={element.idLineaNegocio}>{element.nombreLineaNegocio}
                                </option>
                            ))
                        }
                    </Form.Select>
                </div>
            </div>
            <div className="row rows" >
                Dirección de la empresa: *
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