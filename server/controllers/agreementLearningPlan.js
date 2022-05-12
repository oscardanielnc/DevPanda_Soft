const mysql = require('mysql');
const {MYSQL_CREDENTIALS} = require("../config");


function select(req, res) {
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);
    
    const sqlQuery = `SELECT * FROM ConvenioYPlan`;

    connection.connect(err => {
        if (err) throw err;
    });

    connection.query(sqlQuery, (err, result) => {
        if (err) {
            res.status(505).send({
                message: "Error inesperado en el servidor"
            })
        }
        res.status(200).send(result)
    });

    connection.end();
}

function selectInfoByStudent(req, res){
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);
    //Se pedirá el IDALUMNOPROCESO para poder obtener su convenio.
    const idAlumnoProceso = req.body.idAlumnoProceso;
    const sqlQuery = `SELECT * FROM EntregaConvenioYPlan WHERE fidAlumnoProceso= ${idAlumnoProceso}`;

    connection.connect(err => {
        if (err) throw err;
    });

    connection.query(sqlQuery, (err, result) => {
        if (err) {
            if(!idAlumnoProceso){
                res.status(505).send({
                    message: "No se ha enviado un identificador de alumno válido"
                })
            }else{
                res.status(505).send({
                    message: err.message
                })
            }
            
        }
        res.status(200).send(result)
    });

    connection.end();
}

function selectDocumentsByAgreement(req, res){
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);
    //Se pedirá el IDENTREGACONVENIOYPLAN para poder obtener los documentos asociados.
    const idEntregaConvenioYPlan = req.body.idEntregaConvenioYPlan;
    const sqlQuery = `SELECT idDocumento, nombre, archivo, delAlumno 
                        FROM Documento 
                        WHERE fidEntregaConvenioYPlan = ${idEntregaConvenioYPlan} 
                        AND activo = true`;

    connection.connect(err => {
        if (err) throw err;
    });

    connection.query(sqlQuery, (err, result) => {
        if (err) {
            if(!idEntregaConvenioYPlan){
                res.status(505).send({
                    message: "No se ha enviado un idEntregaConvenioYPlan"
                })
            }else{
                res.status(505).send({
                    message: "Error inesperado en el servidor"
                })
            }
            
        } else{
            res.status(200).send(result)
        }
    });

    connection.end();
}

function insertInfoByStudent(req, res) {
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);
    
    const fidConvenioYPlan = req.body.fidConvenioYPlan;
    const fidAlumnoProceso = req.body.fidAlumnoProceso;
    const estadoFaci = 0;
    const estadoEspecialidad = 0;

    const sqlObj = {
        fidConvenioYPlan, fidAlumnoProceso, estadoFaci, estadoEspecialidad
    };
    
    const sqlQuery = `INSERT INTO EntregaConvenioYPlan SET ?`;


    connection.connect(err => {
        if (err) throw err;
    });

    connection.query(sqlQuery, sqlObj, (err, result) => {
        if(!fidConvenioYPlan || !fidAlumnoProceso){
            res.status(505).send({
                message: "No se ha enviado el fidConvenioYPlan o fidAlumnoProceso"
            })
        } else {
            if(err){
                res.status(505).send({
                    message: "Error inesperado en el servidor"
                })
            }else{
                res.status(200).send({
                    message: "Valores insertados correctamente"
                })
            }   
        }
    });

    connection.end();
}

function insertDocumentByAgreement(req, res) {
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);
    
    const nombre = req.body.nombre;
    const fidEntregaConvenioYPlan = req.body.fidEntregaConvenioYPlan;
    const archivo = req.body.archivo;
    const delAlumno = req.body.delAlumno? 1: 0;
    const activo = 1;

    const sqlObj = {
        nombre, archivo, activo, delAlumno, fidEntregaConvenioYPlan
    };
    
    const sqlQuery = `INSERT INTO Documento SET ?`;


    connection.connect(err => {
        if (err) throw err;
    });

    connection.query(sqlQuery, sqlObj, (err, result) => {

        if(!fidEntregaConvenioYPlan){
            res.status(505).send({
                message: "No se ha enviado el fidEntregaConvenioYPlan"
            })
        } else {
            if(err){
                if(err.code==="ER_NO_REFERENCED_ROW_2"){
                    res.status(505).send({
                        message: "No existe una entrega de convenio y plan donde guardar el documento. "
                    })

                }else{
                    res.status(505).send({
                        message: "Error inesperado del servidor: <br>" + err.message
                    })
                }
                
            }else{
                res.status(200).send({
                    message: "Documento insertado correctamente"
                })
            }   
        }
    });

    connection.end();
}

function updateInfoByStudent(req, res){
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);
    
    const idEntregaConvenio = req.body.idEntregaConvenio;
    const fidAlumnoProceso = req.body.fidAlumnoProceso;
    const estadoFaci = req.body.estadoFaci;
    const estadoEspecialidad = req.body.estadoEspecialidad;
    const observaciones = req.body.observaciones;
    
    const sqlQuery = `UPDATE EntregaConvenioYPlan 
                        SET estadoFaci = ${estadoFaci}, estadoEspecialidad= ${estadoEspecialidad}, observaciones = "${observaciones}" 
                        WHERE idEntregaConvenio = ${idEntregaConvenio} 
                        AND fidAlumnoProceso = ${fidAlumnoProceso}`;


    connection.connect(err => {
        if (err) throw err;
    });

    
    connection.query(sqlQuery, (err, result) => {
        if(err){
            res.status(505).send({
                message: "Error inesperado del servidor: <br>" + err.message
            })
        }else{
            if(!result.affectedRows){
                res.status(200).send({
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

function updateDocumentByAgreement(req, res){

    const connection = mysql.createConnection(MYSQL_CREDENTIALS);
    
    //Se necesita enviar el ID del documento para que esta función permita cambiar el documento tanto de los coordinadores, como de los que sube el alumno
    const idDocumento = req.body.idDocumento;
    const fidEntregaConvenioYPlan = req.body.fidEntregaConvenioYPlan;
    const nombre = req.body.nombre;
    const archivo = req.body.archivo;
   
    
    const sqlQuery = `UPDATE Documento 
                        SET nombre = "${nombre}", archivo= ${archivo} 
                        WHERE fidEntregaConvenioYPlan = ${fidEntregaConvenioYPlan}
                        AND idDocumento= ${idDocumento}`;


    connection.connect(err => {
        if (err) throw err;
    });

    
    connection.query(sqlQuery, (err, result) => {
        if(err){
            res.status(505).send({
                message: "Error inesperado del servidor: <br>" + err.message
            })
        }else{
            if(!result.affectedRows){
                res.status(200).send({
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

function selectDocumentsInfoByProcess(req, res){
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);
    //Se pedirá el idAlumno e idAsesor para poder obtener la info documentos asociados.
    const fidAlumno = req.params.fidAlumno;
    const fidAsesor = req.params.fidAsesor;
    const sqlQuery = `  SELECT
                            estadoFaci, estadoEspecialidad, observaciones
                        FROM
                            EntregaConvenioYPlan
                        WHERE
                            fidAlumnoProceso = (SELECT
                                                    idAlumnoProceso
                                                FROM
                                                    AlumnoProceso
                                                WHERE
                                                    fidAlumno = ${fidAlumno}
                                                    AND fidAsesor = ${fidAsesor}
                                                    AND estado = 'C');`;

    connection.connect(err => {
        if (err) throw err;
    });

    connection.query(sqlQuery, (err, result) => {
        if (err) {
            if(!idEntregaConvenio){
                res.status(505).send({
                    message: "No se ha enviado un idEntregaConvenio"
                })
            }else{
                res.status(505).send({
                    message: "Error inesperado en el servidor"
                })
            }
            
        } else{
            res.status(200).send(result)
        }
    });

    connection.end();
}

module.exports = {
    select,
    selectInfoByStudent,
    selectDocumentsByAgreement,
    insertInfoByStudent,
    insertDocumentByAgreement,
    updateInfoByStudent,
    updateDocumentByAgreement,
    selectDocumentsInfoByProcess
}
