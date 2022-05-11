import React,{ useState } from "react";
import LayoutCoordFACI from "../layouts/LayoutCoordFACI";
import StateViewer,{StatesViewType} from "../components/StateViewer/StateViewer";
import DocumentPlusIcon from "../components/DocumentPlusIcon/DocumentPlusIcon";
import { Button, Form} from "react-bootstrap";
import Convenio from "../asserts/img/pdf/Convenio.pdf"
import "./AgreementReview.scss";
import FileManagement from "../components/FileManagement/FileManagement";

// "fileData" : {           
//     //TO DO
// },

// "fileReview" :{
//     //TO DO
// },

const dataDummy = {
    "faciState" : "Aprobado", // consumir API GET "Aprobado,Pendiente de revision, Observado"
    "espState" : "Pendiente de revision",// consumir API GET "Aprobado,Pendiente de revision, Observado"
    "reviewCoord" :{
        "documentState" : "Observado", //"Aprobado,Pendiente de revision, Observado"
       "observations" : "JIANFRANCO",           
    }
}

export default function AgreementReview (){      
        

    const [data, setData] = useState(dataDummy);

    const  save = e => {
		e.preventDefault();//Permite ya no recargar el formulario
		//console.log(data);
	};

    /* --- */
    let pass=(data.reviewCoord.documentState==="Aprobado")?true:false;
    let pending=(data.reviewCoord.documentState==="Pendiente de revision")?true:false;
    let observed=(data.reviewCoord.documentState==="Observado")?true:false;

    const changeStatePassed = e => {
        pass=!pass;
        setData({
            ...data,            
            reviewCoord: {
                ...data.reviewCoord,
                documentState : "Aprobado"
            }
        })
    }

    const changeStatePending = e => {
        pending=!pending;
        setData({
            ...data,            
            reviewCoord: {
                ...data.reviewCoord,
                documentState : "Pendiente de revision"
            }
        })
    }
    
    const changeStateObserved = e => {
        observed=!observed;
        setData({
            ...data,            
            reviewCoord: {
                ...data.reviewCoord,
                documentState : "Observado"
            }
        })
    }

    const changeComments = e => {
        setData({
            ...data,
            reviewCoord: {
                ...data.reviewCoord,
                [e.target.name]: e.target.value
            }
        })
    }


    /* --- */

    let typeApprovalStateFACI = "";
    switch(data.faciState) {
        case "Observado": typeApprovalStateFACI = "warning"; break;
        case "Aprobado": typeApprovalStateFACI = "success"; break;
        case "Pendiente de revision": typeApprovalStateFACI = "pending"; break;        
        default: typeApprovalStateFACI = "error"; break;
    }
    let typeApprovalStateEsp = "";
    switch(data.espState) {
        case "Observado": typeApprovalStateEsp = "warning"; break;
        case "Aprobado": typeApprovalStateEsp = "success"; break;
        case "Pendiente de revision": typeApprovalStateEsp = "pending"; break;        
        default: typeApprovalStateEsp = "error"; break;
    }


    return (
        <LayoutCoordFACI>
           <div className="container principalFinalReview" style={{"padding":"1px"}} onSubmit={save} >               
                <div className="row titulo" style={{textAlign: "left",marginTop:"25px",}}>
                    <h1>Revisión de Convenio</h1>
                </div>
                <div className="shadowbox">
                    <div className="row normalrow" style={{textAlign: "justify", marginTop:"10px"}}>
                        <p style={{marginTop:"15px"}}>
                            Aquí podrá revisar el convenio y plan de aprendizaje del alumno(a). 
                            Podrá descargar los archivos enviados dando click en los mismos o podrá verlos presionando el boton
                            a la derecha de los mismos. Luego de ello, podrá dar decidir si aprueba los documentos o en todo caso 
                            ingresar una observación de los mismos. Para finalizar la revisión, presione el boton Guardar.   
                        </p>
                    </div> 
                </div>
                <div className="shadowbox">
                    <div className="row row1" style={{textAlign: "left",marginTop:"25px"}}>
                        <h2 className="subtitulo">Estado de la revisión</h2>
                    </div>
                    <div className="row normalrow" style={{marginTop:"10px"}}>
                        <StateViewer states={[StatesViewType[typeApprovalStateFACI]("Aprobación FACI", data.faciState),
                        StatesViewType[typeApprovalStateEsp]("Aprobación Especialidad", data.espState)]}/>
                    </div>
                </div>
                <div className="shadowbox">
                    <div className="row row1" style={{textAlign: "left",marginTop:"25px"}}>
                        <h2 className="subtitulo">Documentos enviados</h2>                    
                    </div>
                    <div className="row normalrow" style={{marginLeft:"10px"}}>
                        <DocumentPlusIcon name="Convenio Oscar Navarro.pdf" url={Convenio}/>
                        <Button variant="primary" size="sm" style={{width: "100px",marginTop:"5px", marginLeft:"101px"}}>Visualizar</Button>{' '}
                    </div>
                    <div className="row normalrow" style={{marginLeft:"10px",marginTop:"10px"}}>
                        <DocumentPlusIcon name="Plan de Aprendizaje Oscar Navarro.pdf" url={Convenio}/>
                        <Button variant="primary" size="sm" style={{width: "100px", marginTop:"5px",marginLeft:"30px"}}>Visualizar</Button>{' '}
                    </div>
                </div>
                <div className="shadowbox">
                    <div className="row row1" style={{textAlign: "left",marginTop:"30px"}}>
                        <h2 className="subtitulo">Estado de los documentos</h2>                    
                    </div>
                    <div className="row row1" style={{textAlign: "left",marginTop:"30px"}}>                   
                        <Form>
                            {['radio'].map((type) => (
                                <div key={`inline-${type}`} className="mb-3">
                                    <Form.Check
                                        inline
                                        label="Aprobado"
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-1`}
                                        checked={pass}
                                        onChange={changeStatePassed}
                                    />
                                    <Form.Check
                                        inline
                                        label="Observado"
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-2`}
                                        checked={observed}
                                        onChange={changeStateObserved}
                                    />
                                    <Form.Check
                                        inline                                    
                                        label="Pendiente de revisión"
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-3`}
                                        checked={pending}
                                        onChange={changeStatePending}
                                    />
                                </div>
                            ))}
                        </Form>
                    </div>
                </div>
                <div className="shadowbox">
                    <div className="row row1" style={{textAlign: "left",marginTop:"25px"}}>                                       
                        <FileManagement name="Documentos a enviar al alumno"/>                        
                    </div>
                </div>
                <div className="shadowbox">
                    <div className="row row1" style={{textAlign: "left",marginTop:"25px"}}>
                        <h2 className="subtitulo">Observaciones</h2>  
                        <Form>                        
                            <Form.Group className="mb-3" controlId="ControlTextarea1">                            
                                <Form.Control 
                                    as="textarea" 
                                    rows={10} 
                                    value = {data.reviewCoord.observations}
                                    onChange = {changeComments}                                    
                                />
                            </Form.Group>
                        </Form>                           
                    </div>
                </div>
                <div className="row botones" style={{marginLeft:"10px"}}>                    
                    <Button  className="btn btn-sec" style={{width:"20%",marginRight:"50px"}}>Regresar</Button>                   
                    <Button  className="btn btn-pri" style={{width:"20%",marginLeft:"50px"}}>Guardar</Button>                  
                </div>           
            </div>   
        </LayoutCoordFACI>
    );
}
