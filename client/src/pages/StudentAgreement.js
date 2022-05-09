import React, {useState, useEffect} from "react";
import LayoutBasic from "../layouts/LayoutBasic";
import DocumentPlusIcon from "../components/DocumentPlusIcon/DocumentPlusIcon";
import StateViewer,{StatesViewType} from "../components/StateViewer/StateViewer";
import CompUpload from "../components/Single/CompUpload";
import { Button } from "react-bootstrap";
import "./StudentAgreement.scss";
import { Link } from "react-router-dom";
import { getAllDocs } from "../api/files";
import UploadFiles from "../components/UploadFiles/UploadFiles";


const docuemntsState = "Entregado";
const approvalState = "Aprobado"

export default function StudentAgreement () {
    const [docs, setDocs] = useState([])
    const [studentDocs, setStudentDocs] = useState([])
    useEffect(() => {
        getAllDocs("1-1-CONV", 0).then(response => {
            if(response.success) {
                setDocs(response.docs)
            }
        })
    },[setDocs])
    useEffect(() => {
        getAllDocs("1-1-CONV-1", 1).then(response => {
            if(response.success) {
                setStudentDocs(response.docs)
            }
        })
    },[setStudentDocs])

    const typeDocumentState = (docuemntsState==="Sin entregar")? "fileEmpty": "success";
    let typeApprovalState = "";
    switch(approvalState) {
        case "Observado": typeApprovalState = "warning"; break;
        case "Sin entrega": typeApprovalState = "pending"; break;
        default: typeApprovalState = "success"; break;
    }

    const datadummy = {
        "idAlumno":1,
        "numDocumentos":2,
        "documento":{
            "idDocumento":1,
            "nombre":"convenioOscar",
            "archivo":null,
            "estadofaci":"entregado",
            "estadoEspecialidad":"entregado"
        },
    }
    const [data, setData] = useState(datadummy)
    const numDocumentos=0;
    let result=true;
    const insert = async e => {
        /*
        e.preventDefault();
        //tenemos que saber que se han entregado dos documentos, tanto el convenio como el plan de aprendizaje para poder hacer la subida
        if(numDocumentos === 2){
            let response=null;
            response = await agreementAndPlanRegistration(data);
            
            if(response.success){
                toast.success("Se entregó correctamente a revisión tu plan de aprendizaje y convenio", {
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
        }*/
        
    }
    return (
        <LayoutBasic>
            <div className="container"  style={{"padding":"1px"}}>
                <div className="row rows" style={{textAlign: "left"}}>
                    <h1>
                        Convenio y Plan de Aprendizaje
                    </h1>
                </div>
                <div className="row rows" style={{textAlign: "left"}}>
                    <p>
                    Aquí podras ingresar tu convenio y plan de aprendizaje, una vez esten firmados por tu empresa y por ti, para que la universidad lo revise y puedas obtener la aprobación de los mismos. Adicionalmente, debes de completar la información que se solicita en el apartado “Información sobre el convenio”. 
                    </p>
                    <p>
                    A continuación se presenta el modelo para convenio y plan de aprendizaje:
                    </p>
                    {
                        docs.length>0 && docs.map((e, index) => (
                            <DocumentPlusIcon name={e.nombre} path={e.ruta} key={index}/>
                        ))
                    }
                </div>
                <div className="row rows estado">
                    <h2>
                        Estado de la entrega
                    </h2>
                </div>
                <div className="row rows">
                    <StateViewer states={[
                        StatesViewType[typeDocumentState]("Documentos", docuemntsState),
                        StatesViewType[typeApprovalState]("Aprobación", approvalState)]}/>
                </div>
                <UploadFiles docs={studentDocs} />
                <div className="row rows uploadAgreement" >                
                    <CompUpload/>
                </div>
                <div className="row rows boton">
                    <Button className="btn btn-primary" style={{width:"40%"}}>Entregar</Button>
                </div>
            </div>
        </LayoutBasic>
    )
}