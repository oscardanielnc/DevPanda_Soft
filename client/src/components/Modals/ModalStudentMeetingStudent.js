import React, { useEffect, useState } from "react";
import { Alert, Button, ButtonGroup, Form, FormControl, InputGroup, Modal, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { getAllDocsApi } from "../../api/files";
import { getStudentDate, updateMeetingLink } from "../../api/schedule";
import { getSupervisorByID } from "../../api/users";
import loading from "../../assets/gif/loading.gif"
import useAuth from "../../hooks/useAuth";
import Loading from "../../pages/General/PandaLoading";
import FileManagement from "../FileManagement/FileManagement";
import ShowFiles from "../FileManagement/ShowFiles";
import ModalBasic from './ModalBasic';

import './ModalStudentMeeting.scss';

export default function ModalStudentMeetingStudent (props) {
    
    const {user} = useAuth();
    const {show, setShow, hourModalSelected, idAsesor} = props;

    const [docs, setDocs] = useState([])

    const [linkMeetingToSave, setLinkMeetingToSave] = useState("");

    const regexURL = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
    const [loading, setLoading] = useState(true);
    const [supervisor, setSupervisor] = useState({
        firstname:"",
        lastname:"",
        email:"",
        code: -1
    }); 

    const showToast = ( msg, state = "warning") => {
        toast[state](msg, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    
    const getDocumentsByStudent = ( code ) => { //1-1-ESUP-20172585
        if (code === null) return;
        console.log(`CONSULTANDO documentos de ESUP ${code}`)
        setLoading(true)
        getAllDocsApi(`1-${user.fidEspecialidad}-ESUP`, 0).then(response => {
            setLoading(false)
            if(response.success) {
                setDocs(response.docs)
            }
        })
    }

    useEffect(() => {
        if (props.show && props.hourModalSelected !== null){
            console.log("Se busca los datos del supervisor", idAsesor)
            setLinkMeetingToSave(hourModalSelected.link)
            setLoading(true)
            getSupervisorByID(idAsesor).then(response => {
                setLoading(false)
                console.log(response)
                if(response.success) {
                    setSupervisor(response.data)
                    getDocumentsByStudent(response.data.code)
                }
            })
        }else{
            console.log("Se cierra el modal")
            // Limpiamos la seleccion
            setSupervisor({ firstname:"", lastname:"", email:"", code: -1 })
        }
     }, [props])
     
    const copyEmail = () => {
        if (!supervisor.email) return
        navigator.clipboard.writeText(supervisor.email)
        showToast("Email copiado", "success")
    }
    const sendEmail = () => {
        if (!supervisor.email) return
        // Se abre link en navegador externo
        window.open(`mailto:${supervisor.email}`,'_self');
    }
    const openMeetingLink = () => {
        if (!hourModalSelected.link) return
        // Si no contiene el http le agregamos
        if (!hourModalSelected.link.includes("http")){
            hourModalSelected.link = 'https://' + hourModalSelected.link
        }
        // Se abre link en navegador externo
        window.open(hourModalSelected.link, '_blank');
        setLinkMeetingToSave(hourModalSelected.link ?? "")
    }

    return ( 
        <ModalBasic show={show}
            setShow={setShow}
            title="Detalle de reunion"
        >
            <ToastContainer />  
            {
                loading && <>
                    <Loading tiny={true}/>
                </>
            }
            {
                !loading && supervisor &&
                <Form className="modalStudentManagement">
                    { (supervisor.firstname || supervisor.lastname) && <InputLabel name="Supervisor" value={`${supervisor.firstname} ${supervisor.lastname}`} readOnly/> }
                    { supervisor.email && 
                        <Form.Group className="modalStudentManagement__formGroup">
                            <Form.Label className="modalStudentManagement__formGroup-label">
                                Correo: 
                            </Form.Label>
                            <InputGroup className="mb-3">
                                <Form.Control className="modalStudentManagement__formGroup-input" type="text" value={supervisor.email} readOnly/>
                                <Button variant="outline-secondary" id="button-addon2" onClick={copyEmail}> Copiar </Button>
                                <Button variant="outline-secondary" id="button-addon2" onClick={sendEmail}> Enviar correo </Button>
                            </InputGroup>
                        </Form.Group> 
                    }
                    <Form.Group className="modalStudentManagement__formGroup">
                        <Form.Label className="modalStudentManagement__formGroup-label">Link de reunion: </Form.Label>
                        <InputGroup className="mb-3">
                            <FormControl value={linkMeetingToSave} readOnly/>
                            {
                                regexURL.test(hourModalSelected.link ?? "") &&
                                <Button variant="outline-secondary" id="button-addon2" onClick={openMeetingLink}> Abrir </Button>
                            }
                        </InputGroup>
                    </Form.Group>  
                    <Form.Group className="modalStudentManagement__formGroup">
                        <Form.Label className="modalStudentManagement__formGroup-label">Consentimiento informado: </Form.Label>
                        <ShowFiles docs={docs} /> 
                    </Form.Group>  
                    { docs.length < 1 && <Alert key={'warning'} variant={'warning'}>Recuerda subir la constancia de consentimiento informado antes de la reunion.</Alert>}
                </Form>

            }
            {
                !loading && !supervisor &&
                <p>Este horario no tiene datos del supervisor, Consulte con el equipo de Soporte</p>
            }
        </ModalBasic>
    )
}

function InputLabel({name, value}) {
    return (
        <Form.Group className="modalStudentManagement__formGroup">
            <Form.Label className="modalStudentManagement__formGroup-label">
                {name}: 
            </Form.Label>
            <Form.Control className="modalStudentManagement__formGroup-input" type="text" value={value} readOnly/>
        </Form.Group> 
    )
}