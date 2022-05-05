import React, {useState,useEffect} from "react";
import LayoutBasic from "../layouts/LayoutBasic";
import {Form,Button,Row,Col,Alert} from 'react-bootstrap';
import { specialtyInsertApi } from "../api/specialty";
import GeneralData from "../components/Charts/GeneralData";
import AboutCompany from "../components/Charts/AboutCompany";
import { ToastContainer, toast } from 'react-toastify';
import AboutJob from "../components/Charts/AboutJob";
import AboutDurationPSP from "../components/Charts/AboutDurationPSP";
import DirectBoss from "../components/Charts/DirectBoss";
import CalificationFormStudent from "../components/Charts/CalificationFormStudent";
import StateViewer,{StatesViewType} from "../components/StateViewer/StateViewer";
import DocumentPlusIcon from "../components/DocumentPlusIcon/DocumentPlusIcon";
import useAuth from "../hooks/useAuth";
import { selectSubmittedInscriptionForm } from "../api/registrationForm";

import './StudentRegistrationForm.scss';

export default function StudentRegistrationForm () {
    const [user,setUser] = useState(useAuth());
    const [dataUser,setDataUser]=useState({
        names: user.nombres, 
        lastNames:user.apellidos,
        codePUCP: user.codigoPUCP,
        emailPUCP:user.correo,
        tipoUsuario:user.tipoUsuario
    })
    const [generalDataInit,setGeneralDataInit]=useState({
        idFicha: null,
        fidAlumnoProceso: user.fidAlumnoProceso,
        aprobado: null,
        estadoDocumento: null,
        observaciones: null,
        nota: null,//esto no sé si está en la BD pero sí lo voy a usar
        entregado:null,//esto no sé si está en la BD pero sí lo voy a usar
        estadoCalificado: null// esto me parece que es distinto a aprobado, ya que aprobado es boolean y esto 
        //debe ser un caracter  "A" es aprobado, "O" es observado, "D" es desaprobado, "N" es no calificado
    });
    const [aboutCompany, setAboutCompany] = useState({
        RUCNacional: "",
        National:true,
        InformacionNacional:"",
        NombreExtranjera:"",
        grabado: false
    })
    
    const [aboutJob,setAboutJob]=useState({
        nameArea:"",
        jobTitle:"",
        activities:""
    })

    const [aboutPSP,setAboutPSP]=useState({
        dateStart:null,
        dateEnd:null,
        dailyHours: 0,
        weekHours: 0
    })

    const[directBoss,setDirectBoss]=useState({
        name:"",
        area:"",
        email:"",
        celephone:""
    })

    const[calification,setCalification]=useState({
        state:"D",
        comments:generalDataInit.observaciones,
        grade: null,
        aprobado: generalDataInit.aprobado
    })

    const [datos, setDatos]=useState({
        dataUser:dataUser,
        generalDataInit:generalDataInit,
        aboutCompany:aboutCompany,
        aboutJob:aboutJob,
        aboutPSP:aboutPSP,
        directBoss:directBoss,
        calification:calification
    }
    )
    console.log(datos);
    const notgrabado=(datos.generalDataInit.idFicha==null||datos.generalDataInit.idFicha===0)?false:true;
    useEffect(() => {
        async function fetchData() {
            const response = await selectSubmittedInscriptionForm(1)
            //console.log("response", response)
            if(response.success) {
                setDatos(response.datos);
            }else{
                toast.error('Ups, ha ocurrido un error', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
        fetchData()
        
    }, [setDatos])

    let result=true;
    let tipoEntrega;
    let comentarioEntrega;
    if(datos.generalDataInit.entregado===true){
        tipoEntrega="success";
        comentarioEntrega="Entregado";
    }else{
        tipoEntrega="fileEmpty";
        comentarioEntrega="Sin entregar";
    }
    let estadoCalificado;
    let comentarioCalificado;
    
    if(datos.generalDataInit.estadoCalificado==="A"){
        estadoCalificado="success";
        comentarioCalificado="Aprobado";
    }else{
        if(datos.generalDataInit.estadoCalificado==="O"){
            estadoCalificado="warning";
            comentarioCalificado="Observado";
        }else{
            if(datos.generalDataInit.estadoCalificado==="D"){
                estadoCalificado="success";
                comentarioCalificado="Desaprobado";
            }else{
                estadoCalificado="pending";
            comentarioCalificado="Sin entrega";
            }
        }
    }
    
    const insert = e => {
        if(result){
            toast.success("Se insertó de forma correcta", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }else{
            toast.error('Ups, ha ocurrido un error', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
       
    }
    return (
        <LayoutBasic>
            <div className="container principal" style={{"padding":"1px"}}>
                <div className="row rows" style={{textAlign: "left"}}>
                    <h1>Ficha de Inscripción</h1>
                </div>
                <div className="row rows" style={{textAlign: "left"}}>
                    <p>
                    Aquí deberá de rellenar la información solicitada más abajo para poder continuar con el proceso. Una vez que la complete, esta será revisada para su aprobación.
                    </p>
                </div>
                <div className="row rows">
                    <StateViewer states={[
                            StatesViewType[tipoEntrega]("Documentos", comentarioEntrega),
                    StatesViewType[estadoCalificado]("Aprobación", comentarioCalificado)]}/>
                </div>
                <div className="row rows" style={{textAlign: "left",marginBottom:"0px"}}>
                    <h2 style={{marginBottom:"0px"}}>Datos por rellenar</h2>
                </div>
                <div className="row rows">
                    <GeneralData generalData={datos.generalDataInit} setGeneralData={setGeneralDataInit}/>   
                </div>
                <div className="row rows">
                    <AboutCompany 
                            aboutCompany={datos.aboutCompany} setAboutCompany ={setAboutCompany} notgrabado={notgrabado}/>
                </div>
                <div className="row rows">
                    <AboutJob aboutJob={datos.aboutJob} setAboutJob={setAboutJob} notgrabado={notgrabado}/>
                </div>
                <div className="row rows">
                    <AboutDurationPSP aboutPSP={datos.aboutPSP} setAboutPSP={setAboutPSP} notgrabado={notgrabado}/>
                </div>
                <div className="row rows">
                    <DirectBoss directBoss={datos.directBoss} setDirectBoss={setDirectBoss} notgrabado={notgrabado}/>
                </div>
                <div className="row rows">
                    <DocumentPlusIcon/>
                </div>
                {datos.dataUser.tipoUsuario==="A"?<div className="row rows BotonAlumno">
                    <Button className="btn btn-primary" style={{width:"40%"}} onClick={insert} disabled={notgrabado}>Enviar</Button>
                    <ToastContainer />
                </div>:<div></div>}
                
                {datos.dataUser.tipoUsuario == "C" ? <div className="row rows">
                    <CalificationFormStudent calification={datos.calification} setCalification={setCalification}/>
                </div> : <div></div>}
            </div>
            
        </LayoutBasic>
    )

}
