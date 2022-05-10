import React, {useState,useEffect} from "react";
import LayoutBasic from "../layouts/LayoutBasic";
import { Button, Form} from "react-bootstrap";
import StateViewer,{StatesViewType} from "../components/StateViewer/StateViewer";
import "./AgreementReview.scss";
import CompUpload from "../components/Single/CompUpload";

const dataDummy={
    "idAlumno": 1,    
    "deliverable":{
        "idEntregable": 1,
        "name": "Certificado del Taller",
        "description": "A continuación suba los documentos solicitados.",
        "flagIni": true,
        "fechaIni": "",
        "flagFin": true,
        "fechaFin": "",
        "flagNota": false
    },
    "deliverableResponse":{
        "docState":"E",
        "evaState": "P",
        "observation": "",
    }
}

export default function Deliverables(){
    //let estadoDoc= "E";//"N" no entregado, "E" entregado
    //let estadoEva = "P";//"A" es aprobado, "O" es observado, , "P" pendiente de aprobación
    let estadoDoc= "E";
    let estadoEva = "P";
    let comentarioCalificado="";
    let comentarioDoc="";
    const [data, setData] = useState(dataDummy)

    useEffect(()=> {
        /*
        selectDeliverable(data.idAlumno).then(response => {
            if(response.success) {
                setData(response.data);
            }
        })*/
    }, [setData])

    if(data.deliverableResponse.docState === "N"){
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
    return(
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
                    <CompUpload/>
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
                    <Button  className="btn btn-pri" style={{width:"20%",marginLeft:"50px"}}>Guardar</Button>                  
                </div>
            </div>
        </LayoutBasic>
    )
}