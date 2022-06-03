import React, {useState,useEffect} from "react";
import LayoutBasic from "../../layouts/LayoutBasic";
import LayoutAdministrative from "../../layouts/LayoutAdministrative";
import {Form,Button,Row,Col,Alert} from 'react-bootstrap';
import { specialtyInsertApi } from "../../api/specialty";
import GeneralData from "../../components/Charts/GeneralData";
import AboutCompany from "../../components/Charts/AboutCompany";
import { ToastContainer, toast } from 'react-toastify';
import AboutJob from "../../components/Charts/AboutJob";
import AboutDurationPSP from "../../components/Charts/AboutDurationPSP";
import DirectBoss from "../../components/Charts/DirectBoss";
import CalificationFormStudent from "../../components/Charts/CalificationFormStudent";
import StateViewer,{StatesViewType} from "../../components/StateViewer/StateViewer";
import DocumentPlusIcon from "../../components/DocumentPlusIcon/DocumentPlusIcon";
import FileManagement from "../../components/FileManagement/FileManagement";
import useAuth from "../../hooks/useAuth";
import { getstudentInscriptionForm,registrationUpdateApiStudent,registrationUpdateApiStudentCamps,getListOfCountry,getLineBusinessList } from "../../api/registrationForm";
import { getAllDocsApi,uploadDocsApi } from "../../api/files";
import ShowFiles from "../../components/FileManagement/ShowFiles";

import './scss/StudentRegistrationForm.scss';
import { useParams } from "react-router-dom";
import PandaLoaderPage from "../General/PandaLoaderPage";
import { isNotEmptyObj } from "../../utils/objects";

//consultar a Oscar
const documents={

}

 const dataDummy = {
     "idAlumno": 1,
     "idAlumnoProceso": 1,
     "idFicha": 9,
     "documentsState": "Sin entregar",
     "approvalState": "Desaprobado",
     "generalData": {
         "name": "Oscar Daniel",
         "lastname": "Navarro Cieza",
         "code": "20186008",
         "email": "oscar.navarro@pucp.edu.pe",
         "cellphone": 929178606,
         "personalEmail": "oscar@prueba.com",
     },
     "aboutCompany": {
         "isNational": true,
         "ruc": "1234567890",
         "companyName": "Empresa SAC",
         "country":2,
         "lineBusiness":4,
          "companyAddress":""
     },
     "aboutJob": {
         "areaName": "TI",
         "jobTitle": "Analista de información",
         "activities": "Recopilar información de las base de datos y generar reportes"
     },
     "aboutPSP": {
         "dateStart":"",
         "dateEnd":"",
         "dailyHours": 6,
         "weekHours": 30
     },
     "aboutBoss": {
        "name":"Hugo Carlos",
         "area":"TI",
         "email":"hugoCar1548@gmail.com",
         "cellphone":"9856875564"
     },
     "calification": {
         "comments":"Buen trabajo"
     },
     "others": [
         {
             "idCampoProceso":28,
             "idCampoLlenado":7,
             "nombreCampo":"Pais",
             "seccion": "Sobre la PSP",
             "flag": "obligatorio",
             "valorAlumno": 'AA'
         },
         {
             "idCampoProceso":29,
             "idCampoLlenado":9,
             "nombreCampo": "Giro",
             "seccion": "Sobre el jefe",
             "flag": "opcional",
             "valorAlumno": "Electrodomésticos"
         },
         {
             "idCampoProceso":30,
             "idCampoLlenado":10,
             "nombreCampo": "nuevodato",
             "seccion": "Sobre el jefe",
             "flag": "opcional",
             "valorAlumno": "xxxxx"
         }
     ]

}

const paisesDummy=[
    {
        "idPais":1,
        "nombrePais":"Perú"
    },
    {
        "idPais":2,
        "nombrePais":"Argentina"
    },
    {
        "idPais":3,
        "nombrePais":"Bolivia"
    }

]

const lineBussinessDummy=[
    {
        "idLineaNegocio":1,
        "nombreLineaNegocio":"TI"
    },
    {
        "idLineaNegocio":2,
        "nombreLineaNegocio":"Software"
    },
    {
        "idLineaNegocio":3,
        "nombreLineaNegocio":"Administracion"
    }

]

//const idAlumno=parseInt(arrayCadena[2]);
const maxFiles = 4;
const validacionesGenenal=[false, false];
const validacionesCompany=[false];
const validacionesPSP=[false, false];
const validacionesBoss=[false, false];

export default function StudentRegistrationForm () {
    const {user} = useAuth();
    const idAlumno= user.idPersona;
    const [data, setData] = useState({});
    //const [data, setData] = useState(dataDummy);
    const [countries,setCountries]=useState({});
    //const [countries,setCountries]=useState(paisesDummy);
    const [lineBusiness,setLineBusiness]=useState({});
    //const [lineBusiness,setLineBusiness]=useState(lineBussinessDummy);
    const [fileList, setFileList] = useState([])
    const [docs, setDocs] = useState([]);
    const [studentDocs, setStudentDocs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [correctoFormato,setCorrectoFormato]=useState(true);
    let typeUser=user.tipoPersona;
    //console.log("El arrayCadena es: ",window.location.pathname);
    //debugger
    if(isNaN(idAlumno)) window.location.reload();

    console.log("El idAlumno es: ",idAlumno);
    
    useEffect(()=> {
        const fetchData = async () => {
            setLoading(true);
            const result = await getstudentInscriptionForm(idAlumno);
            const resultado=await getListOfCountry();
            const resultado2=await getLineBusinessList();
           // console.log("El result en la principal es: ",result);
            //console.log("El resultado en la principal es: ",resultado);
           // console.log("El resultado2 en la principal es: ",resultado2);
           
            if(result.success) {
                const resData = result.infoFicha.infoFicha;
                const newData = {
                    idAlumno: resData.idAlumno,
                    idAlumnoProceso: resData.idAlumnoProceso,
                    idFicha: resData.idFicha,
                    documentsState: resData.documentsState,
                    approvalState: resData.approvalState,
                    generalData: {
                        name: user.nombres,
                        lastname:user.apellidos,
                        code:user.codigo,
                        email:user.correo,
                        cellphone: resData.generalData.cellphone,
                        personalEmail: resData.generalData.personalEmail
                    },
                    aboutCompany: resData.aboutCompany,
                    aboutJob:resData.aboutJob,
                    aboutPSP: resData.aboutPSP,
                    aboutBoss:resData.aboutBoss,
                    calification:resData.calification,
                    others: resData.others,
                }
                setData(newData)  
            }
            
            if(resultado.success){
                //console.log("En el principal el resultado es: ",resultado);
                const countriesData = resultado.data;
                setCountries(countriesData);
            }
            
            if(resultado2.success){
                const lineData = resultado2.data;
                setLineBusiness(lineData);
            }
            setLoading(false);
        }
        fetchData()
    }, [setData])

    //sacamos los documentos subidos por el encargado
    useEffect(() => {
        const fetchData = async () => {
            const result = await getAllDocsApi(`${user.fidProceso}-FINS`, 0);
            if(result.success) {
                setDocs(result.docs)
            }
        }
        fetchData()
    },[setDocs])
    //sacamos los documentos subidor por el alumno
    useEffect(() => {
        const fetchData = async () => {
            const result = await getAllDocsApi(`${user.fidProceso}-FINS-${idAlumno}`, 1);
            if(result.success) {
                setStudentDocs(result.docs)
            }
        }
        fetchData()
    },[setStudentDocs])

    // if(!data.generalData) return null
    function fieldsComplete(){
        let resultadoGeneral= data.generalData.cellphone!=="" && data.generalData.cellphone!=null;
        let resultadoCompany=true;
        console.log("El resultadoGeneral es: ",resultadoGeneral);
        if(data.aboutCompany.isNational){
            resultadoCompany= data.aboutCompany.ruc!=="" && data.aboutCompany.ruc!=null
        }

        resultadoCompany= resultadoCompany && (data.aboutCompany.companyName!=="" && data.aboutCompany.companyName!=null)
                &&(data.aboutCompany.country!=="" && data.aboutCompany.country!=null && data.aboutCompany.country>0) &&(data.aboutCompany.lineBusiness!=="" && data.aboutCompany.lineBusiness!=null && data.aboutCompany.lineBusiness>0)
                &&(data.aboutCompany.companyAddress!=="" && data.aboutCompany.companyAddress!=null);
                
        console.log("El resultadoCompany es: ",resultadoCompany);
        
        const resultadoJob= (data.aboutJob.areaName!=="" && data.aboutJob.areaName!=null)
                &&(data.aboutJob.jobTitle!=="" && data.aboutJob.jobTitle!=null) &&(data.aboutJob.activities!=="" && data.aboutJob.activities!=null);
        
        console.log("El resultadoJob es: ",resultadoJob);
                
        const resultadoPSP=(data.aboutPSP.dateStart!=="" && data.aboutPSP.dateStart!=null)
                &&(data.aboutPSP.dateEnd!=="" && data.aboutPSP.dateEnd!=null) &&(data.aboutPSP.dailyHours!=="" && data.aboutPSP.dailyHours!=null)
                &&(data.aboutPSP.weekHours!=="" && data.aboutPSP.weekHours!=null);
        console.log("El resultadoPSP es: ",resultadoPSP);        
        
        const resultadoBoss= (data.aboutBoss.name!=="" && data.aboutBoss.name!=null) && (data.aboutBoss.area!=="" && data.aboutBoss.area!=null)
                &&(data.aboutBoss.email!=="" && data.aboutBoss.email!=null) &&(data.aboutBoss.cellphone!=="" && data.aboutBoss.cellphone!=null);
        console.log("El resultadoBoss es: ",resultadoBoss);  

        let resultadoOthers=true;
        data.others.map((e,index) => {
            if(e.flag==="obligatorio"){
                resultadoOthers=resultadoOthers&&(e.valorAlumno!=null && e.valorAlumno!=="");
            }
        })
        console.log("El resultadoOthers es: ",resultadoOthers); 

        const resultado=resultadoGeneral&&resultadoCompany&&resultadoJob&&resultadoPSP
            &&resultadoBoss&&resultadoOthers;

        return resultado;
    }
    const deliver = async () => {
        if(fileList.length <= maxFiles && fileList.length!==0) {
            const response = await uploadDocsApi(fileList, `${user.fidProceso}-FINS-${idAlumno}`, 1);
            if(response.success) {
                toast.success(response.msg, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                window.location.reload();
           } else {
               toast.error(response.msg, {
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
    function validation(){
        let resultadoGeneral= validacionesGenenal[0];
        if(data.generalData.personalEmail!=="" && data.generalData.personalEmail!=null){
            resultadoGeneral=resultadoGeneral&&validacionesGenenal[1];
        }
        let resultadoCompany=true;
        if(data.aboutCompany.isNational){
            resultadoCompany= resultadoCompany&&validacionesCompany[0];
        }
        let resultadoPSP= validacionesPSP[0] && validacionesPSP[1];
        let resultadoBoss= validacionesBoss[0] && validacionesBoss[1];
        const resultado=resultadoGeneral&&resultadoCompany&&resultadoPSP&&resultadoBoss;
        return resultado;
    }
    const insert = async e => {
        e.preventDefault();
        if(fieldsComplete()){
            console.log("En el insert el correctoFormato es: ",correctoFormato," y el email es: ",data.generalData.personalEmail);
            let formattCorrect=validation();
            if(formattCorrect){
                const newData = {
                    ...data,
                    documentsState: "Entregado",
                    approvalState: "Sin calificar",
                    // dateModified:new Date()
                }
                const response = await registrationUpdateApiStudentCamps(newData);
                if(!response.success){
                    toast.error(response.msg, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setData({
                        ...data,
                        idAlumno: data.idAlumno,
                        idAlumnoProceso: data.idAlumnoProceso,
                        idFicha: data.idFicha,
                        documentsState: "Sin entregar",
                        approvalState: "Sin entregar",
                       // dateModified:data.dateModified,
                        generalData: data.generalData,
                        aboutCompany: data.aboutCompany,
                        aboutJob:data.aboutJob,
                        aboutPSP: data.aboutPSP,
                        aboutBoss:data.aboutBoss,
                        calification:data.calification,
                        others: data.others,
                    })
                }else{
                    toast.success(response.msg, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    deliver();
                    setData(newData);
                    window.scrollTo(0, 0);
                }
            }else{
                toast.warn("No está cumpliendo con los formatos establecidos", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            
        }else{
            toast.warn("Faltan rellenar campo(s) obligatorio(s) de la ficha", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        
    }
    let isSaved=null;
    let canUpload=null;
    
    isSaved=((data.documentsState==="Sin entregar")||
    (data.documentsState==="Entregado"&&data.approvalState==="Observado"))? false: true;
    canUpload=isSaved===false?true:false;
    
    console.log("La data es: ",data);
    const typeDocumentState = (data.documentsState==="Sin entregar")? "fileEmpty": "success";
    let typeApprovalState = "";
    switch(data.approvalState) {
        case "Observado": typeApprovalState = "warning"; break;
        case "Sin entregar": typeApprovalState = "pending"; break;
        case "Sin calificar": typeApprovalState = "pending"; break;
        case "Aprobado": typeApprovalState = "success"; break;
        default: typeApprovalState = "error"; break;
    }
    console.log("El typeDocumentState es: ",typeDocumentState);
    console.log("El typeApprovalState es: ",typeApprovalState);
    const changeComments = e => {
        setData({
            ...data,
            calification: {
                ...data.calification,
                [e.target.name]: e.target.value
            }
        })
    }

    const goBack = e => {
        window.history.back();
    }
    if(loading || !isNotEmptyObj(data)) return <PandaLoaderPage type={typeUser}/>

    return (
        <LayoutBasic>
            <div className="container principal" style={{"padding":"1px"}}>
                <div className="row rows" style={{textAlign: "left"}}>
                    <h1>Ficha de Inscripción</h1>
                </div>
                <div className="row rows" style={{textAlign: "left"}}>
                    <p>
                    Aquí deberá de rellenar la información solicitada más abajo para poder continuar con el proceso. Una vez que la complete, esta será revisada para su aprobación.
                    </p>
                    <p>
                    A continuación se presenta la rúbrica para la ficha de inscripción:
                    </p>
                    <ShowFiles docs={docs} />
                </div>
                <div className="row rows">
                    <StateViewer states={[
                            StatesViewType[typeDocumentState]("Documentos", data.documentsState),
                    StatesViewType[typeApprovalState]("Aprobación", data.approvalState)]}/>
                </div>
                <div className="row rows" style={{textAlign: "left",marginBottom:"0px"}}>
                    <h2 style={{marginBottom:"0px"}}>Datos por rellenar</h2>
                    <p></p>
                    <p style={{marginBottom:"0px"}}>Los campos que son obligatorios van a estar marcados con un *</p>
                </div>
                <div className="row rows">
                    <GeneralData data={data} setData={setData} imStudent={isSaved} isSaved={isSaved} correctoFormato={correctoFormato} setCorrectoFormato={setCorrectoFormato} validacionesGenenal={validacionesGenenal}/>   
                </div>
                <div className="row rows">
                    <AboutCompany data={data} setData={setData} notgrabado={isSaved} countries={countries} lineBusiness={lineBusiness} correctoFormato={correctoFormato} setCorrectoFormato={setCorrectoFormato} validacionesCompany={validacionesCompany}/>
                </div>
                <div className="row rows">
                    <AboutJob data={data} setData={setData} notgrabado={isSaved} correctoFormato={correctoFormato} setCorrectoFormato={setCorrectoFormato}/>
                </div>
                <div className="row rows">
                    <AboutDurationPSP data={data} setData={setData} notgrabado={isSaved} correctoFormato={correctoFormato} setCorrectoFormato={setCorrectoFormato} validacionesPSP={validacionesPSP}/>
                </div>
                <div className="row rows">
                    <DirectBoss data={data} setData={setData} notgrabado={isSaved} correctoFormato={correctoFormato} setCorrectoFormato={setCorrectoFormato} validacionesBoss={validacionesBoss}/>
                </div>
                <div className="row rows">
                    <div className="container Comments">
                        <nav className="navbar navbar-fixed-top navbar-inverse bg-inverse "style={{ backgroundColor: "#E7E7E7"}}>
                            <h3 style={{"marginLeft":"15px"}}>Observaciones</h3>
                        </nav>
                        <div className="row rows" >
                            <Form.Control className="observaciones"
                                    placeholder="" 
                                    onChange={changeComments}
                                    value={data.calification.comments}
                                    name="comments"
                                    disabled={typeUser==="e"? true: false}
                                    style={{"marginBottom":"10px !important"}}
                                    as="textarea"
                                    rows={6}/>
                        </div> 
                    </div>
                </div>
                <div className="row rows uploadRegistration" >                            
                    <FileManagement canUpload={canUpload} docs={studentDocs} maxFiles={4} fileList={fileList} titleUpload="Subir archivos de Ficha de Inscripcion" setFileList={setFileList} titleUploadedFiles="Archivos subidos por el alumno"/>
                </div>
                <div className="row rows BotonAlumno">
                    <Button className="btn btn-primary" style={{width:"40%"}} onClick={insert} disabled={isSaved}>Enviar</Button>
                    <ToastContainer />
                </div>           
                <div className="col-sm-2 subtitles">
                </div>
                <div className="row rows">
                    
                </div>  
            </div>
        </LayoutBasic>
    )

}
