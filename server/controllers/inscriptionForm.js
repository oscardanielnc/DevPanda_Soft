const { send } = require('express/lib/response');
const mysql = require('mysql');
const {MYSQL_CREDENTIALS, API_VERSION, PORT_SERVER, IP_SERVER} = require("../config");


//Te permite actualizar los campos de la ficha de inscripcion
async function updateFieldsInscriptionForm(req, res){
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);

    const fidAlumnoProceso = req.body.idAlumnoProceso;
    const fidFicha = req.body.idFicha;
    var resultElement;
    //console.log("El body tiene: ",req.body);
    functionUpdate = () =>{
        return new Promise((resolve, reject)=>{
            connection.query(sqlQuery, async (err, result) => {
                if (err) {
                    return reject(err);
                }else{
                    return resolve(result.affectedRows)
                }
            })
        })
    }
    console.log("Antes de update: ");
    console.log("El body tiene: ",req.body);
    var sqlQuery = `UPDATE EntregaFichaInscripcion
                    SET 
                    aprobado = "${req.body.approvalState}",
                    estadoDocumento = "${req.body.documentsState}",
                    nombres = "${req.body.generalData.name}",
                    apellidos = "${req.body.generalData.lastname}",
                    codigoPUCP = "${req.body.generalData.code}",
                    correoPUCP = "${req.body.generalData.email}",
                    correoPersonal = "${req.body.generalData.personalEmail}",
                    celular = "${req.body.generalData.cellphone}",

                    esNacional = ${req.body.aboutCompany.isNational},
                    ruc = "${req.body.aboutCompany.ruc}",
                    infoEmpresa = "${req.body.aboutCompany.info}",
                    nombreEmpresaExtranjera = "${req.body.aboutCompany.foreignName}",
                    paisEmpresaExtranjera = "${req.body.aboutCompany.foreignCountry}",
                    lineaNegocioEmpresaExtranjera = "${req.body.aboutCompany.foreignLineBusiness}",

                    nombreArea = "${req.body.aboutJob.areaName}",
                    puesto = "${req.body.aboutJob.jobTitle}",
                    funcionesActividades = "${req.body.aboutJob.activities}",
                    
                    fechaInicio = "${req.body.aboutPSP.dateStart}",
                    fechaFin = "${req.body.aboutPSP.dateEnd}",
                    horasDiarias = ${req.body.aboutPSP.dailyHours},
                    horasSemanales = ${req.body.aboutPSP.weekHours},

                    nombreJefe= "${req.body.aboutBoss.name}",
                    correoJefe= "${req.body.aboutBoss.email}",
                    celularJefe = "${req.body.aboutBoss.cellphone}",
                    areaJefe = "${req.body.aboutBoss.area}"
                    WHERE fidAlumnoProceso = ${fidAlumnoProceso}
                    AND idFicha = ${fidFicha}`
    
    connection.connect(err => {
        if (err) throw err;
    });


    try{
        console.log("Antes de await: ");
        resultElement = await functionUpdate();
        console.log("Despues de await: ");
        if(!resultElement){
            res.status(404).send({ message: "No se actualizó ninguna fila"})
            return 
        } 
    }catch(e){
        res.status(505).send({ message: "Error en el servidor " + e.message})
        return 
    }  

    var campos = req.body.others;
    console.log("Antes del for");
    for(element of campos){
        
        sqlQuery = `UPDATE CampoLlenadoFichaInscripcion
                    SET valorAlumno = "${element.valorAlumno}"
                    WHERE idCampoLlenado= ${element.idCampoLlenado}
                    AND fidCampoProceso = ${element.idCampoProceso}
                    AND fidFicha = ${fidFicha}`;

        try{
            resultElement = await functionUpdate();
            if(!resultElement){
                res.status(404).send({ message: "No se pudo actualizar el campo: " + element.nombreCampo})
                return 
            } 
        }catch(e){
            res.status(505).send({ message: "Error en el servidor " + e.message})
            return 
        }  
    }
    console.log("Despues del for");
    res.status(200).send({
        message: "Campos actualizados correctamente"
    })
    connection.end();
    console.log("Despues del end");
}

//Te permite actualizar los datos de la ficha de inscripcion
async function updateInscriptionForm(req, res){
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);
    console.log("El body tiene: ",req.body);
    const idFicha = req.body.idFicha;
    const idAlumnoProceso = req.body.idAlumnoProceso;
    const aprobado = req.body.approvalState;
    const estadoDocumento = req.body.documentsState;
    const observaciones = req.body.calification.comments;
    
    const sqlQuery = `UPDATE EntregaFichaInscripcion 
                    SET aprobado="${aprobado}", 
                    estadoDocumento="${estadoDocumento}", 
                    observaciones="${observaciones}"
                    WHERE fidAlumnoProceso = ${idAlumnoProceso}
                    AND idFicha = ${idFicha}`;


    connection.connect(err => {
        if (err) throw err;
    });

    
    connection.query(sqlQuery, (err, result) => {
        if(err){
            res.status(505).send({
                message: "Error inesperado del servidor: " + err.message
            })
        }else{
            if(!result.affectedRows){
                res.status(404).send({
                    message: "No se actualizó ninguna fila"
                })
            }else{
                res.status(200).send({
                    message: "Valores actualizados correctamente"
                })
            }
        }   
    });
    connection.end();
}

//Te permite obtener la ficha de inscripcion de un alumno en especifico
async function getstudentInscriptionForm(req, res){
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);
    
    var resultElement = []
    var data ={
        "idAlumno": "",
        "idAlumnoProceso": "",
        "idFicha": "",
        "documentsState": "",
        "approvalState": "",
        "generalData": {
            "name": "",
            "lastname": "",
            "code": "",
            "email": "",
            "cellphone": "",
            "personalEmail": ""
        },
        "aboutCompany": {
            "isNational": "",
            "ruc": "",
            "info": "",
            "foreignName": "",
            "foreignCountry": "",
            "foreignLineBusiness":""
        },
        "aboutJob": {
            "areaName": "",
            "jobTitle": "",
            "activities": ""
        },
        "aboutPSP": {
            "dateStart": "",
            "dateEnd": "",
            "dailyHours": "",
            "weekHours": "" 
        },
        "aboutBoss": {
            "name": "",
            "area": "",
            "email": "",
            "cellphone": ""
        },
        "calification": {
            "comments": ""
        },
        "others":[]
    }

    functionSelect = () =>{
        return new Promise((resolve, reject)=>{
            connection.query(sqlQuery, async (err, result) => {
                if (err) {
                    return reject(err);
                }else{
                    return resolve(result)
                }
            })
        })
    }

    functionInsert = () =>{
        return new Promise((resolve, reject)=>{
            connection.query(sqlQuery, sqlObj, async (err, result) => {
                if (err) {
                    return reject(err);
                }else{
                    return resolve(result.insertId);
                }
            })
        })
    }

    data.idAlumno = parseInt(req.params.idAlumno)

    var sqlQuery = `SELECT idAlumnoProceso 
                    FROM AlumnoProceso 
                    WHERE fidAlumno = ${data.idAlumno}
                    AND nota is null`;

    connection.connect(err => {
        if (err) throw err;
    });
    
    try{
        resultElement  = await functionSelect();
        if(!resultElement.length){
            res.status(404).send({ message: "No se encontro a un alumno con ese identificador"})
            return 
        } 
    }catch(e){
        res.status(505).send({ message: "Error en el servidor " + e.message})
        return 
    }  

    const fidAlumnoProceso = resultElement[0].idAlumnoProceso
    data.idAlumnoProceso = fidAlumnoProceso;
    
    //##############################################################
    //#########  Obtenemos la Ficha de inscripción del alumno ######
    //##############################################################

    sqlQuery = `SELECT *
                FROM EntregaFichaInscripcion
                WHERE fidAlumnoProceso = ${fidAlumnoProceso}`;

    try{
        resultElement = await functionSelect();
    }catch(e){
        res.status(505).send({ message: "Error inesperado en el servidor " + e.message})
        return 
    }   
    
    //Si no hay una ficha Asociada:
    if(!resultElement.length){
        //TO DO:
        //Debemos insertar una Entrega de ficha de inscripcion al alumno

        const aprobado = "Sin entregar";
        const estadoDocumento = "Sin entregar";
        const observaciones = "";

        var sqlObj = {
            fidAlumnoProceso, aprobado, estadoDocumento, observaciones
        };
        
        sqlQuery = `INSERT INTO EntregaFichaInscripcion SET ?`;

        try{
            resultElement  = await functionInsert();
            if(!resultElement){
                res.status(404).send({ message: "No se pudo insertar una Entrega Ficha Inscripcion para el Alumno"})
                return 
            } 
        }catch(e){
            res.status(505).send({ message: "Error en el servidor " + e.message})
            return 
        }  
        
        data.idFicha = resultElement
        data.documentsState = estadoDocumento
        data.approvalState = aprobado

        //Agregamos los campos extras
        sqlQuery = `SELECT CP.idCampoProceso, null as idCampoLlenado, CF.nombreCampo, CF.seccion, CP.flag, null as valorAlumno
                    FROM CampoFichaInscripcion CF, CampoFichaInscripcionProceso CP, Proceso P, AlumnoProceso A
                    WHERE CF.fidEspecialidad = P.fidEspecialidad
                    AND A.idAlumnoProceso = ${fidAlumnoProceso}
                    and A.fidProceso = P.idProceso
                    AND CF.idCampo = CP.fidCampoFicha
                    AND CF.flag = "activo"
                    order by CF.seccion`;

        try{
            resultElement  = await functionSelect();
        }catch(e){
            res.status(505).send({ message: "Error inesperado en el servidor " + e.message})
            return 
        }   

        data.others = resultElement;
        
    }else{

        //##############################################################
        //######## Seteamos la data del alumno dentro del objeto ####### 
        //##############################################################

        data.idFicha = resultElement[0].idFicha;
        data.documentsState = resultElement[0].estadoDocumento;
        data.approvalState = resultElement[0].aprobado;
    
        data.generalData.name = resultElement[0].nombres;
        data.generalData.lastname = resultElement[0].apellidos;
        data.generalData.code = resultElement[0].codigoPUCP,
        data.generalData.email = resultElement[0].correoPUCP;
        data.generalData.personalEmail = resultElement[0].correoPersonal;
        data.generalData.cellphone = resultElement[0].celular;
    
        data.aboutCompany.isNational = resultElement[0].esNacional;
        data.aboutCompany.ruc = resultElement[0].ruc;
        data.aboutCompany.info = resultElement[0].infoEmpresa;
        data.aboutCompany.foreignName = resultElement[0].nombreEmpresaExtranjera;
        data.aboutCompany.foreignCountry = resultElement[0].paisEmpresaExtranjera;
        data.aboutCompany.foreignLineBusiness = resultElement[0].lineaNegocioEmpresaExtranjera;
        
        data.aboutJob.areaName = resultElement[0].nombreArea;
        data.aboutJob.jobTitle = resultElement[0].puesto;
        data.aboutJob.activities = resultElement[0].funcionesActividades;
   
        data.aboutPSP.dateStart = resultElement[0].fechaInicio;
        data.aboutPSP.dateEnd = resultElement[0].fechaFin;
        data.aboutPSP.dailyHours = resultElement[0].horasDiarias;
        data.aboutPSP.weekHours = resultElement[0].horasSemanales;
    
        data.aboutBoss.name = resultElement[0].nombreJefe;
        data.aboutBoss.email = resultElement[0].correoJefe;
        data.aboutBoss.cellphone = resultElement[0].celularJefe;
        data.aboutBoss.area = resultElement[0].areaJefe;
    
        data.calification.comments = resultElement[0].observaciones;

        //Agregamos los campos extras
        sqlQuery = `SELECT CP.idCampoProceso, CL.idCampoLlenado, CF.nombreCampo, CF.seccion, CP.flag, CL.valorAlumno
                    FROM CampoFichaInscripcion CF, CampoFichaInscripcionProceso CP, CampoLlenadoFichaInscripcion CL, EntregaFichaInscripcion E
                    WHERE CF.idCampo = CP.fidCampoFicha
                    AND CF.flag = "activo"
                    AND CL.fidFicha = E.idFicha
                    AND E.fidAlumnoProceso = ${fidAlumnoProceso}
                    AND CP.idCampoProceso = CL.fidCampoProceso`;

        try{
            resultElement  = await functionSelect();
        }catch(e){
            res.status(505).send({ message: "Error inesperado en el servidor " + e.message})
            return 
        }   

        data.others = resultElement;
    }

    res.status(200).send({infoFicha: data})
    connection.end();
}

//Devuelve lista de estudiantes con ficha de inscripción que han hecho la entrega
function getListStudentsInscriptionForm(req, res){
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);
    
    const  fidEspecialidad = req.params.idEspecialidad;

    const sqlQuery = `select Pe.nombres, Pe.apellidos, E.aprobado, AP.fidAlumno
                        from EntregaFichaInscripcion E, AlumnoProceso AP, Alumno A, Proceso P, Persona Pe
                        where P.fidEspecialidad = ${fidEspecialidad}
                        and Pe.idPersona = A.idAlumno 
                        and A.idAlumno = AP.fidAlumno
                        and AP.fidProceso = P.idProceso
                        and E.fidAlumnoProceso = AP.idAlumnoProceso
                        and P.procesoActivo = true
                        and E.nombres is not null`;

    connection.connect(err => {
        if (err) throw err;
    });

    connection.query(sqlQuery, (err, result) => {
        if (err) {
            res.status(505).send({
                message: "Error inesperado en el servidor " + err.message
            })
        }else{
            res.status(200).send(result);
        }
    });

    connection.end();
}


module.exports = {
    // selectSubmittedInscriptionForm,
    // selectFieldsInscriptionFormSpecialty,
    // selectDocumentsSubmittedInscriptionForm,
    // insertSubmittedInscriptionForm,
    // insertDocumentSubmittedInscriptionForm,
    // insertFieldFilledInscriptionForm,
    // updateDocumentSubmittedInscriptionForm,
    // selectFieldsFilledInscriptionFormStudent,
    // getstudentInscriptionForm,

    getstudentInscriptionForm,
    updateInscriptionForm,
    updateFieldsInscriptionForm,
    getListStudentsInscriptionForm
}



// //Te permite ver la Entrega Ficha de Inscripcion asociada a un alumno.
// function selectSubmittedInscriptionForm(req, res) {
//     const connection = mysql.createConnection(MYSQL_CREDENTIALS);
    
//     const  fidAlumnoProceso = req.params.fidAlumnoProceso;
//     //const  fidAlumnoProceso = req.body.fidAlumnoProceso;

//     const sqlQuery = `SELECT *
//                     FROM EntregaFichaInscripcion
//                     WHERE fidAlumnoProceso = ${fidAlumnoProceso}`;

//     connection.connect(err => {
//         if (err) throw err;
//     });

//     connection.query(sqlQuery, (err, result) => {
//         if (err) {
//             res.status(505).send({
//                 message: "Error inesperado en el servidor"
//             })
//         }else{
//             res.status(200).send(result[0]);
//         }
//     });

//     connection.end();
// }

// //Te permite ver todos los campos activos asociados a una especialidad
// function selectFieldsInscriptionFormSpecialty(req, res) {
//     const connection = mysql.createConnection(MYSQL_CREDENTIALS);
    
//     const  fidEspecialidad = req.params.fidEspecialidad;
//     //const  fidEspecialidad = req.body.fidEspecialidad;

//     const sqlQuery = `SELECT CF.idCampo, CF.nombreCampo, CF.seccion, CP.flag
//                     FROM CampoFichaInscripcion CF, CampoFichaInscripcionProceso CP
//                     WHERE CF.fidEspecialidad = ${fidEspecialidad}
//                     AND CF.idCampo = CP.fidCampoFicha
//                     AND CF.flag = "activo"`;

//     connection.connect(err => {
//         if (err) throw err;
//     });

//     connection.query(sqlQuery, (err, result) => {
//         if (err) {
//             res.status(505).send({
//                 message: "Error inesperado en el servidor"
//             })
//         }else{
//             res.status(200).send(result);
//         }
//     });

//     connection.end();
// }

// ////Te permite ver todos los documentos activos asociados a una Entrega Ficha de Inscripcion
// function selectDocumentsSubmittedInscriptionForm(req, res){
//     const connection = mysql.createConnection(MYSQL_CREDENTIALS);

//     //Se pedirá el IdFicha para poder obtener los documentos asociados.
//     const  fidEntregaInscripcion = req.params.fidEntregaInscripcion;
//     //const fidEntregaInscripcion = req.body.fidEntregaInscripcion;
//     const sqlQuery = `SELECT idDocumento, nombre, archivo, delAlumno 
//                         FROM Documento 
//                         WHERE fidEntregaInscripcion = ${fidEntregaInscripcion} 
//                         AND activo = true`;

//     connection.connect(err => {
//         if (err) throw err;
//     });

//     connection.query(sqlQuery, (err, result) => {
//         if (err) {
//             res.status(505).send({
//                 message: "Error inesperado en el servidor"
//             })
//         } else{
//             res.status(200).send(result)
//         }
//     });

//     connection.end();
// }

// ////Te permite ver todos los campos y los valores puestos por los alumnos en su ficha de Inscripcion
// function selectFieldsFilledInscriptionFormStudent(req, res) {
//     const connection = mysql.createConnection(MYSQL_CREDENTIALS);
    
//     const  fidAlumnoProceso = req.params.fidAlumnoProceso;

//     const sqlQuery = `SELECT CP.idCampoProceso, CL.idCampoLlenado, CF.nombreCampo, CF.seccion, CP.flag, CL.valorAlumno
//                         FROM CampoFichaInscripcion CF, CampoFichaInscripcionProceso CP, CampoLlenadoFichaInscripcion CL, EntregaFichaInscripcion E
//                         WHERE CF.idCampo = CP.fidCampoFicha
//                         AND CF.flag = "activo"
//                         AND CL.fidFicha = E.idFicha
//                         AND E.fidAlumnoProceso = ${fidAlumnoProceso}
//                         AND CP.idCampoProceso = CL.fidCampoProceso`;

//     connection.connect(err => {
//         if (err) throw err;
//     });

//     connection.query(sqlQuery, (err, result) => {
//         if (err) {
//             res.status(505).send({
//                 message: "Error inesperado en el servidor: " + err.message
//             })
//         }else{
//             res.status(200).send(result);
//         }
//     });

//     connection.end();
// }

// //Te permite ingresar una Entrega Ficha de Inscripcion
// function insertSubmittedInscriptionForm(req, res) {
//     const connection = mysql.createConnection(MYSQL_CREDENTIALS);
    
//     const fidAlumnoProceso = req.body.fidAlumnoProceso;
//     const aprobado = 0;
//     const estadoDocumento = 1;
//     const observaciones = "";

//     const sqlObj = {
//         fidAlumnoProceso, aprobado, estadoDocumento, observaciones
//     };
    
//     const sqlQuery = `INSERT INTO EntregaFichaInscripcion SET ?`;


//     connection.connect(err => {
//         if (err) throw err;
//     });

//     connection.query(sqlQuery, sqlObj, (err, result) => {
//         if(err){
//             res.status(505).send({
//                 message: "Error inesperado en el servidor: " + err.message
//             })
//         }else{
//             res.status(200).send({
//                 message: "Entrega insertada correctamente",
//                 idEntrega: result.insertId
//             })
//         }   
//     });

//     connection.end();
// }

// //Te permite ingresar un Documento asociado a la Entrega Ficha de Inscripcion
// function insertDocumentSubmittedInscriptionForm(req, res){
//     const connection = mysql.createConnection(MYSQL_CREDENTIALS);
    
//     const nombre = req.body.nombre;
//     const fidEntregaInscripcion = req.body.fidEntregaInscripcion;
//     const archivo = req.body.archivo;
//     const delAlumno = req.body.delAlumno? 1: 0;
//     const activo = 1;


//     const sqlObj = {
//         nombre, archivo, activo, delAlumno, fidEntregaInscripcion
//     };
    
//     const sqlQuery = `INSERT INTO Documento SET ?`;


//     connection.query(sqlQuery, sqlObj, (err, result) => {

//         if(!fidEntregaInscripcion){
//             res.status(505).send({
//                 message: "No se ha enviado el fidEntregaInscripcion"
//             })
//         } else {
//             if(err){
//                 if(err.code==="ER_NO_REFERENCED_ROW_2"){
//                     res.status(505).send({
//                         message: "No existe una entrega de ficha de inscripcion donde guardar el documento. "
//                     })

//                 }else{
//                     res.status(505).send({
//                         message: "Error inesperado del servidor: <br>" + err.message
//                     })
//                 }
                
//             }else{
//                 res.status(200).send({
//                     message: "Documento insertado correctamente"
//                 })
//             }   
//         }
//     });


//     connection.end();
// }

// //Te permite ingresar un campo llenado por el alumno 
// function insertFieldFilledInscriptionForm(req, res) {
//     const connection = mysql.createConnection(MYSQL_CREDENTIALS);
    
//     const fidCampoProceso = req.body.fidCampoProceso;
//     const fidFicha = req.body.fidFicha;
//     const valorAlumno = req.body.valorAlumno;

//     const sqlObj = {
//         fidCampoProceso, fidFicha, valorAlumno
//     };
    
//     const sqlQuery = `INSERT INTO CampoLlenadoFichaInscripcion SET ?`;


//     connection.connect(err => {
//         if (err) throw err;
//     });

//     connection.query(sqlQuery, sqlObj, (err, result) => {
//         if(!fidCampoProceso || !fidFicha){
//             res.status(505).send({
//                 message: "No se ha enviado el fidCampoProceso o el fidFicha"
//             })
//         } else {
//             if(err){
//                 if(err.code==="ER_NO_REFERENCED_ROW_2"){
//                     res.status(505).send({
//                         message: "No existe una entrega de ficha de inscripción donde guardar los campos o un CampoProceso al que asociar el valor"
//                     })

//                 }else{
//                     res.status(505).send({
//                         message: "Error inesperado del servidor: <br>" + err.message
//                     })
//                 }
//             }else{
//                 res.status(200).send({
//                     message: "Valor del campo insertado correctamente"
//                 })
//             }   
//         }
//     });

//     connection.end();
// }
// //Te permite actualizar un Documento asociado a la entrega de la ficha de Inscripcion
// function updateDocumentSubmittedInscriptionForm(req, res){

//     const connection = mysql.createConnection(MYSQL_CREDENTIALS);
    
//     //Se necesita enviar el ID del documento para que esta función permita cambiar el documento que sube el alumno
//     const idDocumento = req.body.idDocumento;
//     const fidEntregaInscripcion = req.body.fidEntregaInscripcion;
//     const nombre = req.body.nombre;
//     const archivo = req.body.archivo;
   
    
//     const sqlQuery = `UPDATE Documento 
//                         SET nombre = "${nombre}", archivo= ${archivo} 
//                         WHERE fidEntregaInscripcion = ${fidEntregaInscripcion}
//                         AND idDocumento= ${idDocumento}`;


//     connection.connect(err => {
//         if (err) throw err;
//     });

    
//     connection.query(sqlQuery, (err, result) => {
//         if(err){
//             res.status(505).send({
//                 message: "Error inesperado del servidor: <br>" + err.message
//             })
//         }else{
//             if(!result.affectedRows){
//                 res.status(404).send({
//                     message: "No se actualizó ninguna fila"
//                 })
//             }else{
//                 res.status(200).send({
//                     message: "Valores actualizados correctamente"
//                 })
//             }
//         }   
//     });
//     connection.end();
// }

