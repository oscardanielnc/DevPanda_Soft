import React,{ useState,useEffect } from "react";
import LayoutBasic from "../../layouts/LayoutBasic";
import StateViewer,{StatesViewType} from "../../components/StateViewer/StateViewer";
import { Button, Form} from "react-bootstrap";
import ShowFiles from "../../components/FileManagement/ShowFiles";
import { getAllDocsApi,uploadDocsApi } from "../../api/files";
import "./scss/FinalReport.scss";
import useAuth from "../../hooks/useAuth";
import FileManagement from "../../components/FileManagement/FileManagement";
import { getDeliverableStudent, setDeliverableStudent,getfieldsDeliverables,updatefieldsDeliverables } from "../../api/deliverables";
import { ToastContainer, toast } from 'react-toastify';
const dataDummy = { 
    "ecoSector" : "Financiero",
    "productService" : "Prestamos",
    "influArea" : "Nacional",
    "infBranch" : "Ingeniería de Software",
    "learnLevel"  :  5  
}


let filledFieldsFlag = 0;
let staticDocument;
let staticEsp;
let disable;
let flag=1;
let idEntregable=3; //como obtener esto?
let dataTemporal;
export default function AgreementReview(){  
    
    const {user} = useAuth();
    const [fileList, setFileList] = useState([])
    const [data, setData] = useState({});
    const [dataFields,setDataFields] = useState({})
    const [docs, setDocs] = useState([])
    const [docsStudent, setDocsStudent] = useState([])
    const [docsSup, setDocsSup] = useState([])

    useEffect(()=> {
        const fetchData = async () => {
            const result1 = await getDeliverableStudent(user.idPersona,idEntregable);
            dataTemporal = result1.data.valor            
            if(result1.success) {                                           
                setData(result1.data.valor);                                                
            }      
            const result2 = await getfieldsDeliverables(idEntregable,dataTemporal.deliverableResponse.idRespuestaEntregable);                                    
            if(result2.success) {                                           
                setDataFields(result2.data); //esto es la data.others de jeison                                               
            }  
        }
        fetchData()
    }, [setData,setDataFields])
    
    useEffect(() => {                           //se debe cambiar por INFI   
        const fetchData = async () => { 
            const result = await getAllDocsApi(`${user.fidProceso}-${user.fidEspecialidad}-IFIN`, 0);
            if(result.success) {
                setDocs(result.docs)                
            }
        }
        fetchData()
    },[setDocs])    

   
   useEffect(() => {     
        const fetchData = async () => {         
            const result = await getAllDocsApi(`${user.fidProceso}-${user.fidEspecialidad}-IFIN-${user.idPersona}`, 1);                        
            if(result.success) {                                           
                setDocsStudent(result.docs);                                                
            }    
        }
        fetchData()
    },[setDocsStudent]) 

    // useEffect(() => {  //mismo para alumno que para supervisor?                       
    //     getAllDocsApi(`${user.fidProceso}-${user.fidEspecialidad}-INFI-${user.fidAsesor}`, 0).then(response => {
    //         if(response.success) {
    //             setDocsSup(response.docs)
    //         }
    //     })
    // },[setDocsSup])      

    
    if(flag && data.deliverableResponse){
        staticDocument = data.deliverableResponse.docState;
        staticEsp =  data.deliverableResponse.evaState;
        flag=0;                               
        if(data.deliverableResponse.docState==="S"){
            disable=false;      
        }
        else{
            disable=true;   
            filledFieldsFlag = 1;                     
        }       
    }
    

    const submit = async e => {
        if(fileList.length === 2) { 
            if(filledFieldsFlag){
                const newData1 = {
                    ...data,
                    deliverableResponse:{
                        idRespuestaEntregable: data.deliverableResponse.idRespuestaEntregable,
                        docState: "E",
                        evaState: data.deliverableResponse.evaState,
                        observation: data.deliverableResponse.observation,
                        grade: data.deliverableResponse.grade,
                        uploadDate: data.deliverableResponse.uploadDate,
                    }                
                }
                
                const newData2 = {
                    idRespuestaEntregable: data.deliverableResponse.idRespuestaEntregable,
                    campos:dataFields.data                                
                }       
                
                const response1 = await setDeliverableStudent(newData1)  
                if(response1.success){
                    const response2 = await updatefieldsDeliverables(newData2)   
                    if(response2.success){
                        const response3 = await uploadDocsApi(fileList, `${user.fidProceso}-${user.fidEspecialidad}-IFIN-${user.idPersona}`, 1);
                        if(response3.success){
                            window.location.reload()
                            toast.success(`Datos registrados con éxito.`, {
                                position: "top-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });                        
                        }else{
                            toast.error(response3.msg, {
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
            }else{
                toast.warning(`Debe llenar todos los campos antes de entregar.`, {
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
    }

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
    let comentarioDoc="";
    if(staticDocument === "S")
        comentarioDoc="Sin entregar";
    else{
        comentarioDoc = "Entregado";
    }

    const typeDocumentState = (staticDocument==="S")? "fileEmpty": "success";
    let typeApprovalStateEsp = "";
    switch(staticEsp) {
        case "O": typeApprovalStateEsp = "warning"; break;
        case "A": typeApprovalStateEsp = "success"; break;
        case "P": typeApprovalStateEsp = "pending"; break;        
        default: typeApprovalStateEsp = "error"; break;
    }    
    
    // const changeEcoSector = e => { 
    //     setData({
    //         ...data,
    //         ecoSector: e.target.value                
    //     })        
    // }

    // const changeProdSer = e => { 
    //     setData({
    //         ...data,
    //         productService: e.target.value                
    //     })        
    // }

    // const changeInfluArea = e => { 
    //     setData({
    //         ...data,
    //         influArea: e.target.value                
    //     })        
    // }
    
    // const changeInfBranch = e => { 
    //     setData({
    //         ...data,
    //         infBranch: e.target.value                
    //     })        
    // }

    // function changeLearnLevel(e) {        
    //     dataDummy.learnLevel = e.target.id;        
    //     /* setData({
    //         ...data,
    //         estadoFaci: "P",             
    //     }) */
    //     console.log(dataFields)
    // }

    const handleChangeCamps = (e) => {     
        let counter = 0;
        const newCamps = dataFields.data.map(elem => {
            if(elem.nombreCampoEntregable === e.target.name)
                return {                    
                    idCampoEntregableProceso: elem.idCampoEntregableProceso,
                    idCampoLlenadoEntregable: elem.idCampoLlenadoEntregable,
                    nombreCampoEntregable: elem.nombreCampoEntregable,
                    flagEntregable: elem.flagEntregable,           
                    valorAlumno: e.target.value                       
                }
            return elem;
        })        
             
        for (const property in newCamps) {
            if(newCamps[property].valorAlumno!== ""){
                counter += 1;
            }
        }
        if(counter === newCamps.length){
            filledFieldsFlag = 1;
        }else{
            filledFieldsFlag = 0;
        }        
        setDataFields({
            ...dataFields,        
            data: newCamps
        }) 
    }

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
                        A continuación se presentan la <b>Guía de Elaboración del Informe</b>, el <b>Modelo del Informe del Practicante</b> y la <b>Carta de Conformidad de la Empresa.</b>                           
                        </p>
                    </div>
                    <ShowFiles docs={docs} /> 
                </div>
                <div className="shadowbox">
                    <div className="row row1" style={{textAlign: "left",marginTop:"25px"}}>
                        <h2 className="subtitulo">Estado de la entrega</h2>
                    </div>
                    <div className="row normalrow" style={{marginTop:"10px"}}>
                        <StateViewer states={[StatesViewType[typeDocumentState]("Estado de documentos",comentarioDoc),
                        StatesViewType[typeApprovalStateEsp]("Aprobación Especialidad", comentarioEsp)]}/>
                    </div>
                </div>
                <div className="shadowbox">
                    <div className="row row1" style={{textAlign: "left",marginTop:"25px"}}>                                       
                        <FileManagement canUpload={!disable} docs={docsStudent} maxFiles={2} fileList={fileList} setFileList={setFileList} titleUpload="Subir archivos" />
                    </div>
                </div>
                <div className="shadowbox">
                    <div className="row row1" style={{textAlign: "left",marginTop:"25px"}}>
                        <h2 className="subtitulo">Información sobre el informe</h2>
                        <p className="textito" >Aquí deberá ingresar los datos solicitados a continuación:</p> 

                        {                                                       
                            dataFields.data && dataFields.data.map((e,index) => {                       
                                var texto = "Ingrese su respuesta";                                                        
                                return (
                                    <div className="wordAndTextBoxFirst">  
                                        <div className="col-sm-5 subtitles">
                                            <h6 style={{marginTop:"10px",marginBottom:"25px"}} >{e.nombreCampoEntregable}</h6> 
                                        </div>
                                        <div className="col-sm-7 subtitles">
                                            <Form.Control  
                                                style={{width: "100%",marginBottom:"15px"}} 
                                                type="text" 
                                                name={e.nombreCampoEntregable}
                                                placeholder= {texto}
                                                defaultValue={e.valorAlumno} 
                                                onChange = {handleChangeCamps}
                                                disabled={disable}/>
                                        </div>                   
                                    </div>                                    
                                ) 
                            })                   
                        }
                        {/*                      
                        <div className="wordAndTextBoxFirst">  
                            <div className="col-sm-4 subtitles">
                                <h6 style={{marginTop:"9px",textAlign:"justify"}}>Rama de la Ingeniería Informática en la que se desempeñó:</h6> 
                            </div>  
                            <div className="col-sm-7 subtitles">
                            <Form.Select 
                                aria-label="Default select example"
                                //onChange = {changeInfBranch} 
                                disabled={disable}>
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
                            <div className="col-sm-7 subtitles" style={{marginTop:"10px"}}>
                                <Form.Control  
                                    style={{width: "100%"}} 
                                    type="text"                                     
                                    //onChange = {changeInfluArea}
                                    disabled={disable}/>
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
                        </div> */}                                            
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
                                <Form.Control as="textarea" defaultValue={data.deliverableResponse.observation} rows={5} plaintext readOnly/>
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
                <Button  className="btn btn-pri" style={{width:"20%",marginLeft:"50px"}} onClick={submit} disabled={disable}>Entregar</Button>                 
                </div>                            
            </div>
        </LayoutBasic>
    );
}
