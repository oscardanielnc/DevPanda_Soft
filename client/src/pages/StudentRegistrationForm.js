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
import CompUpload from "../components/Single/CompUpload";
import useAuth from "../hooks/useAuth";
import { selectSubmittedInscriptionForm,registrationInsertApiStudent,registrationUpdateApi } from "../api/registrationForm";

import './StudentRegistrationForm.scss';



const dataDummy = {
    "idAlumno": 1,
    "documentsState": "Entregado",
    "approvalState": "Desaprobado",
    "documentAgreement":"",
    "documentPlan":"",
    "generalData": {
        "name": "Oscar Daniel",
        "lastname": "Navarro Cieza",
        "code": "20186008",
        "email": "oscar.navarro@pucp.edu.pe",
        "celephone": 929178606,
        "personalEmail": "oscar@prueba.com",
        "typeUser":"C"
    },
    "aboutCompany": {
        "isNational": true,
        "ruc": "1234567890",
        "info": "Este es un texto largo de prueba",
        "foreignName": "",
        "foreignCountry":"",
        "foreingLineBusiness":""
    },
    "aboutJob": {
        "areaName": "TI",
        "jobTitle": "Analista de información",
        "activities": "Recopilar información de las base de datos y generar reportes"
    },
    "aboutPSP": {
        "dateStart":"",
        "dateEnd":"",
        "dailyHours": 6,
        "weekHours": 30
    },
    "aboutBoss": {
        "name":"Hugo Carlos",
        "area":"TI",
        "email":"hugoCar1548@gmail.com",
        "telephone":"9856875564"
    },
    "calification": {
        "comments":"Buen trabajo",
        "aprobado": true
    },
    "others": [
        {
            "section": "Sobre la PSP",
            "name": "pais",
            "value": ''
        },
        {
            "section": "Sobre el jefe",
            "name": "giro",
            "value": "Electrodomésticos"
        },
        {
            "section": "Sobre el jefe",
            "name": "nuevodato",
            "value": "xxxxx"
        }
    ]

}

export default function StudentRegistrationForm () {
    const {user} = useAuth();
    const [data, setData] = useState(dataDummy)

    useEffect(()=> {
        /*
        selectSubmittedInscriptionForm(data.idAlumno).then(response => {
            if(response.success) {
                setData(response.data);
            }
        })*/
    }, [setData])
    
    
    let result=true;
    const insert = async e => {
        //hacer una diferencia primero si es alumno o cordinador
        //en el caso del alumno por el estado de approvalState ver si es un Insertar o un Modificar
        //en el caso del coordinador ver si con el idAlumno hay alguna ficha y depende de eso Insertar o modificar 
        /*
        e.preventDefault();
        if(data.generalData.typeUser==="A"){
            let response=null;
            if(data.approvalState==="Observado"){
                response = await registrationUpdateApi(data);
            }
            if(data.approvalState==="Sin Entregar"){
                response = await registrationInsertApiStudent(data)
            }
            
            if(response.success){
                toast.success("Se guardó la ficha de forma correcta", {
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
        if(data.generalData.typeUser==="C"){
            const response =await registrationUpdateApi(data);
            if(response.success){
                toast.success("Se registraron los datos de forma correcta", {
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
        }*/
        
    }
    console.log(data);
    const isSaved=((data.documentsState==="Sin entregar")||
        (data.documentsState==="Entregado"&&data.approvalState==="Observado"))? false: true;
    const typeDocumentState = (data.documentsState==="Sin entregar")? "fileEmpty": "success";
    const imStudent=(data.generalData.typeUser==="A")?true:false;
    let typeApprovalState = "";
    switch(data.approvalState) {
        case "Observado": typeApprovalState = "warning"; break;
        case "Sin entregar": typeApprovalState = "pending"; break;
        case "Sin calificar": typeApprovalState = "pending"; break;
        case "Aprobado": typeApprovalState = "success"; break;
        default: typeApprovalState = "error"; break;
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
                            StatesViewType[typeDocumentState]("Documentos", data.documentsState),
                    StatesViewType[typeApprovalState]("Aprobación", data.approvalState)]}/>
                </div>
                <div className="row rows" style={{textAlign: "left",marginBottom:"0px"}}>
                    <h2 style={{marginBottom:"0px"}}>Datos por rellenar</h2>
                </div>
                <div className="row rows">
                    <GeneralData data={data} setData={setData} imStudent={imStudent}/>   
                </div>
                <div className="row rows">
                    <AboutCompany data={data} setData={setData} notgrabado={isSaved}/>
                </div>
                <div className="row rows">
                    <AboutJob data={data} setData={setData} notgrabado={isSaved}/>
                </div>
                <div className="row rows">
                    <AboutDurationPSP data={data} setData={setData} notgrabado={isSaved}/>
                </div>
                <div className="row rows">
                    <DirectBoss data={data} setData={setData} notgrabado={isSaved}/>
                </div>
                <div className="row rows registrationFiles">
                    <div className="row rows uploadAgreement" >                
                        <CompUpload/>
                    </div>
                </div>
                {data.generalData.typeUser==="A"? <div className="row rows BotonAlumno">
                    <Button className="btn btn-primary" style={{width:"40%"}} onClick={insert} disabled={isSaved}>Enviar</Button>
                    <ToastContainer />
                </div>:<div></div>}                 
                {data.generalData.typeUser === "C" ? <div className="row rows">
                    <CalificationFormStudent data={data} setData={setData} notgrabado={false}/>
                </div> : <div></div>}
            </div>
            
        </LayoutBasic>
    )

}
