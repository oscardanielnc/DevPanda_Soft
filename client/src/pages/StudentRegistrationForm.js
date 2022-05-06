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



const dataDummy = {
    "idAlumno": 1,
    "docuemntsState": "Sin entregar",
    "approvalState": "Observado",
    "generalData": {
        "name": "Oscar Daniel",
        "lastname": "Navarro Cieza",
        "code": "20186008",
        "email": "oscar.navarro@pucp.edu.pe",
        "telephone": 929178606,
        "personalEmail": "oscar@prueba.com"
    },
    "aboutCompany": {
        "isNational": true,
        "ruc": "1234567890",
        "info": "Este es un texto largo de prueba",
        "foreignName": ""
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
        "comments":"",
        "grade": null,
        "aprobado": false
    }
}

export default function StudentRegistrationForm () {
    const {user} = useAuth();
    const [data, setData] = useState(dataDummy)

    // const[calification,setCalification]=useState({
    //     state:"D",
    //     comments:"",
    //     grade: null,
    //     aprobado: ""
    // })
    useEffect(()=> {
        // Llamado al API
        //al inicio para traernos la data que importa
    }, [setData])
    
    
    let result=true;
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
    
    const isSaved=(data.docuemntsState==="Sin entregar")? false: true;
    const typeDocumentState = (data.docuemntsState==="Sin entregar")? "fileEmpty": "success";
    let typeApprovalState = "";
    switch(data.approvalState) {
        case "Observado": typeApprovalState = "warning"; break;
        case "Sin entrega": typeApprovalState = "pending"; break;
        default: typeApprovalState = "success"; break;
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
                            StatesViewType[typeDocumentState]("Documentos", data.docuemntsState),
                    StatesViewType[typeApprovalState]("Aprobación", data.approvalState)]}/>
                </div>
                <div className="row rows" style={{textAlign: "left",marginBottom:"0px"}}>
                    <h2 style={{marginBottom:"0px"}}>Datos por rellenar</h2>
                </div>
                <div className="row rows">
                    <GeneralData data={data} setData={setData} imStudent={true}/>   
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
                {/* <div className="row rows">
                    <DocumentPlusIcon/>
                </div> */}
                {user && user.tipoUsuario==="A"? <div className="row rows BotonAlumno">
                    <Button className="btn btn-primary" style={{width:"40%"}} onClick={insert} disabled={isSaved}>Enviar</Button>
                    <ToastContainer />
                </div>:<div></div>}
{/*                 
                {user && user.tipoUsuario == "C" ? <div className="row rows">
                    <CalificationFormStudent calification={calification} setCalification={setCalification}/>
                </div> : <div></div>} */}
            </div>
            
        </LayoutBasic>
    )

}
