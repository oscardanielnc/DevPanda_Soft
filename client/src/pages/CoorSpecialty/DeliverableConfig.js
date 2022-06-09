import React, {useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import LayoutBasic from "../../layouts/LayoutBasic";
import LayoutAdministrative from "../../layouts/LayoutAdministrative";
import { Row,Button, Form} from "react-bootstrap";
import StateViewer,{StatesViewType} from "../../components/StateViewer/StateViewer";
// import "./AgreementReview.scss";
import FileManagement from "../../components/FileManagement/FileManagement";
import { getDeliverableStudent, setDeliverableStudent } from "../../api/deliverables";
import useAuth from "../../hooks/useAuth";
import { ToastContainer, toast } from 'react-toastify';
import { getAllDocsApi, uploadDocsApi } from "../../api/files";
import "./scss/DeliverableConfig.scss";
import PandaLoaderPage from "../General/PandaLoaderPage";
import { isNotEmptyObj } from "../../utils/objects";
import ShowFiles from "../../components/FileManagement/ShowFiles";
import TableDeliverableFields from "../../components/Tables/TableDeliverableFields";
import ModalAddFieldDeliverable from "../../components/Modals/ModalAddFieldDeliverable";

const dataDummy = {
    nameDeliverable:"",
    fieldS:[
        {
            idField: 1,
            idEntregable:2,
            nameField: "Nombre",
            obligatorio: ""
        },
        {
            idField: 2,
            idEntregable:2,
            nameField: "Apellido",
            obligatorio: "obligatorio"
        }
    ]
}

//const idEntregable=1;
const maxFiles = 1;

let estadoDoc= "";
let estadoEva = "";
let comentarioCalificado="";
let comentarioDoc="";
let idDelivResponse=0;


export default function DeliverableConfig(){
    const {user} = useAuth();
    const idEntregable = Number(useParams().code)
    if(!user) {
        window.location.href = "/";
    }
    //let estadoDoc= "E";//"N" no entregado, "E" entregado
    //let estadoEva = "P";//"A" es aprobado, "O" es observado, , "P" pendiente de aprobación
    const [fileList, setFileList] = useState([])
    const [docs, setDocs] = useState([])
    const [studentDocs, setStudentDocs] = useState([])
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [fields,setFields]=useState(dataDummy.fields);
    const [newDataStudent, setNewDataStudent] = useState({
        idEntregable: idEntregable,
        nameField: "",
        obligatorio: true
    });
    let typeUser=user.tipoPersona;
    if(typeUser==="p"){
        typeUser=user.tipoPersonal;
    }else{

    }
    //const 
    console.log("user",user);
    useEffect(()=> {
        const fetchData = async () => {
            /*setLoading(true);
            //console.log("Estoy enviando: ",user.fidEspecialidad, " y ",idProcess);
            const result = await getDeliverableFields(user.idPersona,idEntregable);
            console.log("El result es: ",result);
            if(result.success) {
                console.log("deliverable",result);
                setFields(result.data.fields);
            }
            setLoading(false);*/
        }
        fetchData()
    }, [setFields])
    
    const insertar= e=>{
        setShow(true);
    }

    if(loading || !isNotEmptyObj(fields)) return <PandaLoaderPage type={typeUser}/>

    return(
        <LayoutAdministrative>
            <ToastContainer />
            <div className="container">
                <Row className="rows studentsManagement">
                    <h1>Gestión de {fields.nameDeliverable}</h1>
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
                    <TableDeliverableFields rows={fields} setShow={setShow} setNewDataStudent={setNewDataStudent} />
                </Row>                
                <ModalAddFieldDeliverable show={show} setShow={setShow}
                    data={newDataStudent} setData={setNewDataStudent}/>
            </div>
        </LayoutAdministrative>

    )
}