import React,{ useState,useEffect } from "react";
import LayoutAdministraive from "../../layouts/LayoutAdministrative";
import StateViewer,{StatesViewType} from "../../components/StateViewer/StateViewer";
import { Button, Form} from "react-bootstrap";
import "./scss/AgreementReview.scss";
import FileManagement from "../../components/FileManagement/FileManagement";
import ShowFiles from "../../components/FileManagement/ShowFiles";
import { getAllDocsApi,uploadDocsApi } from "../../api/files";
import { getAgreement, agreementReviewUpdateApi} from "../../api/agreementRev";
import useAuth from "../../hooks/useAuth";
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from "react-router-dom";
/*PENDIENTE */
//ESTO SE DEBE CAMBIAR


let dataForApi = {
    idEntregaConvenio: "",
    fidAlumnoProceso:"",
    estadoFaci:"",
    estadoEspecialidad: "",
    observaciones: ""
}

let staticFaci;
let staticEsp;
let dataTemporal;
let flag=1;
export default function AgreementReview (){
    const idAlumno= useParams().idStudent;
    const {user} = useAuth();
    const [fileList, setFileList] = useState([])
    const [data, setData] = useState({});
    const [docs, setDocs] = useState([])
    const [docsStudent, setDocsStudent] = useState([])
    const [docsCoord, setDocsCoord] = useState([])   
    //Enviar idAlumno, idRevisor
    
    useEffect(() => {        
        const fetchData = async () => {
            const result1 = await getAgreement(idAlumno);            
            dataTemporal =result1.agreement[0];  
                            
            if(result1.success) {  
                setData(result1.agreement[0]);            
            }
            const result2 = await getAllDocsApi(`${user.fidProceso}-CONV`, 0)
            if(result2.success) {
                setDocs(result2.docs)
            }
            const result3 = await getAllDocsApi(`${user.fidProceso}-CONV-${idAlumno}`, 1)
            if(result3.success) {
                setDocsStudent(result3.docs)
            }
            const result4 = await getAllDocsApi(`${user.fidProceso}-CONV-${idAlumno}`, 0)
            if(result4.success) {
                setDocsCoord(result4.docs)
            }
        }
        fetchData()
    }, [setData,setDocs,setDocsStudent,setDocsCoord])   

             
    // useEffect(() => {
    //     getAgreement(idAlumno,user.idPersona).then(response => {                
    //         if(response.success) {  
    //             setData(response.agreement[0]);            
    //         }else{
    //             console.log(response.errMsg)
    //         }            
    //     })
    // }, [setData])

    // //VER BIEN LO DEL FORMATO 1-1
    // useEffect(() => {
    //     getAllDocsApi(`1-${user.fidEspecialidad}-CONV`, 0).then(response => {
    //         if(response.success) {
    //             setDocs(response.docs)
    //         }
    //     })
    // },[setDocs])

    // useEffect(() => {
    //     getAllDocsApi(`1-${user.fidEspecialidad}-CONV-${idAlumno}`, 1).then(response => {
    //         if(response.success) {
    //             setDocsStudent(response.docs)
    //         }
    //     })
    // },[setDocsStudent])

    // useEffect(() => {
    //     getAllDocsApi(`1-${user.fidEspecialidad}-CONV-${idAlumno}`, 0).then(response => {
    //         if(response.success) {
    //             setDocsCoord(response.docs)
    //         }
    //     })
    // },[setDocsCoord])       

    
    if(flag && data.estadoFaci){         
        staticFaci = data.estadoFaci;
        staticEsp =  data.estadoEspecialidad;
        flag=0;      
              
    }

    let documentState ="";
    if(data.estadoFaci && user.tipoPersonal === "F") {
        documentState = data.estadoFaci;        
    }       
    else
        if(data.estadoFaci && user.tipoPersonal === "E")
            documentState = data.estadoEspecialidad;  
            
    
    
        
    
    const update = async e => {
        if(user.tipoPersonal === "F"){
            if(fileList.length === 2) {                        
                dataForApi.idEntregaConvenio = data.idEntregaConvenio
                dataForApi.fidAlumnoProceso = dataTemporal.fidAlumnoProceso
                dataForApi.estadoFaci = data.estadoFaci
                dataForApi.estadoEspecialidad = data.estadoEspecialidad
                dataForApi.observaciones = data.observaciones           
                console.log(dataForApi)
                const response1 = await uploadDocsApi(fileList, `${user.fidProceso}-CONV-${idAlumno}`, 0);
                if(response1.success){
                    console.log(dataForApi)
                    const response2 = await agreementReviewUpdateApi(dataForApi)
                    if(response2.success){                    
                        toast.success(`Informaci??n actualizada con ??xito.`, {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });                    
                        window.location.reload();
                        window.scrollTo(0, 0);
                    }else{
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
                }else{
                    toast.error(response1.msg, {
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
        }else{
            dataForApi.idEntregaConvenio = data.idEntregaConvenio
            dataForApi.fidAlumnoProceso = dataTemporal.fidAlumnoProceso
            dataForApi.estadoFaci = data.estadoFaci
            dataForApi.estadoEspecialidad = data.estadoEspecialidad
            dataForApi.observaciones = data.observaciones            
            //const response1 = await uploadDocsApi(fileList, `${user.fidProceso}-CONV-${idAlumno}`, 0);            
            const response2 = await agreementReviewUpdateApi(dataForApi)
            if(response2.success){                    
                toast.success(`Informaci??n actualizada con ??xito.`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });                    
                window.location.reload();
                window.scrollTo(0, 0);
            }else{
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
                comentarioEsp = "Pendiente de revisi??n";
        }            
    }
    if(staticFaci === "A")
        comentarioFACI="Aprobado"
    else{
        if(staticFaci === "O")
            comentarioFACI = "Observado"
        else{
            if(staticFaci === "P")
                comentarioFACI = "Pendiente de revisi??n"
        }            
    }

    const changeStatePassed = e => {            
        pass=!pass;       
        if(user.tipoPersonal === "F"){            
            setData({                                
                ...data,
                estadoFaci:"A"                                        
            })                                 
        }else{
            if(user.tipoPersonal === "E"){
                setData({
                    ...data,
                    estadoEspecialidad: "A",          
                })                
            }
        }                           
    }

    const changeStatePending = e => {       
        pending=!pending;
        if(user.tipoPersonal === "F"){
            setData({
                ...data,
                estadoFaci: "P",             
            })                       
        }else{
            if(user.tipoPersonal === "E"){
                setData({
                    ...data,
                    estadoEspecialidad: "P" ,          
                })                
            }
        }        
    }
    
    const changeStateObserved = e => { 
        observed =!observed               
        if(user.tipoPersonal === "F"){
            setData({
                ...data,
                estadoFaci: "O",            
            })            
        }else{
            if(user.tipoPersonal === "E"){
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
                observaciones: e.target.value                
            })         
    }

    const goBack = e => {
        window.history.back();
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
        data.estadoFaci && <LayoutAdministraive>
           <div className="container principalFinalReview" style={{"padding":"1px"}}  >               
                <div className="row titulo" style={{textAlign: "left",marginTop:"25px",}}>
                    <h1>Revisi??n de Convenio</h1>                    
                </div>
                <div className="shadowbox">
                    <div className="row normalrow" style={{textAlign: "justify", marginTop:"10px"}}>
                        <p style={{marginTop:"15px"}}>
                            Aqu?? podr?? revisar el convenio y plan de aprendizaje del alumno(a). 
                            Podr?? descargar los archivos enviados dando click en los mismos o podr?? verlos presionando el boton
                            a la derecha de los mismos. Luego de ello, podr?? dar decidir si aprueba los documentos o en todo caso 
                            ingresar una observaci??n de los mismos. Para finalizar la revisi??n, presione el boton Guardar. <br></br><br></br>
                            A continuaci??n podr?? descargar las r??bricas de ambos documentos. 
                        </p>                        
                    </div> 
                    <ShowFiles docs={docs} />
                </div>
                <div className="shadowbox">
                    <div className="row row1" style={{textAlign: "left",marginTop:"25px"}}>
                        <h2 className="subtitulo">Estado de la revisi??n</h2>
                    </div>
                    <div className="row normalrow" style={{marginTop:"10px"}}>
                        <StateViewer states={[StatesViewType[typeApprovalStateFACI]("Aprobaci??n FACI",comentarioFACI),
                        StatesViewType[typeApprovalStateEsp]("Aprobaci??n Especialidad", comentarioEsp)]}/>
                    </div>
                </div>
                <div className="shadowbox">
                    <div className="row row1" style={{textAlign: "left",marginTop:"25px"}}>
                        <h2 className="subtitulo">Documentos enviados por el alumno</h2>                    
                    </div>  
                    <ShowFiles docs={docsStudent} />                   
                                       
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
                                        label="Pendiente de revisi??n"
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
                    <Button  className="btn btn-sec" style={{width:"20%",marginRight:"50px"}} onClick={goBack}>Regresar</Button>                   
                    <Button  className="btn btn-pri" style={{width:"20%",marginLeft:"50px"}} onClick={update}>Guardar</Button>                  
                </div>           
            </div>   
        </LayoutAdministraive>
    );
}