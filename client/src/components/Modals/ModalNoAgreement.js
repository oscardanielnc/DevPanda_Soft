import React from "react";
import {Modal, Button,Form} from 'react-bootstrap';
import { useState,useEffect } from "react";
import { specialtySelectAllApi } from "../../api/specialty";
import FileManagement from "../../components/FileManagement/FileManagement";
import ModalNoAgreementMail from "./ModalNoAgreementMail"
import { ToastContainer, toast } from 'react-toastify';
import {uploadDocsApi } from "../../api/files";
import {registerRequestApi,verifyRequest} from "../../api/request";
import ModalBasic from "./ModalBasic";

const maxFiles = 1;
export default function ModalNoAgreement (props) {
    const {show, setShow,user,showSm,setShowSm} = props;
    const [fileList, setFileList] = useState([]);
    const prueba = async()=>{
        const responseVerify = await verifyRequest(user.idPersona);
        if(responseVerify.data.conSolicitud){
            toast.warning(`Ya haz registrado una solicitud anteriormente.`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else{
            setShowSm(true);
            setShow(false);
        }
        console.log("Tiene solicitud:",responseVerify.data.conSolicitud);


    }
    const handleEnviar = async () =>{
        if(fileList.length === maxFiles) {
            const responseVerify = await verifyRequest(user.idPersona);
            if(responseVerify.success){
                if(responseVerify.data.conSolicitud){
                    toast.warning(`Ya haz registrado una solicitud anteriormente.`, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                else{
                    const response = await uploadDocsApi(fileList, `1-${user.fidEspecialidad}-NOCONV-${user.idPersona}`, 1);
                    if(response.success) {
                        const responseReg = await registerRequestApi(user);
                        if(responseReg.success){
                            //cambio de modals
                            setShowSm(true);
                            setShow(false);
                        }
                        else{
                            toast.error(responseReg.msg, {
                                position: "top-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        }
                    } else {
                        toast.error(response.msg, {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                }
            }
            else{
                toast.error(responseVerify.msg, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }

            }
            else {
                toast.warning(`Se requieren ${maxFiles} archivos para esta entrega.`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            
        }

       
    }
    return (
      
        <ModalBasic
            show={show}
            setShow={setShow}
            handlePrimaryAction={handleEnviar}
            title="Comenzar proceso sin Convenio ni Plan de Aprendizaje"
            primaryAction="Enviar Solicitud"
            secundaryAction="Cancelar"
        >
            <ToastContainer/>
            <Modal.Body>
                <div className="row" style={{textAlign: "left"}}>
                        <p>
                        Por favor, ingrese el motivo por el cúal no cuenta con ambos documentos                        
                        </p>
                </div>
                <div className="row uploadAgreement" >                
                    <FileManagement canUpload={true}  maxFiles={maxFiles} fileList={fileList} setFileList={setFileList}/>
                </div>
            </Modal.Body>
        </ModalBasic>
    )
}