import React,{ useState,useEffect } from "react";
import LayoutCoordFACI from "../layouts/LayoutCoordFACI";
import StateViewer,{StatesViewType} from "../components/StateViewer/StateViewer";
import DocumentPlusIcon from "../components/DocumentPlusIcon/DocumentPlusIcon";
import { Button, Form} from "react-bootstrap";
import "./AgreementReview.scss";
import FileManagement from "../components/FileManagement/FileManagement";
import ShowFiles from "../components/FileManagement/ShowFiles";
import { getAllDocsApi,uploadDocsApi } from "../api/files";
import { getAgreement} from "../api/agreementRev";
import useAuth from "../hooks/useAuth";
import { ToastContainer, toast } from 'react-toastify';

/*PENDIENTE */
const idAlumno = 1;
const idCoordinador = 10;
const tipoPersonal = "F"; //F = FACI, E = Especialidad // NO

// const dataDummy = {
//     "entregaConvenioyPlan":{        
//         "faciState" : "Aprobado", // consumir API GET (A = "Aprobado", P = "Pendiente" de revisión, O ="Observado")
//         "espState" : "Observado",    // consumir API GET  (A = Aprobado, P = Pendiente de revisión, O = Observado)
//         "observations" : "Bien hecho crack"        
//     }
// }

// let staticFaci = "Pendiente";
// let staticEsp = "Pendiente";



let staticFaci;
let staticEsp;

let flag=1;
export default function AgreementReview (){    
    const {user} = useAuth();
    const [fileList, setFileList] = useState([])
    const [data, setData] = useState({});
    const [docs, setDocs] = useState([])
    const [docsStudent, setDocsStudent] = useState([])
    const [docsCoord, setDocsCoord] = useState([])
    //console.log("El user tiene: ",user);

    //Enviar idAlumno, idRevisor
    useEffect(() => {
        getAgreement(idAlumno,idCoordinador).then(response => {                
            if(response.success) {  
                setData(response.agreement[0]);            
            }            
        })
    }, [setData])

    useEffect(() => {
        getAllDocsApi("1-1-CONV", 0).then(response => {
            if(response.success) {
                setDocs(response.docs)
            }
        })
    },[setDocs])

    useEffect(() => {
        getAllDocsApi(`1-1-CONV-${idAlumno}`, 1).then(response => {
            if(response.success) {
                setDocsStudent(response.docs)
            }
        })
    },[setDocsStudent])

    useEffect(() => {
        getAllDocsApi(`1-1-CONV-${idAlumno}`, 0).then(response => {
            if(response.success) {
                setDocsCoord(response.docs)
            }
        })
    },[setDocsCoord])       

    
    if(data.estadoFaci && flag){         
        staticFaci = data.estadoFaci;
        staticEsp =  data.estadoEspecialidad;
        flag=0;                
    }

    let documentState ="";
    if(data.estadoFaci && tipoPersonal === "F") {
        documentState = data.estadoFaci;        
    }       
    else
        if(data.estadoFaci && tipoPersonal === "E")
            documentState = data.estadoEspecialidad;       
    
        
    let result=true;
    //const update = async e => {
        //se hace una diferencia entre si es coordinador FACI o de Especialidad        
        /*
        e.preventDefault();
        if(numDocumentos === 2){
            let response=null;
            if(tipoPersonal==="F"){               
                response = await agreementAndPlanReviewFACIUpdate(data);
            }
            if(tipoPersonal==="E"){
                response = await agreementAndPlanReviewEspUpdate(data);
            }
        }        
        */        
    //}
    const update = async e => {
        if(fileList.length === 2) {
            console.log(fileList)
            //const response = await uploadDocsApi(fileList, "1-1-CONV-${idAlumno}", 1);
            // if(response.success) {
            //     toast.success(response.msg, {
            //         position: "top-right",
            //         autoClose: 3000,
            //         hideProgressBar: false,
            //         closeOnClick: true,
            //         pauseOnHover: true,
            //         draggable: true,
            //         progress: undefined,
            //     });
            //     window.location.reload()
            // } else {
            //     toast.error(response.msg, {
            //         position: "top-right",
            //         autoClose: 3000,
            //         hideProgressBar: false,
            //         closeOnClick: true,
            //         pauseOnHover: true,
            //         draggable: true,
            //         progress: undefined,
            //     });
            // }
            toast.error("NO NO NO, equivocadiño. No debes tocar este botón!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else {
            toast.warning(`Se requieren 2 archivos para esta entrega.`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    
    let pass=(documentState==="A")?true:false;
    let pending=(documentState==="P")?true:false;
    let observed=(documentState==="O")?true:false;

    let comentarioFACI="";
    let comentarioEsp="";
    
    if(staticEsp === "A")
        comentarioEsp="Aprobado";
    else{
        if(staticEsp === "O")
            comentarioEsp = "Observado";
        else{
            if(staticEsp === "P")
                comentarioEsp = "Pendiente de revisión";
        }            
    }
    if(staticFaci === "A")
        comentarioFACI="Aprobado"
    else{
        if(staticFaci === "O")
            comentarioFACI = "Observado"
        else{
            if(staticFaci === "P")
                comentarioFACI = "Pendiente de revisión"
        }            
    }

    const changeStatePassed = e => {         
        pass=!pass;       
        if(tipoPersonal === "F"){            
            setData({                                
                ...data,
                estadoFaci:"A"                                        
            })                                 
        }else{
            if(tipoPersonal === "E"){
                setData({
                    ...data,
                    estadoEspecialidad: "A",          
                })                
            }
        } 
        console.log(data)             
    }

    const changeStatePending = e => {       
        pending=!pending;
        if(tipoPersonal === "F"){
            setData({
                ...data,
                estadoFaci: "P",             
            })                       
        }else{
            if(tipoPersonal === "E"){
                setData({
                    ...data,
                    estadoEspecialidad: "P" ,          
                })                
            }
        }        
    }
    
    const changeStateObserved = e => { 
        observed =!observed               
        if(tipoPersonal === "F"){
            setData({
                ...data,
                estadoFaci: "O",            
            })            
        }else{
            if(tipoPersonal === "E"){
                setData({
                    ...data,
                    estadoEspecialidad: "O",            
                })                
            }
        }        
    }

    const changeComments = e => { 
            setData({
                ...data,
                [e.target.name]: e.target.value
                // entregaConvenioyPlan: {
                //     ...data.entregaConvenioyPlan,
                //     [e.target.name]: e.target.value
                // }
            })        
    }
    
    let typeApprovalStateFACI = "";
    switch(staticFaci) {
        case "O": typeApprovalStateFACI = "warning"; break;
        case "A": typeApprovalStateFACI = "success"; break;
        case "P": typeApprovalStateFACI = "pending"; break;        
        default: typeApprovalStateFACI = "error"; break;
    }
    let typeApprovalStateEsp = "";
    switch(staticEsp) {
        case "O": typeApprovalStateEsp = "warning"; break;
        case "A": typeApprovalStateEsp = "success"; break;
        case "P": typeApprovalStateEsp = "pending"; break;        
        default: typeApprovalStateEsp = "error"; break;
    }

    return (
        data.estadoFaci && <LayoutCoordFACI>
           <div className="container principalFinalReview" style={{"padding":"1px"}}  >               
                <div className="row titulo" style={{textAlign: "left",marginTop:"25px",}}>
                    <h1>Revisión de Convenio</h1>                    
                </div>
                <div className="shadowbox">
                    <div className="row normalrow" style={{textAlign: "justify", marginTop:"10px"}}>
                        <p style={{marginTop:"15px"}}>
                            Aquí podrá revisar el convenio y plan de aprendizaje del alumno(a). 
                            Podrá descargar los archivos enviados dando click en los mismos o podrá verlos presionando el boton
                            a la derecha de los mismos. Luego de ello, podrá dar decidir si aprueba los documentos o en todo caso 
                            ingresar una observación de los mismos. Para finalizar la revisión, presione el boton Guardar. <br></br><br></br>
                            A continuación podrá descargar las rúbricas de ambos documentos. 
                        </p>                        
                    </div> 
                    <ShowFiles docs={docs} />
                </div>
                <div className="shadowbox">
                    <div className="row row1" style={{textAlign: "left",marginTop:"25px"}}>
                        <h2 className="subtitulo">Estado de la revisión</h2>
                    </div>
                    <div className="row normalrow" style={{marginTop:"10px"}}>
                        <StateViewer states={[StatesViewType[typeApprovalStateFACI]("Aprobación FACI",comentarioFACI),
                        StatesViewType[typeApprovalStateEsp]("Aprobación Especialidad", comentarioEsp)]}/>
                    </div>
                </div>
                <div className="shadowbox">
                    <div className="row row1" style={{textAlign: "left",marginTop:"25px"}}>
                        <h2 className="subtitulo">Documentos enviados por el alumno</h2>                    
                    </div>  
                    <ShowFiles docs={docsStudent} />
                    {/* <FileManagement canUpload={false} docs={docsStudent} maxFiles={2} titulo="Documentos a enviar al alumno"/>                  */}
                                       
                </div>
                <div className="shadowbox">
                    <div className="row row1" style={{textAlign: "left",marginTop:"30px"}}>
                        <h2 className="subtitulo">Estado de los documentos</h2>                    
                    </div>
                    <div className="row row1" style={{textAlign: "left",marginTop:"30px"}}>                   
                        <Form>
                            {['radio'].map((type) => (
                                <div key={`inline-${type}`} className="mb-3">
                                    <Form.Check
                                        inline
                                        label="Aprobado"
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-1`}
                                        checked={pass}
                                        onChange={changeStatePassed}
                                    />
                                    <Form.Check
                                        inline
                                        label="Observado"
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-2`}
                                        checked={observed}
                                        onChange={changeStateObserved}
                                    />
                                    <Form.Check
                                        inline                                    
                                        label="Pendiente de revisión"
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-3`}
                                        checked={pending}
                                        onChange={changeStatePending}
                                    />
                                </div>
                            ))}
                        </Form>
                    </div>
                </div>
               
                <div className="shadowbox">
                    <div className="row row1" style={{textAlign: "left",marginTop:"25px"}}>                                       
                        <FileManagement canUpload={true} docs={docsCoord} maxFiles={2} fileList={fileList} setFileList={setFileList} titleUpload="Documentos a enviar al alumno" titleUploadedFiles="Documentos enviados al alumno"/>
                    </div>
                </div>
                <div className="shadowbox">
                    <div className="row row2" style={{textAlign: "left",marginTop:"25px"}}>
                        <h2 className="subtitulo">Observaciones</h2>                                               
                            <Form.Control className="observaciones"
                                placeholder="Escriba las observaciones de la entrega"                                                    
                                onChange = {changeComments}
                                // defaultValue = {data.entregaConvenioyPlan.observations} 
                                defaultValue = {data.observaciones}
                                name="comments"
                                as="textarea" 
                                rows={10}                                                             
                            />                                         
                    </div>
                </div>
                <div className="row botones" style={{marginLeft:"10px"}}>                    
                    <Button  className="btn btn-sec" style={{width:"20%",marginRight:"50px"}}>Regresar</Button>                   
                    <Button  className="btn btn-pri" style={{width:"20%",marginLeft:"50px"}} onClick={update}>Guardar</Button>                  
                </div>           
            </div>   
        </LayoutCoordFACI>
    );
}