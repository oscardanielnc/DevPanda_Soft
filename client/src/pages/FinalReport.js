import React,{ useState,useEffect } from "react";
import LayoutBasic from "../layouts/LayoutBasic";
import StateViewer,{StatesViewType} from "../components/StateViewer/StateViewer";
import { Button, Form} from "react-bootstrap";
import ShowFiles from "../components/FileManagement/ShowFiles";
import { getAllDocsApi,uploadDocsApi } from "../api/files";
import "./FinalReport.scss";
import useAuth from "../hooks/useAuth";
import FileManagement from "../components/FileManagement/FileManagement";
import { getDeliverableStudent, setDeliverableStudent } from "../api/deliverables";

const dataDummy = {
    "documentState" : "Entregado",
    "espState" : "P",
    "ecoSector" : "Financiero",
    "product" : "Prestamos",
    "influArea" : "Nacional",
    "infBranch" : "Ingeniería de Software",
    "learnLevel"  :  5,
    "observaciones" : "gaaaa",
    "nota" : 20
}

/* let dataForApi = {
    
} */
let staticDocument;
let staticEsp;
let disable;
let flag=1;
let idEntregable=3;
export default function AgreementReview(){  
    
    const {user} = useAuth();
    const [fileList, setFileList] = useState([])
    const [data, setData] = useState({});
    const [docs, setDocs] = useState([])
    const [docsStudent, setDocsStudent] = useState([])
    const [docsSup, setDocsSup] = useState([])
    
   
    
    useEffect(()=> {
        getDeliverableStudent(user.idPersona,idEntregable).then(response => {
            if(response.success) {                
                setData(response.data.valor);                
            }            
        })
    }, [setData])

    
    useEffect(() => {                           //se debe cambiar por INFI
        getAllDocsApi(`1-${user.fidEspecialidad}-CONV`, 0).then(response => {
            if(response.success) {
                setDocs(response.docs)
            }
        })
    },[setDocs])
    
    useEffect(() => {                           //se debe cambiar por INFI
        if(dataDummy.documentState==="Sin entregar"){
            disable=false;
        }
        else{
            disable=true;
        }       
    },[])
//    useEffect(() => {                                            //PUEDO COLOCAR OTRA COSA QUE NO SEA CONV?
//         getAllDocsApi(`${user.fidProceso}-${user.fidEspecialidad}-INFI-${user.idPersona}`, 1).then(response => {
//             if(response.success) {
//                 setDocsStudent(response.docs)
//                 /* if(response.docs.length>0){
//                     documentState="Entregado";
//                 }
//                 else{
//                     documentState="Sin entregar";
//                 } */
//             }
//         })
//     },[setDocsStudent]) 

    // useEffect(() => {  //mismo para alumno que para supervisor?                       
    //     getAllDocsApi(`${user.fidProceso}-${user.fidEspecialidad}-INFI-${user.fidAsesor}`, 0).then(response => {
    //         if(response.success) {
    //             setDocsSup(response.docs)
    //         }
    //     })
    // },[setDocsSup]) 

    if(flag && data.estadoEspecialidad){         
        //staticDocument = data.estadoDocument;
        //staticEsp =  data.estadoEspecialidad;        
        flag=0;                
    }    

    //BORRAR. Es solo para probar
    if(flag){
        staticDocument = dataDummy.documentState;
        staticEsp =  dataDummy.espState
        flag=0;
    }
    

    /* const submit = async e => {
        if(fileList.length === 2) {                        
            dataForApi.idEntregaConvenio = data.idEntregaConvenio
            dataForApi.fidAlumnoProceso = fidAlumnoProceso
            dataForApi.estadoFaci = data.estadoFaci
            dataForApi.estadoEspecialidad = data.estadoEspecialidad
            dataForApi.observaciones = data.observaciones
            
            const response1 = await uploadDocsApi(fileList, `${user.fidProceso}-${user.fidEspecialidad}-CONV-${user.idPersona}`, 1);

            const response2 = await finalReportUpdateApi(dataForApi)
            if(response2.success && response1.success) {                
                toast.success(response2.msg, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });            
                window.location.reload()
            } else {
                toast.error(response2.msg, {
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
    } */
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

    const typeDocumentState = (staticDocument==="Sin entregar")? "fileEmpty": "success";
    let typeApprovalStateEsp = "";
    switch(staticEsp) {
        case "O": typeApprovalStateEsp = "warning"; break;
        case "A": typeApprovalStateEsp = "success"; break;
        case "P": typeApprovalStateEsp = "pending"; break;        
        default: typeApprovalStateEsp = "error"; break;
    }

    function changeLearnLevel(e) {        
        dataDummy.learnLevel = e.target.id;        
       /*  setData({
            ...data,
            estadoFaci: "P",             
        })      */
        console.log(data.deliverableResponse)
    }
    
    const nota=20; 
    return (
        data.idAlumno && <LayoutBasic>
            <div className="container principalFinalReport" style={{"padding":"1px"}}>
                <div className="row titulo" style={{textAlign: "left",marginTop:"25px",}}>
                        <h1>Entrega de Informe</h1>
                </div>
                <div className="shadowbox">
                    <div className="row normalrow" style={{textAlign: "justify", marginTop:"10px"}}>
                        <p style={{marginTop:"15px"}}>
                        Aquí deberá entregar la versión final de su informe de PSP para que pueda ser revisada por su supervisor. 
                        También, deberá de adjuntar la Carta de Conformidad de la Empresa debidamente completada. 
                        Adicionalmente, debe de completar la información que se solicita en el apartado “Información sobre el Informe”.    
                        <br></br>
                        <br></br>
                        A continuación se presentan la <b>Guía de Elaboración del Informe </b>, el <b>Modelo del Informe del Practicante</b> y la <b>Carta de Conformidad de la Empresa.</b>                           
                        </p>
                    </div>
                    <ShowFiles docs={docs} /> 
                </div>
                <div className="shadowbox">
                    <div className="row row1" style={{textAlign: "left",marginTop:"25px"}}>
                        <h2 className="subtitulo">Estado de la entrega</h2>
                    </div>
                    <div className="row normalrow" style={{marginTop:"10px"}}>
                        <StateViewer states={[StatesViewType[typeDocumentState]("Estado de documentos",staticDocument),
                        StatesViewType[typeApprovalStateEsp]("Aprobación Especialidad", comentarioEsp)]}/>
                    </div>
                </div>
                <div className="shadowbox">
                    <div className="row row1" style={{textAlign: "left",marginTop:"25px"}}>                                       
                        <FileManagement canUpload={true} docs={docsStudent} maxFiles={2} fileList={fileList} setFileList={setFileList} titleUpload="Subir archivos" />
                    </div>
                </div>
                <div className="shadowbox">
                    <div className="row row1" style={{textAlign: "left",marginTop:"25px"}}>
                        <h2 className="subtitulo">Información sobre el informe</h2>
                        <h4 className="subSubtitulo">Sobre la empresa</h4>
                        <div className="wordAndTextBoxFirst">  
                            <div className="col-sm-5 subtitles">
                                <h6 style={{marginTop:"9px"}}>Sector económico:</h6> 
                            </div>
                            <div className="col-sm-7 subtitles">
                                <Form.Control  style={{width: "100%"}} type="text" placeholder="Ingrese el sector económico de la empresa." disabled={disable}/>
                            </div>                   
                        </div> 
                        <div className="wordAndTextBox">  
                            <div className="col-sm-5 subtitles">
                                <h6 style={{marginTop:"9px"}}>Principal producto o servicio ofrecido:</h6> 
                            </div>
                            <div className="col-sm-7 subtitles">
                                <Form.Control  style={{width: "100%"}} type="text" placeholder="Ingrese el principal producto o servicio ofrecido por la empresa." disabled={disable}/>
                            </div>                   
                        </div>  
                        <div className="wordAndTextBox">  
                            <div className="col-sm-5 subtitles">
                                <h6 style={{marginTop:"9px"}}>Área de influencia:</h6> 
                            </div>
                            <div className="col-sm-7 subtitles">
                                <Form.Control  style={{width: "100%"}} type="text" placeholder="Ingrese el area de influencia de la empresa." disabled={disable}/>
                            </div>                   
                        </div>  
                        <h4 className="subSubtitulo">Sobre la práctica</h4>    
                        <div className="wordAndTextBoxFirst">  
                            <div className="col-sm-4 subtitles">
                                <h6 style={{marginTop:"9px",textAlign:"justify"}}>Rama de la Ingeniería Informática en la que se desempeñó:</h6> 
                            </div>  
                            <div className="col-sm-7 subtitles">
                            <Form.Select aria-label="Default select example" disabled={disable}>
                                <option>Seleccione su rama</option>
                                <option value="1">Ingeniería de Software</option>
                                <option value="2">Tecnologías de Información</option>
                                <option value="3">Sistemas de Información</option>
                                <option value="4">Ciencias de la Computación</option>
                                <option value="5">Análisis de Datos</option>
                                </Form.Select>                           
                            </div>                                           
                        </div> 
                        <div className="wordAndTextBox">  
                            <div className="col-sm-4 subtitles">
                                <h6 style={{marginTop:"9px",textAlign:"justify"}}>¿Considera que lo aprendido en la universidad contribuyó para que pueda tener un buen desempeño durante sus prácticas?:</h6> 
                            </div>
                            <div className="col-sm-7" style={{marginTop:"7px"}}>
                                <p>Donde 1 es no me sirvió mucho y 5 es me sirvió mucho, elija:</p>
                                <Form>
                                {['radio'].map((type) => (
                                    <div key={`inline-${type}`} className="mb-3">
                                        <Form.Check
                                            className="checkboxes"
                                            inline
                                            label="1"
                                            name="group1"
                                            type={type}
                                            id="1"
                                            onChange={e => changeLearnLevel(e)}
                                        />
                                        <Form.Check
                                            className="checkboxes"
                                            inline
                                            label="2"
                                            name="group1"
                                            type={type}
                                            id="2"
                                            onChange={e => changeLearnLevel(e)}
                                        />
                                        <Form.Check
                                            className="checkboxes"
                                            inline                                    
                                            label="3"
                                            name="group1"
                                            type={type}
                                            id="3"
                                            onChange={e => changeLearnLevel(e)}
                                        />
                                        <Form.Check
                                            className="checkboxes"
                                            inline                                    
                                            label="4"
                                            name="group1"
                                            type={type}
                                            id="4"
                                            onChange={e => changeLearnLevel(e)}
                                        />
                                        <Form.Check
                                            className="checkboxes"
                                            inline                                    
                                            label="5"
                                            name="group1"
                                            type={type}
                                            id="5"
                                            onChange={e => changeLearnLevel(e)}
                                        />
                                    </div>
                                ))}
                                </Form>
                            </div>                   
                        </div>                               
                    </div>
                </div> 
                <div className="shadowbox">
                    <div className="row row1" style={{textAlign: "left",marginTop:"25px"}}>
                        <h2 className="subtitulo">Documentos de retroalimentación</h2>
                        <ShowFiles docs={docsSup} />                   
                    </div>                    
                </div>       
                <div className="shadowbox">
                    <div className="row row1" style={{textAlign: "left",marginTop:"25px"}}>
                        <h2 className="subtitulo">Comentarios de la entrega</h2>
                        <Form>                        
                            <Form.Group className="mb-3" controlId="ControlTextarea1">                            
                                <Form.Control as="textarea" defaultValue={dataDummy.observaciones} rows={5} plaintext readOnly/>
                            </Form.Group>
                        </Form>                       
                    </div>                    
                </div>
                <div className="shadowbox">
                    <div className="row row1" style={{textAlign: "left",marginTop:"25px"}}>
                        <h2 className="subtitulo">Calificación</h2>    
                        {
                            !data.deliverableResponse.grade && <h4 className="nota">-- / 20</h4>
                        } 
                        {
                            data.deliverableResponse.grade && <h4 className="nota">{data.deliverableResponse.grade} / 20</h4>
                        }                                    
                    </div>                    
                </div>
                <div className="row botones" style={{marginLeft:"10px"}}>                            
                {/* <Button  className="btn btn-pri" style={{width:"20%",marginLeft:"50px"}} onClick={submit}>Entregar</Button> */}                 
                </div>                            
            </div>
        </LayoutBasic>
    );
}
