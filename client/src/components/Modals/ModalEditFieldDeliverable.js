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
import './ModalEditFieldDeliverable.scss';
import { editFieldInscriptionForm } from "../../api/registrationForm";
import useAuth from "../../hooks/useAuth";

const dataDummy = {
    idField:1,
    idEntregable:2,
    nameField: "Nombre",
    obligatorio: ""
}
const maxFiles = 1;
let saved=false;
let obligatorio=true;
export default function ModalEditFieldDeliverable (props) {
    const {show, setShow,data,setData} = props;
    const {user} = useAuth();

    let typeUser=user.tipoPersona;
    if(typeUser==="p"){
        typeUser=user.tipoPersonal;
    }
    console.log("La data es: ",data);
    obligatorio=data.obligatorio==="obligatorio"?true:false;
    //console.log("El obligatorio es: ",obligatorio);
    const handleEnviar = async e =>{
        e.preventDefault();
        let response=null;
        const objeto={
            idEntregable:data.idEntregable,
            idField:data.idField,
            idEspecialidad: user.fidEspecialidad,
            nameField:data.nameField,
            obligatorio:data.obligatorio,
            idProceso:user.fidProceso
        }
        //response = await editFieldInscriptionForm(objeto);
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
            saved=true;
            //setShow(false);
            window.location.reload();
        }
    }
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeCheck = (e) => {
        obligatorio=!obligatorio;
        if(data.obligatorio==="obligatorio"){
            setData({
                ...data,
                obligatorio: "opcional"
            })
        }else{
            setData({
                ...data,
                obligatorio: "obligatorio"
            })
        }
    }

    return (
        <ModalBasic
            show={show}
            setShow={setShow}
            handlePrimaryAction={handleEnviar}
            title="Editar campo del deliverable"
            primaryAction="Guardar"
            secundaryAction="Cancelar"
        >
            <Modal.Body>
                <div className="row rows" style={{"paddingTop":"10px !important"}}>
                    <div className="col-sm-4 subtitles">
                        Nombre del Campo: 
                    </div>
                    <div className="col-sm-8 subtitles">
                        <Form.Control placeholder={"Ingrese el nombre del camp"}
                        onChange={handleChange}
                        disabled={saved}
                        value={data.nameField}
                        name="nameField"/>
                    </div>
                </div>
                <div className="row Opciones">
                    <Form>
                        <div key={`inline-radio`} className="mb-3">
                        <Form.Check
                            inline
                            label="Obligatorio"
                            name="Obligatorio"
                            type="radio"
                            checked={obligatorio}
                            disabled={saved}
                            id={`inline-radio-1`}
                            onChange={handleChangeCheck}
                        />
                        <Form.Check
                            inline
                            label="Opcional"
                            name="Opcional"
                            type="radio"
                            checked={!obligatorio}
                            disabled={saved}
                            id={`inline-radio-2`}
                            onChange={handleChangeCheck}
                        />
                        </div>
                    </Form>
                </div>
            </Modal.Body>
        </ModalBasic>
    )
}