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
import './ModalDeleteFieldInscription.scss';
import { deleteFieldInscriptionForm } from "../../api/registrationForm";
import useAuth from "../../hooks/useAuth";
import successImg from "../../assets/png/Logowarning.png";

const dataDummy = {
    "nameField": "",
    "seccion": ""
}

export default function ModalDeleteFieldInscription (props) {
    const {show, setShow,data,setData} = props;
    const {user} = useAuth();
    const idAlumno= useParams().idStudent;
    let typeUser=user.tipoPersona;
    if(typeUser==="p"){
        typeUser=user.tipoPersonal;
    }
    console.log("La data es: ",data);

    //console.log("El obligatorio es: ",obligatorio);
    const handleEliminar = async e =>{
        e.preventDefault();
        let response=null;
        const objeto={
            idCampo:data.idField
        }
        response = await deleteFieldInscriptionForm(objeto);
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
            //setShow(false);
            window.location.reload();
        }
    }

    
    return (
        <ModalBasic
            show={show}
            setShow={setShow}
            handlePrimaryAction={handleEliminar}
            title="Eliminar campo Ficha de Inscripción"
            primaryAction="Eliminar"
            secundaryAction="Cancelar"
        >
            <Modal.Body>
                <div className="row rows" style={{"paddingTop":"10px !important"}}>
                    <div className="col-sm-4 subtitles">
                        <img className="imageWarning" alt="Imagen" src={successImg}></img>
                    </div>
                    <div className="col-sm-8 subtitles textDelete">
                        <div>¿Está seguro de querer eliminar el campo?</div>
                        <div>Una vez aceptada la eliminación no se va a poder deshacer la acción</div>
                    </div>
                </div>
                
            </Modal.Body>
        </ModalBasic>
    )
}