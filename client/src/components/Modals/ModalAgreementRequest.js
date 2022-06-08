import React from "react";
import {Modal, Button,Form} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import ModalBasic from "./ModalBasic";
import { useState, useEffect } from "react";
import { getAllDocsApi } from "../../api/files";
import ShowFiles from "../FileManagement/ShowFiles";
import useAuth from "../../hooks/useAuth";

const maxFiles = 1;
let savedCoordinator=false;

export default function ModalAgreementRequest (props) {
    const {show, setShow,data,setData} = props;
    const {user} = useAuth();
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [docs, setDocs] = useState([]);
    const idAlumno= data.idAlumno;
    console.log("alumno",data)

    let typeUser=user.tipoPersona;
    if(typeUser==="p"){
        typeUser=user.tipoPersonal;
    }

    const changeStatePassed = e => {
        pass=!pass;
        data.approvalState="Aprobado"
    }

    const changeStateUnrated = e => {
        unrated=!unrated;
        data.approvalState="Sin revisar"
    }
    
    const changeStateDisapproved = e => {
        disapproved=!disapproved;
        data.approvalState="Sin Desaprobado"
    }

    useEffect(() => {
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
    },[setFileList])

    let pass=(data.approvalState==="Aprobado")?true:false;
    let disapproved=(data.approvalState==="Desaprobado")?true:false;
    let unrated=(data.approvalState==="Sin revisar")?true:false;

    const handleGuardar = async e =>{
        e.preventDefault();
         //const response=await api();
         /*const typeName = response.success? "success": "error";
         console.log(response)
         toast[typeName](response.msg, {
             position: "top-right",
             autoClose: 3000
         });
         if(response.success){
             console.log("Se registra bien",responseReg)
             //cambio de modals
             setShowSm(true);
             setShow(false);
         }*/
    }

    return(
        <ModalBasic
            show={show}
            setShow={setShow}
            handlePrimaryAction={handleGuardar}
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
