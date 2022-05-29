import React, { useEffect, useState } from "react";
import { Alert, Button, ButtonGroup, Form, FormControl, InputGroup, Modal, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { getAllDocsApi } from "../../api/files";
import { getStudentDate, updateMeetingLink } from "../../api/schedule";
import loading from "../../assets/gif/loading.gif"
import useAuth from "../../hooks/useAuth";
import Loading from "../../pages/General/PandaLoading";
import FileManagement from "../FileManagement/FileManagement";
import ShowFiles from "../FileManagement/ShowFiles";
import ModalBasic from './ModalBasic';

import './ModalStudentMeeting.scss';

export default function ModalStudentMeetingStudent (props) {
    
    const {user} = useAuth();
    const {show, setShow, hourModalSelected} = props;

    const [docs, setDocs] = useState([])

    const [linkMeetingToSave, setLinkMeetingToSave] = useState("");

    const regexURL = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
    const [loading, setLoading] = useState(true);
    const [student, setStudent] = useState({
        firstname:"",
        lastname:"",
        email:"",
        code: 0
    }); 
    
    const updateMeetingLinkByHour = () => {
        console.log(hourModalSelected.id, linkMeetingToSave)
        // Validar que no se vaya a guardar un enlace vacio
        if (linkMeetingToSave === "") {
            showToast("No se puede guardar un link vacio")
            setLinkMeetingToSave(hourModalSelected.link ?? "")
            return
        }

        // Validar formato de url
        if (!regexURL.test(linkMeetingToSave)) {
            showToast("No es un enlace valido")
            setLinkMeetingToSave( regexURL.test(hourModalSelected.link ?? "") ? (hourModalSelected.link ?? "") : "")
            return
        }

        // Validar que no se quiera guardar el mismo link
        if (hourModalSelected.link === linkMeetingToSave){
            showToast("No ha realizado cambios en el enlace de la reunion")
            return 
        }

        setLoading(true)
        updateMeetingLink({
            idHour: hourModalSelected.id,
            link: linkMeetingToSave
        }).then(response => {
            setLoading(false)
            if(response.success) {
                hourModalSelected.link = linkMeetingToSave
            }
            showToast(response.msg, response.success? "success": "error")
        })
    }

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
        console.log(`CONSULTANDO documentos de ${code}`)
        setLoading(true)
        getAllDocsApi(`1-${user.fidEspecialidad}-ESUP-${code}`, 1).then(response => {
            setLoading(false)
            if(response.success) {
                setDocs(response.docs)
            }
        })
    }

    useEffect(() => {
        if (props.show && props.hourModalSelected !== null){
            console.log("Se busca los datos del alumno")
            setLinkMeetingToSave(hourModalSelected.link)
            setLoading(true)
            getStudentDate(hourModalSelected.idAlumno).then(response => {
                setLoading(false)
                if(response.success) {
                    setStudent(response.student)
                    getDocumentsByStudent(response.student.code)
                }
            })
        }else{
            console.log("Se cierra el modal")
            // Limpiamos la seleccion
            setStudent({ firstname:"", lastname:"", email:"", code: 0 })
        }
     }, [props])
     
    const copyEmail = () => {
        if (!student.email) return
        navigator.clipboard.writeText(student.email)
        showToast("Email copiado", "success")
    }
    const sendEmail = () => {
        if (!student.email) return
        // Se abre link en navegador externo
        window.open(`mailto:${student.email}`,'_self');
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
    
    const updateLinkText = e => {
        const link = e.target.value.toLowerCase();
        setLinkMeetingToSave(link)
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
                !loading && student &&
                <Form className="modalStudentManagement">
                    { student.code && <InputLabel name="Codigo PUCP" value={student.code} readOnly/> }
                    { student.firstname && <InputLabel name="Nombres" value={student.firstname} readOnly/> }
                    { student.lastname && <InputLabel name="Apellidos" value={student.lastname} readOnly/>}
                    { student.email && 
                        <Form.Group className="modalStudentManagement__formGroup">
                            <Form.Label className="modalStudentManagement__formGroup-label">
                                Correo: 
                            </Form.Label>
                            <InputGroup className="mb-3">
                                <Form.Control className="modalStudentManagement__formGroup-input" type="text" value={student.email} readOnly/>
                                <Button variant="outline-secondary" id="button-addon2" onClick={copyEmail}> Copiar </Button>
                                <Button variant="outline-secondary" id="button-addon2" onClick={sendEmail}> Enviar correo </Button>
                            </InputGroup>
                        </Form.Group> 
                    }
                    <Form.Group className="modalStudentManagement__formGroup">
                        <Form.Label className="modalStudentManagement__formGroup-label">Link de reunion: </Form.Label>
                        <InputGroup className="mb-3">
                            <FormControl onChange={updateLinkText} value={linkMeetingToSave}/>
                            {
                                regexURL.test(hourModalSelected.link ?? "") &&
                                <Button variant="outline-secondary" id="button-addon2" onClick={openMeetingLink}> Abrir </Button>
                            }
                            <Button variant="outline-secondary" id="button-addon2" onClick={updateMeetingLinkByHour}> Guardar </Button>
                        </InputGroup>
                    </Form.Group>  
                    <Form.Group className="modalStudentManagement__formGroup">
                        <Form.Label className="modalStudentManagement__formGroup-label">Consentimiento informado: </Form.Label>
                        <ShowFiles docs={docs} /> 
                    </Form.Group>  
                    { docs.length < 1 && <Alert key={'warning'} variant={'warning'}>Recuerda que no se puede dar la reunion sin la constancia de consentimiento informado, para mayor detalle consulte con el area legal</Alert>}
                </Form>

            }
            {
                !loading && !student &&
                <p>Este horario no tiene datos del alumno, Consulte con el equipo de Soporte</p>
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