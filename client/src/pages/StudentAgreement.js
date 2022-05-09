import React, {useState} from "react";
import LayoutBasic from "../layouts/LayoutBasic";
import DocumentPlusIcon from "../components/DocumentPlusIcon/DocumentPlusIcon";
import StateViewer,{StatesViewType} from "../components/StateViewer/StateViewer";
import CompUpload from "../components/Single/CompUpload";
import { Button } from "react-bootstrap";
import "./StudentAgreement.scss";
import { Link } from "react-router-dom";
import Convenio from "../asserts/img/pdf/Convenio.pdf"

export default function StudentAgreement () {
    const [doc, setDoc] = useState({
        name: "Formato Convenio",
        file: null
    })

    const[entregado,setEntregado]=useState(true);
    let tipoEntrega;
    let comentarioEntrega="";
    if(entregado==false){
        tipoEntrega="success";
        comentarioEntrega="Entregado";
    }else{
        tipoEntrega="fileEmpty";
        comentarioEntrega="Sin entregar";
    }
    let estadoCalificado= "N";//"A" es aprobado, "O" es observado, "D" es desaprobado, "N" es no calificado
    let comentarioCalificado="";
    
    if(estadoCalificado=="A"){
        estadoCalificado="success";
        comentarioCalificado="Aprobado";
    }
    if(estadoCalificado=="O"){
        estadoCalificado="warning";
        comentarioCalificado="Observado";
    }
    if(estadoCalificado=="D"){
        estadoCalificado="success";
        comentarioCalificado="Desaprobado";
    }
    if(estadoCalificado=="N"){
        estadoCalificado="pending";
        comentarioCalificado="Sin entrega";
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
                <div className="shadowbox">
                    <div className="row rows" style={{textAlign: "left"}}>
                        <p>
                        Aquí podras ingresar tu convenio y plan de aprendizaje, una vez esten firmados por tu empresa y por ti, para que la universidad lo revise y puedas obtener la aprobación de los mismos. Adicionalmente, debes de completar la información que se solicita en el apartado “Información sobre el convenio”. 
                        </p>
                    </div>
                        <div className="row" style={{"margin-left": "1.3em"}}>
                        <p>
                        A continuación se presenta el modelo para convenio y plan de aprendizaje:
                        </p>
                    </div>
                    <div className="row"  style={{"margin-left": "1.3em"}}>                                
                        <DocumentPlusIcon name={doc.name} url ={Convenio}/>
                    </div>    
                    <div className="row"  style={{"margin-left": "1.3em"}}>                                
                        <DocumentPlusIcon name={"Formato Plan de aprendizaje"} url ={Convenio}/>
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
                                    StatesViewType[tipoEntrega]("Documentos", comentarioEntrega),
                            StatesViewType[estadoCalificado]("Aprobación", comentarioCalificado)]}/>
                    </div>
                </div>
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