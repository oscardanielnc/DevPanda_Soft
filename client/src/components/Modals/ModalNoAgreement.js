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
    const [alumno,setAlumno] =useState( {
        fidAlumno:user.idPersona,
        fidEspecialidad:user.fidEspecialidad
    });
    console.log("usuario",user);
    console.log("objeto",alumno);

    // const prueba = async()=>{
    //     const responseVerify = await verifyRequest(user.idPersona);
    //     if(responseVerify.data.conSolicitud){
    //         toast.warning(`Ya haz registrado una solicitud anteriormente.`, {
    //             position: "top-right",
    //             autoClose: 3000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //         });
    //     }
    //     else{
    //         setShowSm(true);
    //         setShow(false);
    //     }



    // }
    const handleEnviar = async () =>{
        //Se verifica que se encuentre la cantidad de archivos necesarios
        if(fileList.length === maxFiles) {
            //Se verifica que la persona ya haya registrado una solicitud con anterioridad 
            const responseVerify = await verifyRequest(user.idPersona);
            if(responseVerify.success){
                console.log("Tiene solicitud:",responseVerify.data.conSolicitud);
                if(responseVerify.data.conSolicitud){
                    toast.warning(`Ya haz registrado una solicitud anteriormente. Proximamente le llegara la respuesta de la especialidad por correo`, {
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
                    //ser realiza la subida de archivo
                    const response = await uploadDocsApi(fileList, `${user.fidProceso}-NCON-${user.idPersona}`, 1);
                    console.log("fidproceso",user.fidProceso);
                    console.log("idpersona",user.idPersona);
                    console.log("subio archivo",response.success)
                    if(response.success) {
                        //se realiza el registro de la solicitud
                        const responseReg = await registerRequestApi(alumno);
                        if(responseReg.success){
                            console.log("Se registra bien",responseReg.success)
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