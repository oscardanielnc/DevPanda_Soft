import React, {useState,useEffect} from "react";
import LayoutBasic from "../layouts/LayoutBasic";
import {default as LayoutCoord} from "../layouts/LayoutCoordFACI";
import {Form,Button,Row,Col,Alert} from 'react-bootstrap';
import { specialtyInsertApi } from "../api/specialty";
import GeneralData from "../components/Charts/GeneralData";
import AboutCompany from "../components/Charts/AboutCompany";
import { ToastContainer, toast } from 'react-toastify';
import AboutJob from "../components/Charts/AboutJob";
import AboutDurationPSP from "../components/Charts/AboutDurationPSP";
import DirectBoss from "../components/Charts/DirectBoss";
import CalificationFormStudent from "../components/Charts/CalificationFormStudent";
import StateViewer,{StatesViewType} from "../components/StateViewer/StateViewer";
import DocumentPlusIcon from "../components/DocumentPlusIcon/DocumentPlusIcon";
import FileManagement from "../components/FileManagement/FileManagement";
import useAuth from "../hooks/useAuth";
import { getstudentInscriptionForm,registrationUpdateApiStudent,registrationUpdateApiStudentCamps,getListOfCountry,getLineBusinessList } from "../api/registrationForm";
import { getAllDocsApi,uploadDocsApi } from "../api/files";
import ShowFiles from "../components/FileManagement/ShowFiles";

import './StudentRegistrationForm.scss';
import { useParams } from "react-router-dom";

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
     "aboutBoss": {//         "name":"Hugo Carlos",
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

const arrayCadena = window.location.pathname.split("/");
//const idAlumno=parseInt(arrayCadena[2]);
const maxFiles = 4;

export default function StudentRegistrationForm () {
    const {user} = useAuth();
    const idAlumno= useParams().idStudent;
    const [data, setData] = useState({});
    //const [data, setData] = useState(dataDummy);
    const [countries,setCountries]=useState({});
    //const [countries,setCountries]=useState(paisesDummy);
    const [lineBusiness,setLineBusiness]=useState({});
    //const [lineBusiness,setLineBusiness]=useState(lineBussinessDummy);
    const [fileList, setFileList] = useState([])
    const [docs, setDocs] = useState([]);
    const [studentDocs, setStudentDocs] = useState([]);
    let typeUser=user.tipoPersona;
    if(typeUser==="p"){
        typeUser=user.tipoPersonal;
    }else{

    }
    //console.log("El arrayCadena es: ",window.location.pathname);
    //debugger
    if(isNaN(idAlumno)) window.location.reload();

    console.log("El idAlumno es: ",idAlumno);
    
    useEffect(()=> {
        const fetchData = async () => {
            const result = await getstudentInscriptionForm(idAlumno);
            const resultado=await getListOfCountry();
            const resultado2=await getLineBusinessList();
           // console.log("El result en la principal es: ",result);
            //console.log("El resultado en la principal es: ",resultado);
           // console.log("El resultado2 en la principal es: ",resultado2);
           
            if(result.success) {
                const resData = result.infoFicha.infoFicha;
                if(typeUser==="e"){
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
                } else
                    setData(resData);
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
        }
        fetchData()
    }, [setData])

    //sacamos los documentos subidos por el encargado
    useEffect(() => {
        const fetchData = async () => {
            const result = await getAllDocsApi(`1-${user.fidEspecialidad}-RFOR`, 0);
            if(result.success) {
                setDocs(result.docs)
            }
        }
        fetchData()
    },[setDocs])
    //sacamos los documentos subidor por el alumno
    useEffect(() => {
        const fetchData = async () => {
            const result = await getAllDocsApi(`1-${user.fidEspecialidad}-RFOR-${idAlumno}`, 1);
            if(result.success) {
                setStudentDocs(result.docs)
            }
        }
        fetchData()
    },[setStudentDocs])

    if(!data.generalData) return null

    const deliver = async () => {
        if(fileList.length <= maxFiles && fileList.length!=0) {
            const response = await uploadDocsApi(fileList, `1-${user.fidEspecialidad}-RFOR-${idAlumno}`, 1);
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
    const insert = async e => {
        e.preventDefault();
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
        }
    }
    let isSaved=null;
    let canUpload=null;
    if(typeUser==="e"){
        isSaved=((data.documentsState==="Sin entregar")||
        (data.documentsState==="Entregado"&&data.approvalState==="Observado"))? false: true;
        canUpload=isSaved===false?true:false;
    }else{
        isSaved=true;
        canUpload=true;
    }
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

    const insertCoordinator = async e => {
        e.preventDefault();
        let response=null;
        const newData = {
            ...data,
            // dateModified:new Date()
        }
        response = await registrationUpdateApiStudent(newData);
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
            isSaved=true;
        } 
    }

    const goBack = e => {
        window.history.back();
    }

    return (
        typeUser==="e"? <LayoutBasic>
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
                </div>
                <div className="row rows">
                    <GeneralData data={data} setData={setData} imStudent={isSaved} isSaved={isSaved}/>   
                </div>
                <div className="row rows">
                    <AboutCompany data={data} setData={setData} notgrabado={isSaved} countries={countries} lineBusiness={lineBusiness}/>
                </div>
                <div className="row rows">
                    <AboutJob data={data} setData={setData} notgrabado={isSaved}/>
                </div>
                <div className="row rows">
                    <AboutDurationPSP data={data} setData={setData} notgrabado={isSaved}/>
                </div>
                <div className="row rows">
                    <DirectBoss data={data} setData={setData} notgrabado={isSaved}/>
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
        </LayoutBasic>: <LayoutCoord>
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
                </div>
                <div className="row rows">
                    <GeneralData data={data} setData={setData} imStudent={isSaved} isSaved={isSaved}/>   
                </div>
                <div className="row rows">
                    <AboutCompany data={data} setData={setData} notgrabado={isSaved} countries={countries} lineBusiness={lineBusiness}/>
                </div>
                <div className="row rows">
                    <AboutJob data={data} setData={setData} notgrabado={isSaved}/>
                </div>
                <div className="row rows">
                    <AboutDurationPSP data={data} setData={setData} notgrabado={isSaved}/>
                </div>
                <div className="row rows">
                    <DirectBoss data={data} setData={setData} notgrabado={isSaved}/>
                </div>
                <div className="row rows uploadRegistration" >                            
                    <FileManagement canUpload={canUpload} docs={studentDocs} maxFiles={4} setFileList={setFileList} titleUploadedFiles="Archivos subidos por el alumno"/>
                </div>
                <div className="row rows">
                    <CalificationFormStudent data={data} setData={setData} notgrabado={false}/>
                </div> 
                <div className="row rows">
                    <div className="container Comments">
                        <nav className="navbar navbar-fixed-top navbar-inverse bg-inverse "style={{ backgroundColor: "#E7E7E7"}}>
                            <h3 style={{"marginLeft":"15px"}}>Observaciones</h3>
                        </nav>
                        <div className="row rows" >
                            <Form.Control className="observaciones"
                                    placeholder="Esciba las observaciones de la entrega" 
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
                <div className="row rows" >
                <div className="col-sm-2 subtitles">
                </div>
                <div className="col-sm-4 botons">
                    <Button variant="primary" onClick={goBack} style={{"marginBottom":"4px"}}>Regresar</Button>
                </div>
                <div className="col-sm-4 botons">
                    <Button variant="primary" onClick={insertCoordinator} style={{"marginBottom":"4px"}}>Guardar</Button>
                </div>
                <div className="col-sm-2 subtitles">
                </div>
                </div> 
                <div className="row rows">
                    
                </div>
            </div>
        </LayoutCoord>
    )

}
