import React, {useState, useEffect} from "react";
import LayoutBasic from "../../layouts/LayoutBasic";
import DocumentPlusIcon from "../../components/DocumentPlusIcon/DocumentPlusIcon";
import StateViewer,{StatesViewType} from "../../components/StateViewer/StateViewer";
import FileManagement from "../../components/FileManagement/FileManagement";
import { Button ,Form} from "react-bootstrap";
import "./scss/StudentAgreement.scss";
import { Link } from "react-router-dom";
import { getAllDocsApi, uploadDocsApi } from "../../api/files";
import ShowFiles from "../../components/FileManagement/ShowFiles";
import { ToastContainer, toast } from 'react-toastify';
import {selectDocumentsInfoByProcessOnlyStudent} from "../../api/agreementLearnigPlan"
import useAuth from "../../hooks/useAuth";


let docuemntsState ="";
let approvalState = ""
const maxFiles = 2;
const idAlumno=1;
export default function StudentAgreement () {
    const [fileList, setFileList] = useState([])
    const [docs, setDocs] = useState([])
    const [studentDocs, setStudentDocs] = useState([])
    const [data, setData] = useState([
        {
            estadoFaci: "0",
            estadoEspecialidad: "0",
            observaciones: ""
        },
    ]); 
    const [numFiles,setNumFiles]=useState(0);
    const {user} = useAuth();
    const fidAlumno=user.idPersona;
    useEffect(() => {
        getAllDocsApi(`1-${user.fidEspecialidad}-CONV`, 0).then(response => {
            if(response.success) {
                setDocs(response.docs)
            }
        })
    },[setDocs])
    
    useEffect(() => {
        getAllDocsApi(`1-${user.fidEspecialidad}-CONV-${user.idPersona}`, 1).then(response => {
            if(response.success) {
                setStudentDocs(response.docs)
                if(response.docs.length>0){
                    docuemntsState="Entregado"
                }
                else{
                    docuemntsState="Sin entregar"
                }
            }
   
        })
    },[setStudentDocs])

    useEffect(()=>{
        selectDocumentsInfoByProcessOnlyStudent(fidAlumno).then(response => {
            if(response.success) {
                setData(response.files)
                if(response.files.length>0){
                    setNumFiles(response.files.length-1);
                }
                console.log("response:",response.files);
                
            }
        }
        )
    },[setData])

    // console.log("ga",data.estadoEspecialidad);
    
    const typeDocumentState = (docuemntsState==="Sin entregar")? "fileEmpty": "success";
    let typeApprovalState = "pending";
    let observaciones=data[numFiles].observaciones;
    console.log("lenght",numFiles);
    if(data[numFiles].estadoFaci === "O" || data[numFiles].estadoEspecialidad === "O"){
        approvalState = "Observado"
    }
    else if(data[numFiles].estadoFaci === "A" || data[numFiles].estadoEspecialidad ==="A"  ){
        approvalState= "Aprobado"
    }
    else if(data[numFiles].estadoFaci === "P" || data[numFiles].estadoEspecialidad ==="P"){
        approvalState= "Pendiente"
        console.log("holi");
    }
    else{
        approvalState= "Sin entrega"
    }
    
    switch(approvalState) {
        case "Observado": typeApprovalState = "warning"; break;
        case "Sin entrega": typeApprovalState = "fileEmpty"; break;
        case "Pendiente": typeApprovalState="pending";break;
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

    const deliver = async () => {
        if(fileList.length === maxFiles) {
            const response = await uploadDocsApi(fileList, `1-${user.fidEspecialidad}-CONV-${user.idPersona}`, 1);
            if(response.success) {
                toast.success(response.msg, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                // llamada al API para actualizar los eatados
                window.scrollTo(0, 0);
                window.location.reload();

            } else {
                toast.error(response.msg, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            // toast.error("NO NO NO, equivocadiño. No debes tocar este botón!", {
            //     position: "top-right",
            //     autoClose: 3000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            // });
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
                <div className="shadowbox">
                    <div className="row rows" style={{textAlign: "left"}}>
                        <p>
                        Aquí podrá ingresar su Convenio y Plan de aprendizaje, una vez esten firmados por tu empresa y por ti, para que la universidad lo revise y puedas obtener la aprobación de los mismos. Adicionalmente, debes de completar la información que se solicita en el apartado “Información sobre el convenio”. 
                        </p>
                        <p>
                        A continuación se presenta el modelo para convenio y plan de aprendizaje:
                        </p>
                        <ShowFiles docs={docs} />
                    </div>
                </div>
                <div className="shadowbox">
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
                </div>
                <div className="shadowbox">
                    <div className="row rows uploadAgreement" >                
                        <FileManagement canUpload={true} docs={studentDocs} maxFiles={maxFiles} fileList={fileList} setFileList={setFileList}/>
                    </div>
                </div>
                <div className="shadowbox">
                    <div className="row rows" style={{textAlign: "left",marginTop:"25px"}}>
                        <h2>Observaciones</h2>  
                        <Form>                        
                            <Form.Group className="mb-3" controlId="ControlTextarea1">                            
                                <Form.Control  disabled placeholder={`${observaciones}`} as="textarea" rows={8}/>
                            </Form.Group>
                        </Form>                           
                    </div>
                </div>

                <div className="row rows boton">
                    <Button className="btn btn-primary" style={{width:"40%"}} onClick={deliver}>Entregar</Button>
                </div>
            </div>
        </LayoutBasic>
    )
}