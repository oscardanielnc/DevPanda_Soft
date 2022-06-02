import React, {useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import LayoutBasic from "../../layouts/LayoutBasic";
import { Button, Form} from "react-bootstrap";
import StateViewer,{StatesViewType} from "../../components/StateViewer/StateViewer";
// import "./AgreementReview.scss";
import FileManagement from "../../components/FileManagement/FileManagement";
import { getDeliverableStudent, setDeliverableStudent } from "../../api/deliverables";
import useAuth from "../../hooks/useAuth";
import { ToastContainer, toast } from 'react-toastify';
import { getAllDocsApi, uploadDocsApi } from "../../api/files";

// const dataDummy={
//     "idAlumno": 1,
//     "idAlumnoProceso": 1,
//     "deliverable": {
//         "idEntregable": 2,
//         "name": "Certificado Taller",
//         "description": "Entrega del certificado del taller al que se debio asistir durante el curso.",
//         "flagIni": 0,
//         "fechaIni": null,
//         "flagFin": 0,
//         "fechaFin": null,
//         "flagNota": 0
//     },
//     "deliverableResponse": {
//        "idRespuestaEntregable": 2,
//        "docState": "E",
//        "evaState": "P",
//        "observation": "",
//        "grade": null,
//        "uploadDate": null
//     }
// }

//const idEntregable=1;
const maxFiles = 1;

let estadoDoc= "";
let estadoEva = "";
let comentarioCalificado="";
let comentarioDoc="";
let idDelivResponse=0;


export default function DeliverablesStudent(){
    const {user} = useAuth();
    const idEntregable = Number(useParams().code)

    if(!user) {
        window.location.href = "/";
    }
    //let estadoDoc= "E";//"N" no entregado, "E" entregado
    //let estadoEva = "P";//"A" es aprobado, "O" es observado, , "P" pendiente de aprobación
    const [fileList, setFileList] = useState([])
    const [docs, setDocs] = useState([])
    const [studentDocs, setStudentDocs] = useState([])
    const [data, setData] = useState({})
    console.log("user",user);
    useEffect(()=> {
        console.log(user.idPersona,idEntregable)
        getDeliverableStudent(user.idPersona,idEntregable).then(response => {
            if(response.success) {
                console.log("response",response);
                setData(response.data.valor);
            }
        })
    }, [setData])

    useEffect(() => {
        getAllDocsApi(`1-${user.fidEspecialidad}-ENT${idEntregable}`, 0).then(response => {
            if(response.success) {
                setDocs(response.docs)
            }
        })
    },[setDocs])
    
    useEffect(() => {
        getAllDocsApi(`1-${user.fidEspecialidad}-ENT${idEntregable}-${user.idPersona}`, 1).then(response => {
            if(response.success) {
                setStudentDocs(response.docs)
            }
        })
    },[setStudentDocs])

    const deliver = async() => {
        
        if(fileList.length === maxFiles) {
            const response = await uploadDocsApi(fileList, `1-${user.fidEspecialidad}-ENT${idEntregable}-${user.idPersona}`, 1);
            const newData = {
                ...data,
                deliverableResponse:{
                    idRespuestaEntregable: data.deliverableResponse.idRespuestaEntregable,
                    docState: "E",
                    evaState: "P",
                    observation: "",
                    grade: 0,
                    uploadDate: "",
                }                
            }
            if(response.success) {
                setDeliverableStudent(newData).then(response => {
                    const typeName = response.success? "success": "error";
                    toast[typeName](response.message, {
                        position: "top-right",
                        autoClose: 3000,
                    });
                    if(response.success) {
                        // console.log("setear",response)
                        window.scrollTo(0, 0);
                        window.location.reload();
                    }
                })              
            }
        }
    }

    console.log("data", data)
    if(data.deliverableResponse) {
        console.log("---->", data.deliverableResponse)
        if(data.deliverableResponse.docState === "S"){
            estadoDoc="fileEmpty";
            comentarioDoc="Archivo no enviado";
        }
        if(data.deliverableResponse.docState === "E"){
            estadoDoc = "success";
            comentarioDoc="Entregado";
        }    
        if(data.deliverableResponse.evaState === "A"){
            estadoEva="success";
            comentarioCalificado="Aprobado";
        }
        if(data.deliverableResponse.evaState === "O"){
            estadoEva = "warning";
            comentarioCalificado="Observado";
        }    
        if(data.deliverableResponse.evaState === "P"){
            estadoEva = "pending";
            comentarioCalificado = "Pendiente de aprobación";
        } 
    } else {
        console.log("estoy dentro del else")
        return null
    }

    
    return(
        data.deliverable &&
        <LayoutBasic>
            <ToastContainer />  
            <div className="container deliverables">
            <div className="row row1" style={{textAlign: "left",marginTop:"25px"}}>
                    <h1>{data.deliverable.name}</h1>
                </div>
                <div className="row normalrow" style={{textAlign: "justify", marginTop:"10px"}}>
                    <p> {data.deliverable.description}   
                    </p>
                </div> 
                <div className="row row1" style={{textAlign: "left",marginTop:"25px"}}>
                    <h2>Estado de la entrega</h2>
                </div>
                <div className="row normalrow" style={{marginTop:"10px"}}>
                    <StateViewer states={[StatesViewType[estadoDoc]("Documentos", comentarioDoc),
                    StatesViewType[estadoEva]("Aprobación", comentarioCalificado)]}/>
                </div>
                <div className="row rows uploadAgreement" >                
                    <FileManagement canUpload={true} docs={studentDocs} maxFiles={maxFiles} fileList={fileList} setFileList={setFileList}/>
                </div>
                <div className="row row1" style={{textAlign: "left",marginTop:"25px"}}>
                    <h2>Observaciones</h2>  
                    <Form>                        
                        <Form.Group className="mb-3" controlId="ControlTextarea1">                            
                            <Form.Control as="textarea" rows={10} />
                        </Form.Group>
                    </Form>                           
                </div>
                <div className="row botonCancelar" style={{marginLeft:"10px",marginTop:"10px",marginBottom:"30px"}}>                    
                    <Button  className="btn btn-sec" style={{width:"20%",marginRight:"50px"}} >Regresar</Button>                   
                    <Button  className="btn btn-pri" style={{width:"20%",marginLeft:"50px"}} onClick={deliver}>Guardar</Button>                  
                </div>
            </div>
        </LayoutBasic>
    )
}