import React from "react";
import LayoutCoordFACI from "../layouts/LayoutCoordFACI";
import StateViewer,{StatesViewType} from "../components/StateViewer/StateViewer";
import DocumentPlusIcon from "../components/DocumentPlusIcon/DocumentPlusIcon";
import { Button, Form} from "react-bootstrap";
import Convenio from "../asserts/img/pdf/Convenio.pdf"
import "./AgreementReview.scss";
export default function AgreementReview (){      
    let estadoCalificadoFACI= "A";//"A" es aprobado, "O" es observado, , "P" pendiente de aprobación
    let estadoCalificadoEsp = "P"
    let comentarioCalificado="";

    if(estadoCalificadoFACI === "A"){
        estadoCalificadoFACI="success";
        comentarioCalificado="Aprobado";
    }
    if(estadoCalificadoFACI === "O"){
        estadoCalificadoFACI = "warning";
        comentarioCalificado="Observado";
    }    
    if(estadoCalificadoFACI === "P"){
        estadoCalificadoFACI = "pending";
        comentarioCalificado = "Pendiente de aprobación";
    }
    if(estadoCalificadoEsp === "A"){
        estadoCalificadoEsp="success";
        comentarioCalificado="Aprobado";
    }
    if(estadoCalificadoEsp === "O"){
        estadoCalificadoEsp = "warning";
        comentarioCalificado="Observado";
    }    
    if(estadoCalificadoEsp === "P"){
        estadoCalificadoEsp = "pending";
        comentarioCalificado = "Pendiente de aprobación";
    }
    return (
        <LayoutCoordFACI>
           <div className="container main" style={{"padding":"1px"}}>
               
                <div className="row row1" style={{textAlign: "left",marginTop:"25px"}}>
                    <h1>Revisión de Convenio</h1>
                </div>
                <div className="row normalrow" style={{textAlign: "justify", marginTop:"10px"}}>
                    <p>Aquí podrá revisar el convenio y plan de aprendizaje del alumno(a). 
                        Podrá descargar los archivos enviados dando click en los mismos o podrá verlos presionando el boton
                        a la derecha de los mismos. Luego de ello, podrá dar decidir si aprueba los documentos o en todo caso 
                        ingresar una observación de los mismos. Para finalizar la revisión, presione el boton Guardar.   
                    </p>
                </div> 
                <div className="row row1" style={{textAlign: "left",marginTop:"25px"}}>
                    <h2>Estado de la revisión</h2>
                </div>
                <div className="row normalrow" style={{marginTop:"10px"}}>
                    <StateViewer states={[StatesViewType[estadoCalificadoFACI]("Aprobación FACI", comentarioCalificado),
                    StatesViewType[estadoCalificadoEsp]("Aprobación Especialidad", comentarioCalificado)]}/>
                </div>
                <div className="row row1" style={{textAlign: "left",marginTop:"25px"}}>
                    <h2>Documentos enviados</h2>                    
                </div>
                <div className="row normalrow" style={{marginTop:"10px",marginLeft:"10px"}}>
                    <DocumentPlusIcon name="Convenio Oscar Navarro.pdf" url={Convenio}/>
                    <Button variant="primary" size="sm" style={{width: "100px",marginTop:"5px"}}>Visualizar</Button>{' '}
                </div>
                <div className="row normalrow" style={{marginLeft:"10px",marginTop:"10px"}}>
                    <DocumentPlusIcon name="Plan de aprendizaje Oscar Navarro.pdf" url={Convenio}/>
                    <Button variant="primary" size="sm" style={{width: "100px", marginTop:"5px"}}>Visualizar</Button>{' '}
                </div>
                <div className="row row1" style={{textAlign: "left",marginTop:"50px"}}>
                    <div className="col-sm-4">                  
                        <h2>Estado de los documentos</h2>
                    </div>    
                    <div className="col-sm-7 checkboxes" style={{textAlign: "left",marginTop:"12px"}}>                  
                        <Form>
                            {['radio'].map((type) => (
                                <div key={`inline-${type}`} className="mb-3">
                                <Form.Check
                                    inline
                                    label="Aprobado"
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-1`}
                                />
                                <Form.Check
                                    inline
                                    label="Observado"
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-2`}
                                />
                                <Form.Check
                                    inline                                    
                                    label="Pendiente de revisión"
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-3`}
                                />
                                </div>
                            ))}
                        </Form>
                    </div>                
                </div>
                <div className="row row1" style={{textAlign: "left",marginTop:"25px"}}>
                    <h2>Documentos a enviar al alumno</h2> 
                    <br></br>                           
                    <br></br>  
                    <br></br>  
                    <br></br>
                    <br></br>  
                    <br></br> 
                    <br></br> 
                    <br></br>
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
        </LayoutCoordFACI>
    )
}
