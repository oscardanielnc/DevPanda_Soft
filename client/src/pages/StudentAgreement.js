import React, {useState} from "react";
import LayoutBasic from "../layouts/LayoutBasic";
import DocumentPlusIcon from "../components/DocumentPlusIcon/DocumentPlusIcon";
import StateViewer,{StatesViewType} from "../components/StateViewer/StateViewer";
import CompUpload from "../components/Single/CompUpload";
import { Button } from "react-bootstrap";
import "./StudentAgreement.scss";
import { Link } from "react-router-dom";

export default function StudentAgreement () {
    const [doc, setDoc] = useState({
        name: "Formato Convenio y Plan de aprendizaje",
        file: null
    })

    const[entregado,setEntregado]=useState(true);
    let tipoEntrega;
    let comentarioEntrega="";
    if(entregado==true){
        tipoEntrega="success";
        comentarioEntrega="Entregado";
    }else{
        tipoEntrega="fileEmpty";
        comentarioEntrega="Sin entregar";
    }
    let estadoCalificado= "A";//"A" es aprobado, "O" es observado, "D" es desaprobado, "N" es no calificado
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

    return (
        <LayoutBasic>
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
                </div>
                <div className="row" style={{"margin-left": "1.3em"}}>
                    <p>
                    A continuación se presenta el modelo para convenio y plan de aprendizaje:
                    </p>
                </div>
                <div className="row rows">                                
                    <DocumentPlusIcon name={doc.name}/>
                </div>     
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