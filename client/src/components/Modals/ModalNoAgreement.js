import React from "react";
import {Modal, Button,Form} from 'react-bootstrap';
import { useState,useEffect } from "react";
import { specialtySelectAllApi } from "../../api/specialty";
import FileManagement from "../../components/FileManagement/FileManagement";
import ModalNoAgreementMail from "./ModalNoAgreementMail"
import { ToastContainer, toast } from 'react-toastify';
import {uploadDocsApi } from "../../api/files";
import {registerRequestApi} from "../../api/request";

const maxFiles = 1;
export default function ModalNoAgreement (props) {
    const {show, setShow,user,showSm,setShowSm} = props;
    const [specialties, setSpecialties] = useState([]);
    const [data, setData] = useState(user.fidespecialidad);
    const [fileList, setFileList] = useState([]);
    useEffect(()=> {
        const fetchData = async () => {
            const result = await specialtySelectAllApi();
            if(result.success) {
                setSpecialties(result.specialties)
            }
        }
        fetchData()
    }, [setSpecialties])
    const handleSelect = e => {
        setData({
            ...data,
            specialty: Number(e.target.value)
        })
    }
    const handleEnviar = async () =>{
       
            if(fileList.length === maxFiles) {
                const response = await uploadDocsApi(fileList, `1-${user.fidEspecialidad}-NOCONV-${user.idPersona}`, 1);
                if(response.success) {
                    const responseReg = await registerRequestApi();
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
      
        <Modal
            size="lg"
            show={show}
            onHide={()=>setShow(false)}
            backdrop="static"
            keyboard={false}
        >
            <ToastContainer/>
            <Modal.Header closeButton className="modalBasic__header">
                <Modal.Title style={{textAlign: "center"}}>Comenzar proceso sin Convenio ni Plan de Aprendizaje</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row" style={{textAlign: "left"}}>
                        <p>
                        Por favor, ingrese el motivo por el cúal no cuenta con ambos documentos                        
                        </p>
                </div>
                <div className="row" style={{textAlign: "left"}}>
                        <p>
                        Especialidad                      
                        </p>
                        <Form.Select className="select" onChange={handleSelect} style={{marginLeft:"10px", width:"50%" }}>
                                <option value={-1}>Seleccionar especialidad</option>
                                {
                                    specialties.map(element => (
                                        <option value={element.idEspecialidad} 
                                            key={element.idEspecialidad}>{element.nombreEsp}
                                        </option>
                                    ))
                                }
                        </Form.Select>
                </div>
                <div className="row rows uploadAgreement" >                
                    <FileManagement canUpload={true}  maxFiles={maxFiles} fileList={fileList} setFileList={setFileList}/>
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={()=>setShow(false)}>
                Cancelar
            </Button>
            <Button variant="primary" onClick={handleEnviar}>
                Enviar Solicitud
            </Button>
            <ModalNoAgreementMail show={showSm} setShow={setShowSm}></ModalNoAgreementMail>
            </Modal.Footer>
        </Modal>
    )
}