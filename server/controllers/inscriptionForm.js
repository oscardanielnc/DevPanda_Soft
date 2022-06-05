const { send } = require('express/lib/response');
const { now } = require('moment');
const mysql = require('mysql');
const { DATE } = require('mysql/lib/protocol/constants/types');
const {MYSQL_CREDENTIALS, API_VERSION, PORT_SERVER, IP_SERVER} = require("../config");
const {sqlAsync} = require("../utils/async.js")

//Te permite actualizar los campos de la ficha de inscripcion de un alumno
async function updateFieldsInscriptionForm(req, res){
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);

    const fidAlumnoProceso = req.body.idAlumnoProceso;
    const fidFicha = req.body.idFicha;
    var resultElement;
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
                    nombreEmpresa = "${req.body.aboutCompany.companyName}",
                    fidPaisEmpresa = ${req.body.aboutCompany.country},
                    fidLineaNegocio = ${req.body.aboutCompany.lineBusiness},
                    direccionEmpresa = "${req.body.aboutCompany.companyAddress}",

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
        resultElement = await functionUpdate();
        if(!resultElement){
            res.status(404).send({ 
                success: false,
                message: "No se actualizó ninguna fila"
            })
            return 
        } 
    }catch(e){
        res.status(505).send({ 
            success: false,
            message: "Error en el servidor " + e.message
        })
        return 
    }  

    var campos = req.body.others;
    for(element of campos){
        sqlQuery = `UPDATE CampoLlenadoFichaInscripcion
                    SET valorAlumno = "${element.valorAlumno}"
                    WHERE idCampoLlenado= ${element.idCampoLlenado}
                    AND fidCampoProceso = ${element.idCampoProceso}
                    AND fidFicha = ${fidFicha}`;

        try{
            resultElement = await functionUpdate();
            if(!resultElement){
                res.status(404).send({
                    success: false, 
                    message: "No se pudo actualizar el campo: " + element.nombreCampo
                })
                return 
            } 
        }catch(e){
            res.status(505).send({ 
                success: false,
                message: "Error en el servidor " + e.message
            })
            return 
        }  
    }
    res.status(200).send({
        success: true,
        message: "Campos actualizados correctamente"
    })
    connection.end();
}

//Te permite actualizar los datos de la ficha de inscripcion de un alumno
async function updateInscriptionForm(req, res){
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);
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
                success: false,
                message: "Error inesperado del servidor: " + err.message
            })
        }else{
            if(!result.affectedRows){
                res.status(404).send({
                    success: false,
                    message: "No se actualizó ninguna fila"
                })
            }else{
                res.status(200).send({
                    success: true,
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
            "companyName": "",
            "country": "",
            "lineBusiness":"",
            "companyAddress": ""
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
                    AND estado = "C"`;

    connection.connect(err => {
        if (err) throw err;
    });
    
    try{
        resultElement  = await functionSelect();
        if(!resultElement.length){
            res.status(404).send({ 
                success: false,
                message: "No se encontro a un alumno con ese identificador"
            })
            return 
        } 
    }catch(e){
        res.status(505).send({ 
            success: false,
            message: "Error en el servidor " + e.message
        })
        return 
    }  

    const fidAlumnoProceso = resultElement[0].idAlumnoProceso
    data.idAlumnoProceso = fidAlumnoProceso;
    
    //##############################################################
    //#########  Obtenemos la Ficha de inscripción del alumno ######
    //##############################################################

    sqlQuery = `SELECT  idFicha, fidAlumnoProceso, aprobado, estadoDocumento, observaciones, nombres, apellidos, codigoPUCP, correoPUCP, 
                    coalesce(celular, "") as celular,
                    coalesce(correoPersonal, "") as correoPersonal,
                    esNacional,
                    coalesce(ruc, "") as ruc,
                    direccionEmpresa,
                    nombreEmpresa,
                    fidPaisEmpresa,
                    fidLineaNegocio,
                    nombreArea, puesto, funcionesActividades, fechaInicio, fechaFin, horasDiarias, horasSemanales, nombreJefe, areaJefe,
                    correoJefe,
                    coalesce(celularJefe, "") as celularJefe
                FROM EntregaFichaInscripcion
                WHERE fidAlumnoProceso = ${fidAlumnoProceso}`;
    try{
        resultElement = await functionSelect();
    }catch(e){
        res.status(505).send({ 
            success: false,
            message: "Error inesperado en el servidor " + e.message
        })
        return 
    }   
    
    //Si no hay una ficha Asociada:
    if(!resultElement.length){
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
                res.status(404).send({ 
                    success: false,
                    message: "No se pudo insertar una Entrega Ficha Inscripcion para el Alumno"
                })
                return 
            } 
        }catch(e){
            res.status(505).send({ 
                success: false,
                message: "Error en el servidor " + e.message
            })
            return 
        }  
        
        data.idFicha = resultElement
        data.documentsState = estadoDocumento
        data.approvalState = aprobado

        //Agregamos los campos extras
        sqlQuery = `SELECT CP.idCampoProceso, null as idCampoLlenado, CF.nombreCampo, CF.seccion, CP.flag, "" as valorAlumno
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
            res.status(505).send({ 
                success: false,
                message: "Error inesperado en el servidor " + e.message
            })
            return 
        }   
        
        data.others = resultElement;
        var valorAlumno = null;
        var fidFicha = data.idFicha;
        for(element of data.others){

            sqlQuery = `INSERT INTO 
                        CampoLlenadoFichaInscripcion SET ?`;
            
            var fidCampoProceso = element.idCampoProceso
            sqlObj = {
                fidCampoProceso, fidFicha , valorAlumno
            };

            try{
                resultElement  = await functionInsert();
                if(!resultElement){
                    res.status(404).send({ 
                        success: false,
                        message: "No se pudo insertar un campo extra al alumno"
                    })
                    return 
                } 
            }catch(e){
                res.status(505).send({ 
                    success: false,
                    message: "Error en el servidor " + e.message
                })
                return 
            }  
            element.idCampoLlenado = resultElement;
        }
        
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
        data.aboutCompany.companyName = resultElement[0].nombreEmpresa;
        data.aboutCompany.country = resultElement[0].fidPaisEmpresa;
        data.aboutCompany.lineBusiness = resultElement[0].fidLineaNegocio;
        data.aboutCompany.companyAddress = resultElement[0].direccionEmpresa;
        
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

        //Traemos los campos extras
        sqlQuery = `SELECT CP.idCampoProceso, CL.idCampoLlenado, CF.nombreCampo, CF.seccion, CP.flag, coalesce(CL.valorAlumno, "") as valorAlumno
                    FROM CampoFichaInscripcion CF, CampoFichaInscripcionProceso CP, CampoLlenadoFichaInscripcion CL, EntregaFichaInscripcion E, AlumnoProceso A, Proceso P
                    WHERE CF.idCampo = CP.fidCampoFicha
                    AND CP.idCampoProceso = CL.fidCampoProceso
                    AND CF.flag = "activo"
                    AND CL.fidFicha = E.idFicha
                    AND E.fidAlumnoProceso = ${fidAlumnoProceso}
                    AND E.fidAlumnoProceso = A.idAlumnoProceso
                    AND A.fidProceso = P.idProceso`;

        try{
            resultElement  = await functionSelect();
        }catch(e){
            res.status(505).send({ 
                success: false,
                message: "Error inesperado en el servidor " + e.message
            })
            return 
        }   
        
        data.others = resultElement;
    }

    res.status(200).send({
        success: true,
        infoFicha: data
    })
    connection.end();
}

//Devuelve lista de estudiantes con ficha de inscripción que han hecho la entrega
function getListStudentsInscriptionForm(req, res){
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);
    
    const  fidEspecialidad = req.params.idEspecialidad;

    const sqlQuery = `select AP.fidAlumno as idAlumno, concat(Pe.nombres, ' ' ,Pe.apellidos) as nombreAlumno, E.aprobado as estado
                        from EntregaFichaInscripcion E, AlumnoProceso AP, Alumno A, Proceso P, Persona Pe
                        where P.fidEspecialidad = ${fidEspecialidad}
                        and Pe.idPersona = A.idAlumno 
                        and A.idAlumno = AP.fidAlumno
                        and AP.fidProceso = P.idProceso
                        and E.fidAlumnoProceso = AP.idAlumnoProceso
                        and P.procesoActivo = true
                        and E.nombres is not null
                        ORDER BY E.idFicha DESC`;

    connection.connect(err => {
        if (err) throw err;
    });

    connection.query(sqlQuery, (err, result) => {
        if (err) {
            res.status(505).send({
                success: false,
                message: "Error inesperado en el servidor " + err.message
            })
        }else{
            res.status(200).send({
                success: true,
                result
            });
        }
    });

    connection.end();
}

//Devuelve la lista de paises 
function getListOfCountry(req, res){
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);

    const sqlQuery = `SELECT * FROM Pais ORDER BY nombrePais`;

    connection.connect(err => {
        if (err) throw err;
    });

    connection.query(sqlQuery, (err, result) => {
        if (err) {
            res.status(505).send({
                success : false,
                message: "Error inesperado en el servidor " + err.message
            })
        }else{
            res.status(200).send({
                success : true,
                result
            });
        }
    });

    connection.end();
}

//Devuelve la lista de lineas de negocio
function getListOfLineBusiness(req, res){
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);

    const sqlQuery = `SELECT * FROM LineaNegocio ORDER BY nombreLineaNegocio`;

    connection.connect(err => {
        if (err) throw err;
    });

    connection.query(sqlQuery, (err, result) => {
        if (err) {
            res.status(505).send({
                success : false,
                message: "Error inesperado en el servidor " + err.message
            })
        }else{
            res.status(200).send({
                success: true,
                result
            });
        }
    });

    connection.end();
}

//Obtener todos los campos de un proceso y una especialidad
async function getAllFields(req, res){

    const connection = mysql.createConnection(MYSQL_CREDENTIALS);
    const fidEspecialidad = req.params.idEspecialidad
    const fidProceso = req.params.idProceso;

    console.log(fidEspecialidad," y ",fidProceso);
    sqlQuery = `SELECT CF.idCampo as idField,  CF.nombreCampo as nameField, CF.seccion, CF.flag as activo, CP.flag as tipo, false as fijo
                FROM CampoFichaInscripcion CF, CampoFichaInscripcionProceso CP
                WHERE CF.idCampo = CP.fidCampoFicha
                AND CP.fidProceso = ${fidProceso}
                AND CF.fidEspecialidad = ${ fidEspecialidad}`;

    try{
        resultVariableFields= await sqlAsync(sqlQuery, connection);
        
    }catch(e){
        res.status(505).send({ 
            message: "Error en el servidor " + e.message,
            success:false
        })
    }
    let arregloFixedFields = [
        {
            idField: 0,
            nameField: "Nombres",
            seccion: "Datos Generales",
            fijo: true,
            tipo: "obligatorio",
            activo: "activo"
        },
        {
            idField: 0,
            nameField: "Apellidos",
            seccion: "Datos Generales",
            fijo: true,
            tipo: "obligatorio",
            activo: "activo"
        },
        {
            idField: 0,
            nameField: "Código PUCP",
            seccion: "Datos Generales",
            fijo: true,
            tipo: "obligatorio",
            activo: "activo"
        },
        {
            idField: 0,
            nameField: "Correo PUCP",
            seccion: "Datos Generales",
            fijo: true,
            tipo: "obligatorio",
            activo: "activo"
        },
        {
            idField: 0,
            nameField: "Teléfono",
            seccion: "Datos Generales",
            fijo: true,
            tipo: "obligatorio",
            activo: "activo"
        },
        {
            idField: 0,
            nameField: "Correo Personal",
            seccion: "Datos Generales",
            fijo: true,
            tipo: "opcional",
            activo: "activo"
        },
        {
            idField: 0,
            nameField: "Tipo de empresa",
            seccion: "Sobre la empresa",
            fijo: true,
            tipo: "obligatorio",
            activo: "activo"
        },
        {
            idField: 0,
            nameField: "RUC",
            seccion: "Sobre la empresa",
            fijo: true,
            tipo: "opcional",
            activo: "activo"
        },
        {
            idField: 0,
            nameField: "Nombre de Empresa",
            seccion: "Sobre la empresa",
            fijo: true,
            tipo: "obligatorio",
            activo: "activo"
        },
        {
            idField: 0,
            nameField: "País de la Empresa",
            seccion: "Sobre la empresa",
            fijo: true,
            tipo: "obligatorio",
            activo: "activo"
        },
        {
            idField: 0,
            nameField: "Giro de la empresa",
            seccion: "Sobre la empresa",
            fijo: true,
            tipo: "obligatorio",
            activo: "activo"
        },
        {
            idField: 0,
            nameField: "Dirección de la Empresa",
            seccion: "Sobre la empresa",
            fijo: true,
            tipo: "obligatorio",
            activo: "activo"
        },
        {
            idField: 0,
            nameField: "Nombre del área",
            seccion: "Sobre el puesto",
            fijo: true,
            tipo: "obligatorio",
            activo: "activo"
        },
        {
            idField: 0,
            nameField: "Puesto",
            seccion: "Sobre el puesto",
            fijo: true,
            tipo: "obligatorio",
            activo: "activo"
        },
        {
            idField: 0,
            nameField: "Funciones Actividades",
            seccion: "Sobre el puesto",
            fijo: true,
            tipo: "obligatorio",
            activo: "activo"
        },
        {
            idField: 0,
            nameField: "Fecha de inicio",
            seccion: "Sobre la PSP",
            fijo: true,
            tipo: "obligatorio",
            activo: "activo"
        },
        {
            idField: 0,
            nameField: "Fecha de fin",
            seccion: "Sobre la PSP",
            fijo: true,
            tipo: "obligatorio",
            activo: "activo"
        },
        {
            idField: 0,
            nameField: "Horas diarias promedio",
            seccion: "Sobre la PSP",
            fijo: true,
            tipo: "obligatorio",
            activo: "activo"
        },
        {
            idField: 0,
            nameField: "Horas semanales promedio",
            seccion: "Sobre la PSP",
            fijo: true,
            tipo: "obligatorio",
            activo: "activo"
        },
        {
            idField: 0,
            nameField: "Nombre del Responsable/Tutor",
            seccion: "Sobre el jefe",
            fijo: true,
            tipo: "obligatorio",
            activo: "activo"
        },
        {
            idField: 0,
            nameField: "Área o Departamento",
            seccion: "Sobre la PSP",
            fijo: true,
            tipo: "obligatorio",
            activo: "activo"
        },
        {
            idField: 0,
            nameField: "Correo",
            seccion: "Sobre la PSP",
            fijo: true,
            tipo: "obligatorio",
            activo: "activo"
        },
        {
            idField: 0,
            nameField: "Teléfono",
            seccion: "Sobre la PSP",
            fijo: true,
            tipo: "obligatorio",
            activo: "activo"
        }
    ];
    
    arregloFixedFields = arregloFixedFields.concat(resultVariableFields);

    console.log("El arregloFixedFields es: ",arregloFixedFields);
    res.status(200).send(
        {
            arregloFixedFields,
            success: true
        });
    connection.end();
}

async function insertField(req, res){
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);

    const idEspecialidad = req.body.idEspecialidad;
    const nombreCampo = req.body.nombreCampo;
    const seccion = req.body.seccion;
    const idProceso = req.body.idProceso;
    const obligatorio = req.body.obligatorio;
    let idCampo;
    let sqlQuery = `insert into CampoFichaInscripcion(fidEspecialidad, nombreCampo, seccion, flag) 
                    values (${idEspecialidad}, "${nombreCampo}", "${seccion}", "activo")`;

    try{
        let resultField= await sqlAsync(sqlQuery, connection);
        if(!resultField.insertId){
            res.status(404).send({ 
                success: false,
                message: "No se pudo insertar el campo correctamente"
            })
            return 
        }
        idCampo= resultField.insertId;
    }catch(e){
        res.status(505).send({ 
            message: "Error en el servidor " + e.message
        })
    }

    
    sqlQuery = `insert into CampoFichaInscripcionProceso(fidProceso, fidCampoFicha, flag) 
                values (${idProceso},${idCampo}, "${obligatorio}");`;

    try{
        let resultField= await sqlAsync(sqlQuery, connection);
        if(!resultField.insertId){
            res.status(404).send({ 
                success: false,
                message: "No se pudo insertar el campo correctamente"
            })
            return 
        }
    }catch(e){
        res.status(505).send({ 
            message: "Error en el servidor " + e.message
        })
    }

    res.status(200).send({
        success: true
    });
    connection.end();
}

// function updateField(req, res){
//     const connection = mysql.createConnection(MYSQL_CREDENTIALS);

//     const idEspecialidad = req.body.idEspecialidad;
//     const nombreCampo = req.body.nombreCampo;
//     const seccion = req.body.seccion;
//     const idProceso = req.body.idProceso;
//     const obligatorio = req.body.obligatorio;
//     const idCampo = req.body.idCampo;

//     let sqlQuery = `update CampoFichaInscripcion 
//                     set nombreCampo= "${nombreCampo}", seccion = "${seccion}"
//                     where idCampo = ${idCampo}`;

    


//     res.status(200).send({
//         success: true
//     });
//     connection.end();
// }



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
    getListStudentsInscriptionForm,
    getListOfLineBusiness,
    getListOfCountry,
    getAllFields,
    insertField,

}


