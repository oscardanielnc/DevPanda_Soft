import React from "react";
import {Modal, Button,Form} from 'react-bootstrap';
import { useState,useEffect } from "react";
import { specialtySelectAllApi } from "../../api/specialty";
import FileManagement from "../../components/FileManagement/FileManagement";

const maxFiles = 1;
export default function ModalNoAgreement (props) {
    const {show, setShow,user} = props;
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
    return (
        <Modal
            size="lg"
            show={show}
            onHide={()=>setShow(false)}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
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
            <Button variant="primary" disabled>
                Enviar Solicitud
            </Button>
            </Modal.Footer>
        </Modal>
    )
}