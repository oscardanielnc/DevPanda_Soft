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
import { getstudentInscriptionForm } from "../../api/registrationForm";
const dataDummy = {
    "idStudent":"",
    "approvalState": "",
    "nameStudent": "",
    "codeStudent":""
}
const maxFiles = 1;
let savedCoordinator=false;

export default function ModalNoAgreementReview (props) {
    const {show, setShow,user,showSm,setShowSm} = props;
    const [fileList, setFileList] = useState([]);
    const idAlumno= useParams().idStudent;
    const [loading, setLoading] = useState(false);
    const [data,setData]=useState(dataDummy);
    
    let typeUser=user.tipoPersona;
    if(typeUser==="p"){
        typeUser=user.tipoPersonal;
    }

    let pass=(data.approvalState==="Aprobado")?true:false;
    let disapproved=(data.approvalState==="Desaprobado")?true:false;
    let unrated=(data.approvalState==="Sin revisar")?true:false;

    const changeStatePassed = e => {
        pass=!pass;
        data.approvalState="Aprobado"
    }

    const changeStateUnrated = e => {
        unrated=!unrated;
        data.approvalState="Sin calificar"
    }
    
    const changeStateDisapproved = e => {
        disapproved=!disapproved;
        data.approvalState="Sin revisar"
    }
    useEffect(()=> {
        const fetchData = async () => {
            const result = await getAllDocsApi(`${user.fidProceso}-NCON-${idAlumno}`, 1);
            if(result.success) {
                setFileList(result.docs)
            }

            /*const result2= await  getstudentInfo(idAlumno, user.fidProceso);
            if(result2.success){
                setData(data);
            }*/

            if(data.approvalState!==""&&data.approvalState!==null){
                savedCoordinator=true;
            }else{
                savedCoordinator=false;
            }
            setLoading(true);
        }
        fetchData()
        
    }, [setFileList])

    const handleEnviar = async e =>{
        e.preventDefault();
        let response=null;

        //response = await registrationNoAgreementReview(data.approvalState,idAlumno,user.fidProceso);
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
        }
    }
    let texto= "Alumno: "+data.nameStudent;
    let texto2="Código: "+data.codeStudent;
    if(loading || !isNotEmptyObj(fileList)) return <PandaLoaderPage type={typeUser}/>
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
                <div className="row" style={{textAlign: "left"}}>
                    {texto}
                </div>
                <div className="row" style={{textAlign: "left"}}>
                    {texto2}
                </div>
                <div className="row" style={{textAlign: "left"}}>
                    <div className="col-sm-2 subtitlesDeleteFieldDeleteField">
                        <div className="texts">Estado:</div>
                    </div>
                    <div className="col-sm-10 subtitlesDeleteField">
                        <Form>
                            <div key={`inline-radio`} className="mb-3">
                            <Form.Check
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
                    <ShowFiles docs={fileList}/>
                    <FileManagement canUpload={false}  maxFiles={maxFiles} fileList={fileList} setFileList={setFileList} titleUpload="Archivos subidos por el alumno" titleUploadedFiles="Archivos subidos por el alumno"/>
                </div>
            </Modal.Body>
        </ModalBasic>
    )
}