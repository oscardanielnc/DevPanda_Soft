import React from "react";
import {Modal, Button,Form} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import ModalBasic from "./ModalBasic";
import { useState, useEffect } from "react";
import { getAllDocsApi } from "../../api/files";
import ShowFiles from "../FileManagement/ShowFiles";

export default function ModalAgreementRequest (props) {
    const {show, setShow,user,showSm,setShowSm,student} = props;
    const [docs, setDocs] = useState([])
    console.log("alumno",student)
    useEffect(() => {
        getAllDocsApi(`${user.fidProceso}-NCON-${student.idAlumno}`, 0).then(response => {
            if(response.success) {
                setDocs(response.docs)
            }
        })
    },[setDocs])

    // const handleGuardar = async()=>{
    //     //const response=await api();
    //     const typeName = response.success? "success": "error";
    //     console.log(response)
    //     toast[typeName](response.msg, {
    //         position: "top-right",
    //         autoClose: 3000
    //     });
    //     if(response.success){
    //         console.log("Se registra bien",responseReg)
    //         //cambio de modals
    //         setShowSm(true);
    //         setShow(false);
    //     }
    // }

    return(
        <ModalBasic
            show={show}
            setShow={setShow}
            //handlePrimaryAction={handleGuardar}
            title="Solicitud para iniciar sin convenio"
            primaryAction="Enviar Respuesta"
            secundaryAction="Cancelar"
        >
            <Modal.Body>
                <div className="row" style={{textAlign: "left"}}>
                    <p>
                    A continuación se muestra la solicitud del alumno:                        
                    </p>
                    <ShowFiles docs={docs} />
                </div>
            </Modal.Body>
        </ModalBasic>
    )
}
