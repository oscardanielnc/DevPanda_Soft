const mysql = require('mysql');
const {MYSQL_CREDENTIALS} = require("../config");
const { sqlAsync } = require('../utils/async');

//Traer los entregables de cierto proceso sin el informe Final
//function 

function deliverablesProcess(req, res){
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);

    const idProceso = req.params.idProceso;
    
    
    const sqlQuery = `SELECT idEntregable, nombre 
                        FROM Entregable
                        WHERE fidProceso = ${idProceso}
                        and nombre <> "Informe Final"`;


    connection.connect(err => {
        if (err) throw err;
    });
    
    connection.query(sqlQuery, (err, result) => {
        if (err) {
            res.status(505).send({
                success: false,
                message: "Error inesperado en el servidor" + err.message
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

//Traer un entregable en especifico de un alumno
async function deliverableStudent(req, res){
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);
    
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

    var dataEntregable = {
        "idAlumno":  parseInt(req.params.idAlumno),  
        "idAlumnoProceso": "",  
        "deliverable":{
            "idEntregable": parseInt(req.params.idEntregable),
            "name": "",
            "description": "",
            "flagIni": null,
            "fechaIni": "",
            "flagFin": null,
            "fechaFin": "",
            "flagNota": null
        },
        "deliverableResponse":{
            "idRespuestaEntregable": null,
            "docState":"",
            "evaState": "",
            "observation": "",
            "grade": "",
            "uploadDate": ""
        }
    }
    var sqlQuery = `SELECT idAlumnoProceso 
                    FROM AlumnoProceso 
                    WHERE fidAlumno = ${dataEntregable.idAlumno}
                    AND estado = "C"`;
    var resultElement;

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
    dataEntregable.idAlumnoProceso = fidAlumnoProceso;

    const fidEntregable = req.params.idEntregable;
    const idAlumno = req.params.idAlumno;

    

    sqlQuery = `SELECT * from Entregable 
                WHERE idEntregable = ${fidEntregable}`;

    

    try{
        resultElement  = await functionSelect();
        if(!resultElement.length){
            res.status(404).send({ 
                success: false,
                message: "No se encontro un entregable con ese identificador"
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

    dataEntregable.deliverable.name = resultElement[0].nombre;
    dataEntregable.deliverable.description = resultElement[0].descripcion;
    dataEntregable.deliverable.flagFin = resultElement[0].flagFin
    dataEntregable.deliverable.flagIni = resultElement[0].flagIni
    dataEntregable.deliverable.fechaIni = resultElement[0].fechaIni
    dataEntregable.deliverable.fechaFin = resultElement[0].fechaFin
    dataEntregable.deliverable.flagNota = resultElement[0].flagNota

    sqlQuery = `SELECT *
                FROM RespuestaEntregable R, AlumnoProceso AP
                WHERE R.fidEntregable = ${fidEntregable}
                AND R.fidAlumnoProceso = AP.idAlumnoProceso
                AND AP.fidAlumno = ${idAlumno}
                AND AP.nota is null`;

    try{
        resultElement  = await functionSelect();
    }catch(e){
        res.status(505).send({ 
            success: false,
            message: "Error en el servidor " + e.message
        })
        return 
    }  

    //Si hay una Respuesta al Entregable Asociada al alumno
    if(resultElement.length){
        dataEntregable.deliverableResponse.idRespuestaEntregable = resultElement[0].idRespuestaEntregable;
        dataEntregable.deliverableResponse.docState = resultElement[0].estadoDocumento;
        dataEntregable.deliverableResponse.evaState = resultElement[0].aprobado
        dataEntregable.deliverableResponse.observation = resultElement[0].observacion
        dataEntregable.deliverableResponse.grade = resultElement[0].notaEntregable
        dataEntregable.deliverableResponse.uploadDate = resultElement[0].fechaSubida
    }else{

        const aprobado = "P";
        const estadoDocumento = "S";
        const observacion = "";

        var sqlObj = {
            fidEntregable, fidAlumnoProceso, observacion, aprobado, estadoDocumento
        };
        
        sqlQuery = `INSERT INTO RespuestaEntregable SET ?`;

        try{
            resultElement  = await functionInsert();
            if(!resultElement){
                res.status(404).send({ 
                    success: false,
                    message: "No se pudo insertar una Entrega RespuestaEntregable para el Alumno"
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

        dataEntregable.deliverableResponse.idRespuestaEntregable = resultElement;
        dataEntregable.deliverableResponse.docState = estadoDocumento;
        dataEntregable.deliverableResponse.evaState = aprobado
        dataEntregable.deliverableResponse.observation = observacion
        dataEntregable.deliverableResponse.grade = null
        dataEntregable.deliverableResponse.uploadDate = null
    }
    connection.end();

    res.status(200).send({
        success: true,
        valor: dataEntregable
    })
}

//Actualizar la RespuestaEntregable de un alumno
function updateDeliverableStudent(req, res){
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);

    const idRespuestaEntregable = req.body.deliverableResponse.idRespuestaEntregable;
    const estadoDocumento = req.body.deliverableResponse.docState;
    const aprobado = req.body.deliverableResponse.evaState;
    const observaciones = req.body.deliverableResponse.observation;
    const nota = req.body.deliverableResponse.grade;
    const fechaSubida = req.body.deliverableResponse.uploadDate;
    
    const sqlQuery = `UPDATE RespuestaEntregable 
                        SET fechaSubida="${fechaSubida}", 
                        estadoDocumento="${estadoDocumento}", 
                        observacion="${observaciones}",
                        aprobado="${aprobado}",
                        notaEntregable = ${nota}
                        WHERE idRespuestaEntregable = ${idRespuestaEntregable}`;


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

//Trae los campos de un entregable con los valores del alumno
async function fieldsDeliverables(req, res){
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);
    const idEntregable = req.params.idEntregable;
    const idRespuestaEntregable = req.params.idRespuestaEntregable;

    let data;
    let resultElement;
    let sqlQuery = `SELECT CP.idCampoEntregableProceso, CL.idCampoLlenadoEntregable, CE.nombreCampoEntregable, CP.flagEntregable, coalesce(CL.valorAlumno, "") as valorAlumno
                    FROM CampoEntregable CE, CampoEntregableProceso CP, CampoLlenadoEntregable CL, Entregable E, RespuestaEntregable R
                    WHERE E.idEntregable = ${idEntregable}
                    and CP.fidCampoEntregable = CE.idCampoEntregable
                    and CE.flagEntregable = "activo"
                    and CL.fidCampoEntregableProceso = CP.idCampoEntregableProceso
                    and CL.fidRespuestaEntregable = R.idRespuestaEntregable
                    and R.idRespuestaEntregable = ${idRespuestaEntregable}`

    connection.connect(err => {
        if (err) throw err;
    });

    try{
        resultElement  = await sqlAsync(sqlQuery, connection);
    }catch(e){
        res.status(505).send({ 
            message: "Error en el servidor " + e.message
        })
    } 
    data = resultElement; 
    //Si no hay valores, me traigo todos los campos e inserto nuevos.
    if(!resultElement.length){  
        sqlQuery=` SELECT CP.idCampoEntregableProceso, null as idCampoLlenadoEntregable, CE.nombreCampoEntregable, CP.flagEntregable, "" as valorAlumno
                    FROM CampoEntregable CE, CampoEntregableProceso CP, Entregable E
                    WHERE E.idEntregable = ${idEntregable}
                    AND CP.fidCampoEntregable = CE.idCampoEntregable
                    AND CE.flagEntregable = "activo"`

        try{
            resultElement  = await sqlAsync(sqlQuery, connection);
        }catch(e){
            res.status(505).send({ 
                message: "Error en el servidor " + e.message
            })
        } 
        data = resultElement;

        for(element of data){
            sqlQuery = `INSERT INTO 
                        CampoLlenadoEntregable(fidCampoEntregableProceso, fidRespuestaEntregable, valorAlumno) 
                        values (${element.idCampoEntregableProceso}, ${idRespuestaEntregable}, "")`;
            

            try{
                resultElement  = await sqlAsync(sqlQuery, connection);
                if(!resultElement){
                    res.status(404).send({ 
                        success: false,
                        message: "No se pudo insertar un campo al alumno"
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
            element.idCampoLlenadoEntregable = resultElement.insertId;
        }
    }
    connection.end();
    res.status(200).send({
        success: true,
        data
    })
   
}

//Actualizar los campos de un entregable
async function updatefieldsDeliverables(req,res){
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);
    let campos = req.body.campos;
    let idRespuestaEntregable = req.body.idRespuestaEntregable;
    //console.log(campos)
    connection.connect(err => {
        if (err) throw err;
    });

    for(element of campos){
        
        sqlQuery = `UPDATE CampoLlenadoEntregable
                    SET valorAlumno = "${element.valorAlumno}"
                    WHERE idCampoLlenadoEntregable = ${element.idCampoLlenadoEntregable}
                    AND fidCampoEntregableProceso = ${element.idCampoEntregableProceso}
                    AND fidRespuestaEntregable = ${idRespuestaEntregable}`;

        try{
            resultElement = await sqlAsync(sqlQuery, connection);
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

function getDeliverableByStudentSpecialty(req,res){
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);

    const idAlumno = req.params.idAlumno;
    const idFacultad = req.params.idFacultad;
    
    const sqlQuery =`   select
                            RE.idRespuestaEntregable, E.idEntregable, E.nombre, RE.aprobado, RE.estadoDocumento
                        from
                            RespuestaEntregable as RE inner join
                            Entregable as E on RE.fidEntregable = E.idEntregable inner join
                            AlumnoProceso as AP on AP.idAlumnoProceso = RE.fidAlumnoProceso inner join
                            Persona as P on AP.fidAlumno = P.idPersona
                        where
                            P.idPersona = ${idAlumno} and
                            P.fidEspecialidad = ${idFacultad}`;


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
            const data =  result.map(e => {
                return {
                    idDeliverableResponse: e.idRespuestaEntregable,
                    code: "ENT" + e.idEntregable,
                    idDeliverable:e.idEntregable,
                    nameDeiverable: e.nombre,
                    estado: e.estadoDocumento == 'S'? 'S' : e.aprobado
                }
            });
            res.status(200).send({
                success: true,
                data
            })
        }   
    });
    connection.end();
}

module.exports = {
    deliverableStudent,
    updateDeliverableStudent,
    deliverablesProcess,
    fieldsDeliverables,
    updatefieldsDeliverables,
    getDeliverableByStudentSpecialty
}