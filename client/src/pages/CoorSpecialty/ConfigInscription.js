import React, {useState, useEffect} from "react";
import LayoutAdministrative from "../../layouts/LayoutAdministrative";
import { Row, FormControl, Form, Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import TableInscriptionFields from "../../components/Tables/TableInscriptionFields";
import "./scss/ConfigProcess.scss";
import { selectStudentsByProcessSpecialtyApi } from "../../api/enrollment";
import ModalAddFieldInscription from "../../components/Modals/ModalAddFieldInscription";
import ModalExcel from "../../components/Modals/ModalExcel";
import { toast, ToastContainer } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { isNotEmptyObj } from "../../utils/objects";
import PandaLoaderPage from "../General/PandaLoaderPage";
import {getAllFieldsInscriptionForm} from "../../api/registrationForm";

const dataDummy = [
    {
        idField: 1,
        nameField: "Nombre",
        seccion: "Sobre la PSP",
        fijo: true,
        obligatorio: ""
    },
    {
        idField: 2,
        nameField: "Apellido",
        seccion: "Sobre la empresa",
        fijo: false,
        obligatorio: "obligatorio"
    }
]

let textFilter = ""
let textSelect = "-1"

export default function ConfigInscription () {
    const {user} = useAuth();
    const idProcess = user.fidProceso;
    // const idProcess = 1;
    const [matr, setMatr] = useState(false);
    const [show, setShow] = useState(false);

    const [alumnos, setAlumnos] = useState([]);
    const [fields,setFields]=useState(dataDummy);
    //const [fields,setFields]=useState([]);
    const [newDataStudent, setNewDataStudent] = useState({
        nameField: "",
        seccion: "",
        fijo: false,
        obligatorio: true
    });

    console.log("El user es: ",user);
    const [loading, setLoading] = useState(false);
    let typeUser=user.tipoPersona;
    if(typeUser==="p"){
        typeUser=user.tipoPersonal;
    }else{

    }

    useEffect(()=> {
        const fetchData = async () => {
            setLoading(true);
            //console.log("Estoy enviando: ",user.fidEspecialidad, " y ",idProcess);
            const result = await getAllFieldsInscriptionForm(user.fidEspecialidad,idProcess);
            console.log("El result es: ",result);
            if(result.success) {
                setFields(result.infoFicha.arregloFixedFields)  
            }
            setLoading(false);
        }
        fetchData()
    }, [setFields])

    const insertar= e=>{
        setShow(true);
    }

    if(loading || !isNotEmptyObj(fields)) return <PandaLoaderPage type={typeUser}/>
    return (
        <LayoutAdministrative>
            <ToastContainer />
            <div className="container">
                <Row className="rows studentsManagement">
                    <h1>Gestión Ficha de Inscripción</h1>
                </Row>
                <Row className="rows ">
                    <div className="col-sm-8 subtitles">
                    </div>
                    <div className="col-sm-4 subtitles">
                        <Button className="btnAgregar" onClick={insertar}
                            variant="primary">Agregar campo
                        </Button>
                    </div>
                </Row>

                <Row className="rows">
                    <TableInscriptionFields rows={fields} setShow={setShow} setNewDataStudent={setNewDataStudent} />
                </Row>                
                <ModalAddFieldInscription show={show} setShow={setShow}
                    data={newDataStudent} setData={setNewDataStudent}/>
            </div>
        </LayoutAdministrative>
    )
}