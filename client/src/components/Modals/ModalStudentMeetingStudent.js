import React, { useEffect, useState } from "react";
import { Alert, Button, ButtonGroup, Form, FormControl, InputGroup, Modal, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { getAllDocsApi, uploadDocsApi } from "../../api/files";
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
    const {show, setShow, hourModalSelected} = props;

    const [fileList, setFileList] = useState([])
    const [docs, setDocs] = useState([])
    const [studentDocs, setStudentDocs] = useState([])

    const maxFiles = 1;
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

    
    const getDocumentsOfExample = () => { //1-1-ESUP-1
        console.log(`CONSULTANDO documentos de ejemplo de ESUP`)
        setLoading(true)
        getAllDocsApi(`1-${user.fidEspecialidad}-ESUP`, 0).then(response => {
            setLoading(false)
            if(response.success) {
                setDocs(response.docs)
            }
        })
    }
    const getDocumentsByStudent = ( code ) => { //1-1-ESUP-1
        if (code === null) return;
        console.log(`CONSULTANDO documentos de ESUP ${code}`)
        setLoading(true)
        getAllDocsApi(`1-${user.fidEspecialidad}-ESUP-${code}`, 1).then(response => {
            setLoading(false)
            getDocumentsOfExample()
            if(response.success) {
                setStudentDocs(response.docs)
            }
        })
    }


    useEffect(() => {
        getSupervisorData()
     }, [props])
     
     const getSupervisorData =  () => {
        console.log(props)
        if (props.show && props.hourModalSelected !== null){
            console.log("Se busca los datos del supervisor", hourModalSelected.fidAsesor)
            setLoading(true)
            getSupervisorByID(hourModalSelected.fidAsesor).then(response => {
                setLoading(false)
                console.log(response)
                if(response.success) {
                    setSupervisor(response.data)
                    getDocumentsByStudent(user.idPersona)
                }else{
                    // Limpiamos la seleccion
                    setSupervisor({ firstname:"", lastname:"", email:"", code: -1 })
                }
            })
        }else{
            console.log("Se cierra el modal")
            // Limpiamos la seleccion
            setSupervisor({ firstname:"", lastname:"", email:"", code: -1 })
            setDocs([])
            setFileList([])
            setStudentDocs([])
        }
     }
    const copyEmail = () => {
        if (!supervisor.email) return
        navigator.clipboard.writeText(supervisor.email)
        showToast("Correo copiado", "success")
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
    }

    const deliver = async () => {
        if(fileList.length === maxFiles) {
            setLoading(true)
            uploadDocsApi(fileList, `1-${user.fidEspecialidad}-ESUP-${user.idPersona}`, 1).then(response => {
                setLoading(false)
                console.log(response)
                if(response.success) {
                    showToast(response.msg, 'success')
                    // llamada al API para actualizar los eatados
                    getSupervisorData()
                } else {
                    showToast(response.msg, 'error')
                }
            })
        }
        else {
            showToast(`Se requieren ${maxFiles} archivos para esta entrega.`, 'warning')
        }
    }

    return ( 
        <ModalBasic show={show}
            setShow={setShow}
            title="Detalle de reunión"
        >
            <ToastContainer />  
            {
                (loading || !(supervisor.code > 0)) && <>
                    <Loading tiny={true}/>
                </>
            }
            {
                !loading && (supervisor.code > 0) &&
                <Form className="modalStudentManagement">
                    { hourModalSelected && <Alert key={'warning'} variant={'info'}>Reunión programada para el {hourModalSelected.fecha} a las {hourModalSelected.hora-1}:00</Alert>}
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
                    { !(studentDocs.length<maxFiles) && <Form.Group className="modalStudentManagement__formGroup">
                        <Form.Label className="modalStudentManagement__formGroup-label">Enlace de reunión: </Form.Label>
                        <InputGroup className="mb-3">
                            <FormControl value={hourModalSelected.link} readOnly/>
                            {
                                regexURL.test(hourModalSelected.link ?? "") &&
                                <Button variant="outline-secondary" id="button-addon2" onClick={openMeetingLink}> Abrir </Button>
                            }
                        </InputGroup>
                    </Form.Group>  }
                    <div>
                        { docs.length > 0 && <ShowFiles docs={docs} /> }
                        <FileManagement canUpload={studentDocs.length<maxFiles} docs={studentDocs} maxFiles={maxFiles} fileList={fileList} setFileList={setFileList}/>
                        { studentDocs.length<maxFiles && <Alert key={'warning'} variant={'warning'}>Recuerda subir la constancia de consentimiento informado antes de la reunión.</Alert>}
                        {(studentDocs.length<maxFiles) && <Button className="btn btn-primary" style={{margin: "5px 0"}} onClick={deliver}>Subir consentimiento informado</Button>}
                    </div>
                    

                </Form>

            }
            {
                !loading && !(supervisor.code > 0)  &&
                <p>Este horario no tiene datos del supervisor, Consulte con el equipo de soporte.</p>
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