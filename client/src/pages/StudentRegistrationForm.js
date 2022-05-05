import React, {useState} from "react";
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
import useAuth from "../hooks/useAuth"

import './StudentRegistrationForm.scss';

export default function StudentRegistrationForm () {
    let result=true;
    const [tipoUsuario, setTipoUsuario] = useState('C')
    console.log(tipoUsuario);
    const[entregado,setEntregado]=useState(true);
    let tipoEntrega;
    let comentarioEntrega="";
    if(entregado==true){
        tipoEntrega="success";
        comentarioEntrega="Entregado";
    }else{
        tipoEntrega="fileEmpty";
        comentarioEntrega="Sin entregar";
    }
    let estadoCalificado= "A";//"A" es aprobado, "O" es observado, "D" es desaprobado, "N" es no calificado
    let comentarioCalificado="";
    
    if(estadoCalificado=="A"){
        estadoCalificado="success";
        comentarioCalificado="Aprobado";
    }
    if(estadoCalificado=="O"){
        estadoCalificado="warning";
        comentarioCalificado="Observado";
    }
    if(estadoCalificado=="D"){
        estadoCalificado="success";
        comentarioCalificado="Desaprobado";
    }
    if(estadoCalificado=="N"){
        estadoCalificado="pending";
        comentarioCalificado="Sin entrega";
    }
    const [generalData,setGeneralData]=useState({
        names:"Jeison Tonny",
        lastNames:"Romero Salinas",
        codePUCP: "20180708",
        emailPUCP:"jeison.romero",
        celephone:"982546546",
        emailAlternative:"jeison@gmail.com",
        recorded:false
    });
    const [aboutCompany, setAboutCompany] = useState({
        RUCNacional: "151",
        National:true,
        InformacionNacional:"",
        NombreExtranjera:"",
        grabado: false
    })
    const [aboutJob,setAboutJob]=useState({
        nameArea:"asdasd",
        jobTitle:"",
        activities:""
    })

    const [aboutPSP,setAboutPSP]=useState({
        dateStart:null,
        dateEnd:null,
        dailyHours: 5,
        weekHours: 0
    })

    const[directBoss,setDirectBoss]=useState({
        name:"asdasd",
        area:"",
        email:"",
        celephone:""
    })

    const[calification,setCalification]=useState({
        state:"D",
        comments:""
    })
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
                    <GeneralData generalData={generalData} setGeneralData={setGeneralData}/>   
                </div>
                <div className="row rows">
                    <AboutCompany 
                            aboutCompany={aboutCompany} setAboutCompany ={setAboutCompany}/>
                </div>
                <div className="row rows">
                    <AboutJob aboutJob={aboutJob} setAboutJob={setAboutJob}/>
                </div>
                <div className="row rows">
                    <AboutDurationPSP aboutPSP={aboutPSP} setAboutPSP={setAboutPSP}/>
                </div>
                <div className="row rows">
                    <DirectBoss directBoss={directBoss} setDirectBoss={setDirectBoss}/>
                </div>
                <div className="row rows">
                    <p>Acá va el componente de subida de archivos</p>
                </div>
                {tipoUsuario=="A"?<div className="row rows BotonAlumno">
                    <Button className="btn btn-primary" style={{width:"40%"}} onClick={insert}>Enviar</Button>
                    <ToastContainer />
                </div>:<div></div>}
                
                {tipoUsuario == "C" ? <div className="row rows">
                    <CalificationFormStudent calification={calification} setCalification={setCalification}/>
                </div> : <div></div>}
            </div>
            
        </LayoutBasic>
    )

}
