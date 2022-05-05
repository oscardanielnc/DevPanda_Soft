import React from "react";
import LayoutBasic from "../layouts/LayoutCoordFACI";
import { Button, Form} from "react-bootstrap";
import StateViewer,{StatesViewType} from "../components/StateViewer/StateViewer";
import "./AgreementReview.scss";

export default function(){
    let estadoDoc= "E";//"N" no entregado, "E" entregado
    let estadoEva = "P";//"A" es aprobado, "O" es observado, , "P" pendiente de aprobación
    let comentarioCalificado="";
    let comentarioDoc="";

    if(estadoDoc === "N"){
        estadoDoc="fileEmpty";
        comentarioDoc="Archivo no enviado";
    }
    if(estadoDoc === "E"){
        estadoDoc = "success";
        comentarioDoc="Entregado";
    }    
    if(estadoEva === "A"){
        estadoEva="success";
        comentarioCalificado="Aprobado";
    }
    if(estadoEva === "O"){
        estadoEva = "warning";
        comentarioCalificado="Observado";
    }    
    if(estadoEva === "P"){
        estadoEva = "pending";
        comentarioCalificado = "Pendiente de aprobación";
    }
    return(
        <LayoutBasic>
            <div className="container">
            <div className="row row1" style={{textAlign: "left",marginTop:"25px"}}>
                    <h1>Certificado del taller</h1>
                </div>
                <div className="row normalrow" style={{textAlign: "justify", marginTop:"10px"}}>
                    <p> A continuación suba los documentos solicitados.   
                    </p>
                </div> 
                <div className="row row1" style={{textAlign: "left",marginTop:"25px"}}>
                    <h2>Estado de la entrega</h2>
                </div>
                <div className="row normalrow" style={{marginTop:"10px"}}>
                    <StateViewer states={[StatesViewType[estadoDoc]("Documentos", comentarioDoc),
                    StatesViewType[estadoEva]("Aprobación", comentarioCalificado)]}/>
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