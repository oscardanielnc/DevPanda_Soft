import React, {useState} from "react";
import LayoutBasic from "../layouts/LayoutBasic";
import {Form,Button,Row,Col,Alert} from 'react-bootstrap';
import { specialtyInsertApi } from "../api/specialty";
import GeneralData from "../components/Charts/GeneralData";
import AboutCompany from "../components/Charts/AboutCompany";
import './StudentRegistrationForm.scss';
import { ToastContainer, toast } from 'react-toastify';
import AboutJob from "../components/Charts/AboutJob";

export default function StudentRegistrationForm () {
    var result=false;
    var botonPresionado=false;
    var tipo=null;
    const [datos, setDatos] = useState([]);
    const insert = e => {
        toast('🦄Cheka esta maravilla baby!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
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
                    <p>Acá va el componente de Sobre duracion de la PSP</p>
                    {/*<TableSpecialtyManagement rows={especialidades}/>*/}
                </div>
                <div className="row rows">
                    <p>Acá va el componente de Sobre el Jefe Directo</p>
                    {/*<TableSpecialtyManagement rows={especialidades}/>*/}
                </div>
                <div className="row rows">
                    <p>Acá va el componente de Sobre el Jefe Directo</p>
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
