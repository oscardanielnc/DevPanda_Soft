import React, {useState, useEffect} from "react";
import LayoutBasic from "../layouts/LayoutBasic";
import DocumentPlusIcon from "../components/DocumentPlusIcon/DocumentPlusIcon";
import StateViewer,{StatesViewType} from "../components/StateViewer/StateViewer";
import FileManagement from "../components/FileManagement/FileManagement";
import { Button } from "react-bootstrap";
import "./StudentAgreement.scss";
import { Link } from "react-router-dom";
import { getAllDocsApi } from "../api/files";
import ShowFiles from "../components/FileManagement/ShowFiles";
import { ToastContainer, toast } from 'react-toastify';
import {selectDocumentsInfoByProcessOnlyStudent} from "../api/agreementLearnigPlan"



const docuemntsState = "Sin entregar";
const approvalState = "Sin entrega"
const maxFiles = 2;
const idAlumno=1;
export default function StudentAgreement () {
    const [fileList, setFileList] = useState([])
    const [docs, setDocs] = useState([])
    const [studentDocs, setStudentDocs] = useState([])
    useEffect(() => {
        getAllDocsApi("1-1-CONV", 0).then(response => {
            if(response.success) {
                setDocs(response.docs)
            }
        })
    },[setDocs])
    
    useEffect(() => {
        getAllDocsApi("1-1-CONV-1", 1).then(response => {
            if(response.success) {
                setStudentDocs(response.docs)
            }
        })
    },[setStudentDocs])


    /*
    useEffect(()=>{
        selectDocumentsInfoByProcessOnlyStudent(1).then(response => {
            if(response.success) {
                setFileList(response.files)
            }
        }
        )
    },[setFileList])
*/
    const typeDocumentState = (docuemntsState==="Sin entregar")? "fileEmpty": "success";
    let typeApprovalState = "";
    switch(approvalState) {
        case "Observado": typeApprovalState = "warning"; break;
        case "Sin entrega": typeApprovalState = "pending"; break;
        default: typeApprovalState = "success"; break;
    }
/*
    const datadummy = {
        "idAlumno":1,
        "documento":{
            "idDocumento":1,
            "estadofaci":"entregado",
            "estadoEspecialidad":"entregado",
            "esAlumno":1,
        },
    }
    */

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
    const deliver = () => {
        if(fileList.length === maxFiles) {
            // const response = await uploadDocsApi(files, "1-1-CONV-1", 1);
            // if(response.success) {
            //     toast.success(response.msg, {
            //         position: "top-right",
            //         autoClose: 3000,
            //         hideProgressBar: false,
            //         closeOnClick: true,
            //         pauseOnHover: true,
            //         draggable: true,
            //         progress: undefined,
            //     });
            //     window.location.reload()
            // } else {
            //     toast.error(response.msg, {
            //         position: "top-right",
            //         autoClose: 3000,
            //         hideProgressBar: false,
            //         closeOnClick: true,
            //         pauseOnHover: true,
            //         draggable: true,
            //         progress: undefined,
            //     });
            // }
            toast.error("NO NO NO, equivocadiño. No debes tocar este botón!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else {
            toast.warning(`Se requieren ${maxFiles} archivos para esta entrega.`, {
                position: "top-right",
                autoClose: 3000,
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
            <ToastContainer/>
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
                    <ShowFiles docs={docs} />
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
                <div className="row rows uploadAgreement" >                
                    <FileManagement canUpload={true} docs={studentDocs} maxFiles={maxFiles} fileList={fileList} setFileList={setFileList}/>
                </div>
                <div className="row rows boton">
                    <Button className="btn btn-primary" style={{width:"40%"}} onClick={deliver}>Entregar</Button>
                </div>
            </div>
        </LayoutBasic>
    )
}