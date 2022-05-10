import React from "react";
import LayoutBasic from "../layouts/LayoutBasic";
import StateViewer,{StatesViewType} from "../components/StateViewer/StateViewer";
import DocumentPlusIcon from "../components/DocumentPlusIcon/DocumentPlusIcon";
import { Button, Form} from "react-bootstrap";
import Convenio from "../asserts/img/pdf/Convenio.pdf";

import "./FinalReport.scss";
import FileManagement from "../components/FileManagement/FileManagement";

export default function AgreementReview(){    
    const nota=20; 
    return (
        <LayoutBasic>
            <div className="container principalFinalReport" style={{"padding":"1px"}}>
                <div className="row titulo" style={{textAlign: "left",marginTop:"25px",}}>
                        <h1>Entrega de Informe</h1>
                </div>
                <div className="shadowbox">
                    <div className="row normalrow" style={{textAlign: "justify", marginTop:"10px"}}>
                        <p style={{marginTop:"15px"}}>
                        Aquí deberá entregar la versión final de su informe de PSP para que pueda ser revisada por su supervisor. 
                        También, deberá de adjuntar la Carta de Conformidad de la Empresa debidamente completada. 
                        Adicionalmente, debe de completar la información que se solicita en el apartado “Información sobre el Informe”.    
                        <br></br>
                        <br></br>
                        A continuación se presentan la <b>Guía de Elaboración del Informe </b>, el <b>Modelo del Informe del Practicante</b> y la <b>Carta de Conformidad de la Empresa.</b>                           
                        </p>
                    </div>
                    <div className="row normalrow" style={{marginLeft:"10px"}}>
                        <DocumentPlusIcon name="Guía de Elaboración del Informe.pdf" url={Convenio}/>                       
                    </div>
                    <div className="row normalrow" style={{marginLeft:"10px"}}>
                        <DocumentPlusIcon name="Modelo del Informe del Practicante.pdf" url={Convenio}/>                       
                    </div> 
                    <div className="row normalrow" style={{marginLeft:"10px"}}>
                        <DocumentPlusIcon name="Carta de Conformidad de la Empresa.pdf" url={Convenio}/>                       
                    </div> 
                </div>
                <div className="shadowbox">
                    <div className="row row1" style={{textAlign: "left",marginTop:"25px"}}>
                        <h2 className="subtitulo">Estado de la entrega</h2>
                    </div>
                    <div className="row normalrow" style={{marginTop:"10px"}}>
                        <StateViewer states={[StatesViewType["fileEmpty"]("Estado de documentos", "Sin entregar"),
                        StatesViewType["success"]("Aprobación Especialidad", "Sin entregar")]}/>
                    </div>
                </div>
                <div className="shadowbox">
                    <div className="row row1" style={{textAlign: "left",marginTop:"25px"}}>                                       
                        <FileManagement name="Archivos subidos"/>                        
                    </div>
                </div>
                <div className="shadowbox">
                    <div className="row row1" style={{textAlign: "left",marginTop:"25px"}}>
                        <h2 className="subtitulo">Información sobre el nforme</h2>
                        <h4 className="subSubtitulo">Sobre la empresa</h4>
                        <div className="wordAndTextBoxFirst">  
                            <div className="col-sm-5 subtitles">
                                <h6 style={{marginTop:"9px"}}>Sector económico:</h6> 
                            </div>
                            <div className="col-sm-7 subtitles">
                                <Form.Control  style={{width: "100%"}} type="text" placeholder="Ingrese el sector económico de la empresa." />
                            </div>                   
                        </div> 
                        <div className="wordAndTextBox">  
                            <div className="col-sm-5 subtitles">
                                <h6 style={{marginTop:"9px"}}>Principal producto o servicio ofrecido:</h6> 
                            </div>
                            <div className="col-sm-7 subtitles">
                                <Form.Control  style={{width: "100%"}} type="text" placeholder="Ingrese el principal producto o servicio ofrecido por la empresa." />
                            </div>                   
                        </div>  
                        <div className="wordAndTextBox">  
                            <div className="col-sm-5 subtitles">
                                <h6 style={{marginTop:"9px"}}>Área de influencia:</h6> 
                            </div>
                            <div className="col-sm-7 subtitles">
                                <Form.Control  style={{width: "100%"}} type="text" placeholder="Ingrese el area de influencia de la empresa." />
                            </div>                   
                        </div>  
                        <h4 className="subSubtitulo">Sobre la práctica</h4>    
                        <div className="wordAndTextBoxFirst">  
                            <div className="col-sm-4 subtitles">
                                <h6 style={{marginTop:"9px",textAlign:"justify"}}>Rama de la Ingeniería Informática en la que se desempeñó:</h6> 
                            </div>  
                            <div className="col-sm-7 subtitles">
                            <Form.Select aria-label="Default select example">
                                <option>Seleccione su rama</option>
                                <option value="1">Ingeniería de Software</option>
                                <option value="2">Tecnologías de Información</option>
                                <option value="3">Sistemas de Información</option>
                                <option value="4">Ciencias de la Computación</option>
                                <option value="5">Análisis de Datos</option>
                                </Form.Select>                           
                            </div>                                           
                        </div> 
                        <div className="wordAndTextBox">  
                            <div className="col-sm-4 subtitles">
                                <h6 style={{marginTop:"9px",textAlign:"justify"}}>¿Considera que lo aprendido en la universidad contribuyó para que pueda tener un buen desempeño durante sus prácticas?:</h6> 
                            </div>
                            <div className="col-sm-7" style={{marginTop:"7px"}}>
                                <p>Donde 1 es no me sirvió mucho y 5 es me sirvió mucho, elija:</p>
                                <Form>
                                {['radio'].map((type) => (
                                    <div key={`inline-${type}`} className="mb-3">
                                        <Form.Check
                                            className="checkboxes"
                                            inline
                                            label="1"
                                            name="group1"
                                            type={type}
                                            id={`inline-${type}-1`}
                                        />
                                        <Form.Check
                                            className="checkboxes"
                                            inline
                                            label="2"
                                            name="group1"
                                            type={type}
                                            id={`inline-${type}-2`}
                                        />
                                        <Form.Check
                                            className="checkboxes"
                                            inline                                    
                                            label="3"
                                            name="group1"
                                            type={type}
                                            id={`inline-${type}-3`}
                                        />
                                        <Form.Check
                                            className="checkboxes"
                                            inline                                    
                                            label="4"
                                            name="group1"
                                            type={type}
                                            id={`inline-${type}-4`}
                                        />
                                        <Form.Check
                                            className="checkboxes"
                                            inline                                    
                                            label="5"
                                            name="group1"
                                            type={type}
                                            id={`inline-${type}-5`}
                                        />
                                    </div>
                                ))}
                                </Form>
                            </div>                   
                        </div>                               
                    </div>
                </div> 
                <div className="shadowbox">
                    <div className="row row1" style={{textAlign: "left",marginTop:"25px"}}>
                        <h2 className="subtitulo">Documentos de retroalimentación</h2>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>    
                        <br></br> 
                        <br></br>                     
                    </div>                    
                </div>       
                <div className="shadowbox">
                    <div className="row row1" style={{textAlign: "left",marginTop:"25px"}}>
                        <h2 className="subtitulo">Comentarios de la entrega</h2>
                        <Form>                        
                            <Form.Group className="mb-3" controlId="ControlTextarea1">                            
                                <Form.Control as="textarea" rows={5} />
                            </Form.Group>
                        </Form>                       
                    </div>                    
                </div>
                <div className="shadowbox">
                    <div className="row row1" style={{textAlign: "left",marginTop:"25px"}}>
                        <h2 className="subtitulo">Calificación</h2>
                        {/* <p>Aún no se le asigna una calificación.</p> */}
                        <h4 className="nota">{nota} / 20</h4>
                    </div>                    
                </div>
                <div className="row botones" style={{marginLeft:"10px"}}>                            
                    <Button  className="btn btn-pri" style={{width:"30%",marginLeft:"50px"}}>Entregar</Button>                  
                </div>                            
            </div>
        </LayoutBasic>
    );
}
