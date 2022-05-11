import React,{ useState,useEffect } from "react";
import LayoutCoordFACI from "../layouts/LayoutCoordFACI";
import StateViewer,{StatesViewType} from "../components/StateViewer/StateViewer";
import DocumentPlusIcon from "../components/DocumentPlusIcon/DocumentPlusIcon";
import { Button, Form} from "react-bootstrap";
import Convenio from "../asserts/img/pdf/Convenio.pdf"
import "./AgreementReview.scss";
import FileManagement from "../components/FileManagement/FileManagement";
import ShowFiles from "../components/FileManagement/ShowFiles";
import { getAllDocsApi } from "../api/files";

//TO DO
//1) Realizar el select
//2) Realizar los updates de faci y de especialidad


//const idProceso =1; posible que se necesite
const idAlumno = 1;  //posible que se necesite
//const idCoordinador = ""; posible que se necesite
//o 
//const idEntregaConvenio= 1; posible que se necesite
const tipoPersonal = "F"; //F = FACI, E = Especialidad // NO

const dataDummy = {
    "entregaConvenioyPlan":{        
        "faciState" : "Observado", // consumir API GET (A = "Aprobado", P = "Pendiente" de revisión, O ="Observado")
        "espState" : "Observado",    // consumir API GET  (A = Aprobado, P = Pendiente de revisión, O = Observado)
        "observations" : "Bien hecho crack"        
    }
}


let staticFaci = "Pendiente";
let staticEsp = "Pendiente";

export default function AgreementReview (){
    const [radios, setRadios] = useState({
        pass: false, 
        observed: false,
        pending: false
    })
    const [data, setData] = useState({}); 
    const [docs, setDocs] = useState([])
    const [docsStudent, setDocsStudent] = useState([])
    const [docsCoord, setDocsCoord] = useState([])

    useEffect(()=> {
        //aqui haan su llmada al API
        // xxxxx .... suponenido que dataDummy sea el objeto que les devuelva
        staticFaci = dataDummy.entregaConvenioyPlan.faciState
        staticEsp = dataDummy.entregaConvenioyPlan.staticEsp
        setData(dataDummy)
    }, [])
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

    let documentState ="";
    if(data.entregaConvenioyPlan>0 && tipoPersonal === "F")        
        documentState = data.entregaConvenioyPlan.faciState;
    else
        if(data.entregaConvenioyPlan>0 && tipoPersonal === "E")
            documentState = data.entregaConvenioyPlan.espState;
    
    // useEffect(()=> {
    //     /*
    //     selectAgreementReview(data.idCoordinador, idEntregaConvenio).then(response => {
    //         if(response.success) {
    //             setData(response.data);
    //         }
    //     })*/
    // }, [setData])
    
    let result=true;
    const update = async e => {
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
    }
    
    let comentarioFACI="";
    let comentarioEsp="";

    const flag = 0;
    
    
    if(staticEsp === "Aprobado")
        comentarioEsp="Aprobado";
    else{
        if(staticEsp === "Observado")
            comentarioEsp = "Observado";
        else{
            if(staticEsp === "Pendiente")
                comentarioEsp = "Pendiente de revisión";
        }            
    }

    if(staticFaci === "Aprobado")
        comentarioFACI="Aprobado"
    else{
        if(staticFaci === "Observado")
            comentarioFACI = "Observado"
        else{
            if(staticFaci === "Pendiente")
                comentarioFACI = "Pendiente de revisión"
        }            
    }



    const changeStatePassed = e => {
        if(tipoPersonal === "F"){
            setRadios({
                observed: false,
                pass: true,
                pending: false                
            })
        }else{
            if(tipoPersonal === "E"){
                setRadios({
                    observed: false,
                    pass: true,
                    pending: false                
                })
            }
        }
    }
    const changeStatePending = e => {
        if(tipoPersonal === "F"){
            setRadios({
                observed: false,
                pass: false,
                pending: true               
            })
        }else{
            if(tipoPersonal === "E"){
                setRadios({
                    observed: false,
                    pass: false,
                    pending: true                
                })
            }
        }
    }
    
    const changeStateObserved = e => {
        if(tipoPersonal === "F"){
            setRadios({
                observed: true,
                pass: false,
                pending: false               
            })
        }else{
            if(tipoPersonal === "E"){
                setRadios({
                    observed: true,
                    pass: false,
                    pending: false                
                })
            }
        }
    }

    const changeComments = e => {
        setData({
            ...data,
            entregaConvenioyPlan: {
                ...data.entregaConvenioyPlan,
                [e.target.name]: e.target.value
            }
        })
    }    
    let typeApprovalStateFACI = "";
    switch(staticFaci) {
        case "Observado": typeApprovalStateFACI = "warning"; break;
        case "Aprobado": typeApprovalStateFACI = "success"; break;
        case "Pendiente": typeApprovalStateFACI = "pending"; break;        
        default: typeApprovalStateFACI = "error"; break;
    }
    let typeApprovalStateEsp = "";
    switch(staticEsp) {
        case "Observado": typeApprovalStateEsp = "warning"; break;
        case "Aprobado": typeApprovalStateEsp = "success"; break;
        case "Pendiente": typeApprovalStateEsp = "pending"; break;        
        default: typeApprovalStateEsp = "error"; break;
    }


    return (
        data.entregaConvenioyPlan && <LayoutCoordFACI>
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
                                        checked={radios.pass}
                                        onChange={changeStatePassed}
                                    />
                                    <Form.Check
                                        inline
                                        label="Observado"
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-2`}
                                        checked={radios.observed}
                                        onChange={changeStateObserved}
                                    />
                                    <Form.Check
                                        inline                                    
                                        label="Pendiente de revisión"
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-3`}
                                        checked={radios.pending}
                                        onChange={changeStatePending}
                                    />
                                </div>
                            ))}
                        </Form>
                    </div>
                </div>
                
                <div className="shadowbox">
                    <div className="row row2" style={{textAlign: "left",marginTop:"25px"}}>
                        <h2 className="subtitulo">Observaciones</h2>                                               
                            <Form.Control className="observaciones"
                                placeholder="Escriba las observaciones de la entrega"                                                    
                                onChange = {changeComments}
                                defaultValue = {data.entregaConvenioyPlan.observations} 
                                name="comments"
                                as="textarea" 
                                rows={10}                                                             
                            />                                         
                    </div>
                </div>
                <div className="shadowbox">
                    <div className="row row1" style={{textAlign: "left",marginTop:"25px"}}>                                       
                        <FileManagement canUpload={true} docs={docsCoord} maxFiles={2} titleUpload="Documentos a enviar al alumno" titleUploadedFiles="Documentos enviados al alumno"/>
                    </div>
                </div>
                {/* <div className="row botones" style={{marginLeft:"10px"}}>                    
                    <Button  className="btn btn-sec" style={{width:"20%",marginRight:"50px"}}>Regresar</Button>                   
                    <Button  className="btn btn-pri" style={{width:"20%",marginLeft:"50px"}} onClick={update}>Guardar</Button>                  
                </div>  */}          
            </div>   
        </LayoutCoordFACI>
    );
}
