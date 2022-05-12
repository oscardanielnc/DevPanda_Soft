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
import { getstudentInscriptionForm,registrationUpdateApiStudent,registrationUpdateApiStudentCamps } from "../api/registrationForm";
import { getAllDocsApi } from "../api/files";
import ShowFiles from "../components/FileManagement/ShowFiles";
import {uploadDocsApi} from "../api/files";

import './StudentRegistrationForm.scss';

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
        "info": "Este es un texto largo de prueba",
        "foreignName": "",
        "foreignCountry":"",
        "foreingLineBusiness":""
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
const arrayCadena = window.location.pathname.split("/");
const idAlumno=parseInt(arrayCadena[2]);
const maxFiles = 4;
export default function StudentRegistrationForm () {
    const {user} = useAuth();
    const [data, setData] = useState({});
    const [fileList, setFileList] = useState([])
    const [docs, setDocs] = useState([]);
    const [studentDocs, setStudentDocs] = useState([]);
    console.log("El user tiene: ",user);
    //console.log("En el StudentRegistrationForm", oscar);
    console.log("En el StudentRegistrationForm:", data);
    //let typeUser=user.tipoPersona;
    let typeUser=user.tipoPersona;
    if(typeUser==="p"){
        typeUser=user.tipoPersonal;
    }
    console.log("El tipo de usuario es: ",typeUser);
    useEffect(()=> {
        console.log("En el useeffect principal");
        getstudentInscriptionForm(idAlumno).then(response => {
            const resData = response.infoFicha.infoFicha;
            if(response.success===true) {
                console.log("En el success");
                if(typeUser==="e"){
                    console.log("Estos aqui aies", data)
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
        })
        
    }, [setData])
    //sacamos los documentos subidos por el encargado
    useEffect(() => {
        getAllDocsApi(`1-${user.fidEspecialidad}-RFOR`, 0).then(response => {
            if(response.success) {
                setDocs(response.docs)
            }
        })
    },[setDocs])
    //sacamos los documentos subidor por el alumno
    useEffect(() => {
        getAllDocsApi(`1-${user.fidEspecialidad}-RFOR-${idAlumno}`, 1).then(response => {
            if(response.success) {
                setStudentDocs(response.docs)
            }
        })
    },[setStudentDocs])
    if(!data.generalData) return null
    
    console.log(data);
    console.log("Luego de hacer el new data: ",data);


    const insert = async e => {
        e.preventDefault();
        const newData = {
            ...data,
            documentsState: "Entregado",
            approvalState: "Sin calificar"
        }
        console.log("antes de enviar: ",data);
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
            console.log(response.msg);
            setData({
                ...data,
                idAlumno: data.idAlumno,
                idAlumnoProceso: data.idAlumnoProceso,
                idFicha: data.idFicha,
                documentsState: "Sin entregar",
                approvalState: "Sin entregar",
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
            setData(newData);
            console.log(response.msg);
        }
        if(fileList.length <= maxFiles) {
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
                window.location.reload()
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
       else {
           toast.warning(`Se aceptan como máximo ${maxFiles} archivos para esta entrega.`, {
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
    let isSaved=null;
    let canUpload=null;
    if(typeUser==="e"){
        isSaved=((data.documentsState==="Sin entregar")||
        (data.documentsState==="Entregado"&&data.approvalState==="Observado"))? false: true;
        if(isSaved===false){
            canUpload=true;
        }else{
            canUpload=false;
        }
    }else{
        isSaved=true;
        canUpload=false;
    }

    const typeDocumentState = (data.documentsState==="Sin entregar")? "fileEmpty": "success";
    const imStudent=(typeUser==="E")?true:false;
    let typeApprovalState = "";
    switch(data.approvalState) {
        case "Observado": typeApprovalState = "warning"; break;
        case "Sin entregar": typeApprovalState = "pending"; break;
        case "Sin calificar": typeApprovalState = "pending"; break;
        case "Aprobado": typeApprovalState = "success"; break;
        default: typeApprovalState = "error"; break;
    }


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
        //hacer una diferencia primero si es alumno o cordinador
        //en el caso del alumno por el estado de approvalState ver si es un Insertar o un Modificar
        //en el caso del coordinador ver si con el idAlumno hay alguna ficha y depende de eso Insertar o modificar 
        e.preventDefault();
        let response=null;
        
        response = await registrationUpdateApiStudent(data);
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
            isSaved=true;
        } 
        if(fileList.length <= maxFiles) {
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
                 window.location.reload()
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
        else {
            toast.warning(`Se aceptan como máximo ${maxFiles} archivos para esta entrega.`, {
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

    const goBack = e => {
        window.history.back();
     }

    return (
        data.calification && typeUser==="e"? <LayoutBasic>
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
                    <AboutCompany data={data} setData={setData} notgrabado={isSaved}/>
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
                
                <div className="row rows uploadRegistration" >                            
                    <FileManagement canUpload={canUpload} docs={studentDocs} maxFiles={4} fileList={fileList} titleUploadedFiles="Archivos subidos por el alumno"/>
                </div>
                <div className="row rows BotonAlumno">
                    <Button className="btn btn-primary" style={{width:"40%"}} onClick={insert} disabled={isSaved}>Enviar</Button>
                    <ToastContainer />
                </div>           
                <div className="col-sm-4 botons">
                    <Button variant="primary" onClick={insertCoordinator} style={{"marginBottom":"4px"}}>Guardar</Button>
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
                    <AboutCompany data={data} setData={setData} notgrabado={isSaved}/>
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
                
                <div className="row rows uploadRegistration" >                            
                    <FileManagement canUpload={canUpload} docs={studentDocs} maxFiles={2} titleUploadedFiles="Archivos subidos por el alumno"/>
                </div>
           
                <div className="row rows">
                    <CalificationFormStudent data={data} setData={setData} notgrabado={false}/>
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
