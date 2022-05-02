import React, {useState} from "react";
import LayoutBasic from "../layouts/LayoutBasic";
import {Form,Button,Row,Col,Alert} from 'react-bootstrap';
import { specialtyInsertApi } from "../api/specialty";
import GeneralData from "../components/Charts/GeneralData";
import AboutCompany from "../components/Charts/AboutCompany";
import './StudentRegistrationForm.scss';
import { ToastContainer, toast } from 'react-toastify';
import AboutJob from "../components/Charts/AboutJob";
import AboutDurarionPSP from "../components/Charts/AboutDurationPSP";
import DirectBoss from "../components/Charts/DirectBoss";

export default function StudentRegistrationForm () {
    var result=true;
    var botonPresionado=false;
    var tipo=null;
    const [datos, setDatos] = useState([]);
    const insert = e => {
        

        if(result){
            toast.success("Se insertó de forma correcta", {
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
    return (
        <LayoutBasic>
            <div className="container principal" style={{"padding":"1px"}}>
                <div className="row rows" style={{textAlign: "left"}}>
                    <h1>Ficha de Inscripción</h1>
                </div>
                <div className="row rows" style={{textAlign: "left"}}>
                    <p>
                    Aquí deberá de rellenar la información solicitada más abajo para poder continuar con el proceso. Una vez que la complete, esta será revisada para su aprobación.
                    </p>
                </div>
                <div className="row rows">
                    <p>Aqui va el componente de entrega</p>
                </div>
                <div className="row rows" style={{textAlign: "left",marginBottom:"0px"}}>
                    <h2 style={{marginBottom:"0px"}}>Datos por rellenar</h2>
                </div>
                <div className="row rows">
                <GeneralData data={datos}/>   
                    {/*<TableSpecialtyManagement rows={especialidades}/>*/}
                </div>
                <div className="row rows">
                    <AboutCompany data={datos}/>
                    {/*<TableSpecialtyManagement rows={especialidades}/>*/}
                </div>
                <div className="row rows">
                    <AboutJob data={datos}/>
                    {/*<TableSpecialtyManagement rows={especialidades}/>*/}
                </div>
                <div className="row rows">
                    <AboutDurarionPSP data={datos}/>
                    {/*<TableSpecialtyManagement rows={especialidades}/>*/}
                </div>
                <div className="row rows">
                    <DirectBoss data={datos}/>
                    {/*<TableSpecialtyManagement rows={especialidades}/>*/}
                </div>
                <div className="row rows">
                    <p>Acá va el componente de subida de archivos</p>
                    {/*<TableSpecialtyManagement rows={especialidades}/>*/}
                </div>
                <div className="row rows">
                    <div className="col-sm-4">
                        <Button className="btn btn-primary" onClick={insert}>Enviar</Button>
                        <ToastContainer />
                    </div>
                </div>
            </div>
            
        </LayoutBasic>
    )

}
