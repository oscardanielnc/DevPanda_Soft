import React from "react";
import {Modal, Button,Form} from 'react-bootstrap';
import { useState,useEffect } from "react";
import FileManagement from "../../components/FileManagement/FileManagement";
import ModalNoAgreementMail from "./ModalNoAgreementMail"
import { ToastContainer, toast } from 'react-toastify';
import {getAllDocsApi,uploadDocsApi } from "../../api/files";
import {registerRequestApi,verifyRequest} from "../../api/request";
import { useParams } from "react-router-dom";
import PandaLoaderPage from "../../pages/General/PandaLoaderPage";
import { isNotEmptyObj } from "../../utils/objects";
import ShowFiles from "../../components/FileManagement/ShowFiles";
import ModalBasic from "./ModalBasic";
import './ModalNoAgreementReview.scss';
import useAuth from "../../hooks/useAuth";
import { getstudentInscriptionForm } from "../../api/registrationForm";
const dataDummy = {
    "idSolicitud":"",
    "idAlumno":"",
    "estado": "",
    "nombreAlumno": "",
    "codigo":""
}
const maxFiles = 1;
let savedCoordinator=false;

export default function ModalNoAgreementReview (props) {
    const {show, setShow,data,setData,files,setFiles} = props;
    const {user} = useAuth();
    const idAlumno= data.idAlumno;
    const [loading, setLoading] = useState(false);
    //const [data,setData]=useState(dataDummy);
    console.log("El data en ModalNoAgreementReview es : ",data);

    let typeUser=user.tipoPersona;
    if(typeUser==="p"){
        typeUser=user.tipoPersonal;
    }

    let pass=(data.estado==="Aprobado")?true:false;
    let disapproved=(data.estado==="Desaprobado")?true:false;
    let unrated=(data.estado==="Sin revisar")?true:false;

    const changeStatePassed = e => {
        pass=!pass;
        setData({
            ...data,
            estado: "Aprobado"
        })
    }

    const changeStateUnrated = e => {
        unrated=!unrated;
        setData({
            ...data,
            estado: "Sin revisar"
        })
    }
    
    const changeStateDisapproved = e => {
        disapproved=!disapproved;
        setData({
            ...data,
            estado: "Desaprobado"
        })
    }
    
    const handleEnviar = async e =>{
        e.preventDefault();
        let response=null;

        //response = await registrationNoAgreementReview(dataReviewCopy.estado,idAlumno,user.fidProceso);
        if(!response.success){
            toast.error(response.msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }else{
            toast.success(response.msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            savedCoordinator=true;
            //setData(dataReviewCopy)
        }
    }
    let texto= "Alumno: "+data.nombreAlumno;
    let texto2="Código: "+data.codigo;

    return (
        <ModalBasic
            show={show}
            setShow={setShow}
            handlePrimaryAction={handleEnviar}
            title="Comenzar proceso sin Convenio ni Plan de Aprendizaje"
            primaryAction="Registrar Calificación"
            secundaryAction="Cancelar"
        >
            <Modal.Body>
                <div className="row rowsNoAgreementReview" style={{textAlign: "left"}}>
                    {texto}
                </div>
                <div className="row rowsNoAgreementReview" style={{textAlign: "left"}}>
                    {texto2}
                </div>
                <div className="row rowsNoAgreementReviewRaddio" style={{textAlign: "left"}}>
                    <div className="col-sm-1 subtitlesDeleteFieldDeleteField">
                        <div className="texts">Estado:</div>
                    </div>
                    <div className="col-sm-11 subtitlesDeleteField">
                        <Form>
                            <div key={`inline-radio`} className="mb-3 rowRaddioNoAgreement">
                            <Form.Check
                                className="raddioNoAgreement"
                                inline
                                label="Aprobado"
                                name="Aprobado"
                                type="radio"
                                disabled={savedCoordinator}
                                id={`inline-radio-1`}
                                checked={pass}
                                onChange={changeStatePassed}
                            />
                            <Form.Check
                                className="raddioNoAgreement"
                                inline
                                label="Desaprobado"
                                name="Desaprobado"
                                type="radio"
                                id={`inline-radio-3`}
                                disabled={savedCoordinator}
                                checked={disapproved}
                                onChange={changeStateDisapproved}
                            />
                            <Form.Check
                                className="raddioNoAgreement"
                                inline
                                label="Sin revisar"
                                name="SinRevisar"
                                type="radio"
                                id={`inline-radio-3`}
                                disabled={savedCoordinator}
                                checked={unrated}
                                onChange={changeStateUnrated}
                            />
                            </div>
                        </Form>
                    </div>
                </div>
                <div className="row uploadAgreement" >        
                    <ShowFiles docs={files}/>
                    <FileManagement canUpload={false}  maxFiles={maxFiles} files={files} setfiles={setFiles} titleUpload="Archivos subidos por el alumno" titleUploadedFiles="Archivos subidos por el alumno"/>
                </div>
            </Modal.Body>
        </ModalBasic>
    )
}