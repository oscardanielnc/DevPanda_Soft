import React, {useState,useEffect} from "react";
import LayoutBasic from "../layouts/LayoutBasic";
import { Button, Form} from "react-bootstrap";
import StateViewer,{StatesViewType} from "../components/StateViewer/StateViewer";
import "./AgreementReview.scss";
import FileManagement from "../components/FileManagement/FileManagement";
import { getDeliverableStudent, setDeliverableStudent } from "../api/deliverables";
import useAuth from "../hooks/useAuth";
import { getAllDocsApi, uploadDocsApi } from "../api/files";

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

const idEntregable=1;
const maxFiles = 1;

let estadoDoc= "";
let estadoEva = "";
let comentarioCalificado="";
let comentarioDoc="";
let idDelivResponse=0;


export default function Deliverables(){
    //let estadoDoc= "E";//"N" no entregado, "E" entregado
    //let estadoEva = "P";//"A" es aprobado, "O" es observado, , "P" pendiente de aprobación
    const [fileList, setFileList] = useState([])
    const [docs, setDocs] = useState([])
    const [studentDocs, setStudentDocs] = useState([])
    const {user} = useAuth();
    const [data, setData] = useState({})
    console.log("user",user);
    useEffect(()=> {
        getDeliverableStudent(user.idPersona,idEntregable).then(response => {
            if(response.success) {
                console.log("response",response);
                setData(response.data.valor);
            }
        })
    }, [setData])

    useEffect(() => {
        getAllDocsApi(`1-${user.fidEspecialidad}-DELIV`, 0).then(response => {
            if(response.success) {
                setDocs(response.docs)
            }
        })
    },[setDocs])
    
    useEffect(() => {
        getAllDocsApi(`1-${user.fidEspecialidad}-DELIV-${user.idPersona}`, 1).then(response => {
            if(response.success) {
                setStudentDocs(response.docs)
            }
        })
    },[setStudentDocs])

    const deliver = async() => {
        
        if(fileList.length === maxFiles) {
            const response = await uploadDocsApi(fileList, `1-${user.fidEspecialidad}-DELIV-${user.idPersona}`, 1);
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
                setDeliverableStudent(newdata).then(response => {
                    if(response.success) {
                        console.log(response.msg)
                    }
                })

                window.location.reload()
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