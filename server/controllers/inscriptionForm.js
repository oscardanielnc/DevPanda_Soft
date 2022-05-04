const mysql = require('mysql');
const {MYSQL_CREDENTIALS} = require("../config");

//Te permite ver la Entrega Ficha de Inscripcion asociada a un alumno.
function selectSubmittedInscriptionForm(req, res) {
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);
    
    const  fidAlumnoProceso = req.body.fidAlumnoProceso;

    const sqlQuery = `SELECT *
                    FROM EntregaFichaInscripcion
                    WHERE fidAlumnoProceso = ${fidAlumnoProceso}`;

    connection.connect(err => {
        if (err) throw err;
    });

    connection.query(sqlQuery, (err, result) => {
        if (err) {
            res.status(505).send({
                message: "Error inesperado en el servidor"
            })
        }else{
            res.status(200).send(result);
        }
    });

    connection.end();
}

//Te permite ver todos los campos activos asociados a una especialidad
function selectFieldsInscriptionFormSpecialty(req, res) {
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);
    
    const  fidEspecialidad = req.body.fidEspecialidad;

    const sqlQuery = `SELECT CF.idCampo, CF.nombreCampo, CF.seccion, CP.flag
                    FROM CampoFichaInscripcion CF, CampoFichaInscripcionProceso CP
                    WHERE CF.fidEspecialidad = ${fidEspecialidad}
                    AND CF.idCampo = CP.fidCampoFicha
                    AND CF.flag = "activo"`;

    connection.connect(err => {
        if (err) throw err;
    });

    connection.query(sqlQuery, (err, result) => {
        if (err) {
            res.status(505).send({
                message: "Error inesperado en el servidor"
            })
        }else{
            res.status(200).send(result);
        }
    });

    connection.end();
}

////Te permite ver todos los documentos activos asociados a una Entrega Ficha de Inscripcion
function selectDocumentsSubmittedInscriptionForm(req, res){
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);

    //Se pedirá el IdFicha para poder obtener los documentos asociados.
    const fidEntregaInscripcion = req.body.fidEntregaInscripcion;
    const sqlQuery = `SELECT idDocumento, nombre, archivo, delAlumno 
                        FROM Documento 
                        WHERE fidEntregaInscripcion = ${fidEntregaInscripcion} 
                        AND activo = true`;

    connection.connect(err => {
        if (err) throw err;
    });

    connection.query(sqlQuery, (err, result) => {
        if (err) {
            res.status(505).send({
                message: "Error inesperado en el servidor"
            })
        } else{
            res.status(200).send(result)
        }
    });

    connection.end();
}

////Te permite ver todos los campos y los valores puestos por los alumnos en su ficha de Inscripcion
function selectFieldsFilledInscriptionFormStudent(req, res) {
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);
    
    const fidAlumnoProceso = req.body.fidAlumnoProceso;

    const sqlQuery = `SELECT CP.idCampoProceso, CL.idCampoLlenado, CF.nombreCampo, CF.seccion, CP.flag, CL.valorAlumno
                    FROM CampoFichaInscripcion CF, CampoFichaInscripcionProceso CP, CampoLlenadoFichaInscripcion CL, EntregaFichaInscripcion E
                    WHERE CF.idCampo = CP.fidCampoFicha
                    AND CF.flag = "activo"
                    AND CL.fidFicha = E.idFicha
                    AND E.fidAlumnoProceso = ${fidAlumnoProceso} 
                    AND CP.fidCampoFicha = CL.fidCampoProceso`;

    connection.connect(err => {
        if (err) throw err;
    });

    connection.query(sqlQuery, (err, result) => {
        if (err) {
            res.status(505).send({
                message: "Error inesperado en el servidor: " + err.message
            })
        }else{
            res.status(200).send(result);
        }
    });

    connection.end();
}

//Te permite ingresar una Entrega Ficha de Inscripcion
function insertSubmittedInscriptionForm(req, res) {
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);
    
    const fidAlumnoProceso = req.body.fidAlumnoProceso;
    const aprobado = 0;
    const estadoDocumento = 1;
    const observaciones = "";

    const sqlObj = {
        fidAlumnoProceso, aprobado, estadoDocumento, observaciones
    };
    
    const sqlQuery = `INSERT INTO EntregaFichaInscripcion SET ?`;


    connection.connect(err => {
        if (err) throw err;
    });

    // La comprobación se hace a traves del frontend NUNCA DEBERÍA ENVIARSE UN DATO NULL
    // if(!fidAlumnoProceso){
    //     res.status(404).send({
    //         message: "No se ha enviado el fidAlumnoProceso"
    //     })
    // }

    connection.query(sqlQuery, sqlObj, (err, result) => {
        if(err){
            res.status(505).send({
                message: "Error inesperado en el servidor: " + err.message
            })
        }else{
            res.status(200).send({
                message: "Entrega insertada correctamente",
                idEntrega: result.insertId
            })
        }   
    });

    connection.end();
}

//Te permite ingresar un Documento asociado a la Entrega Ficha de Inscripcion
function insertDocumentSubmittedInscriptionForm(req, res){
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);
    
    const nombre = req.body.nombre;
    const fidEntregaInscripcion = req.body.fidEntregaInscripcion;
    const archivo = req.body.archivo;
    const delAlumno = req.body.delAlumno? 1: 0;
    const activo = 1;


    const sqlObj = {
        nombre, archivo, activo, delAlumno, fidEntregaInscripcion
    };
    
    const sqlQuery = `INSERT INTO Documento SET ?`;


    connection.query(sqlQuery, sqlObj, (err, result) => {

        if(!fidEntregaInscripcion){
            res.status(505).send({
                message: "No se ha enviado el fidEntregaInscripcion"
            })
        } else {
            if(err){
                if(err.code==="ER_NO_REFERENCED_ROW_2"){
                    res.status(505).send({
                        message: "No existe una entrega de ficha de inscripcion donde guardar el documento. "
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

//Te permite ingresar un campo llenado por el alumno 
function insertFieldFilledInscriptionForm(req, res) {
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);
    
    const fidCampoProceso = req.body.fidCampoProceso;
    const fidFicha = req.body.fidFicha;
    const valorAlumno = req.body.valorAlumno;

    const sqlObj = {
        fidCampoProceso, fidFicha, valorAlumno
    };
    
    const sqlQuery = `INSERT INTO CampoLlenadoFichaInscripcion SET ?`;


    connection.connect(err => {
        if (err) throw err;
    });

    connection.query(sqlQuery, sqlObj, (err, result) => {
        if(!fidCampoProceso || !fidFicha){
            res.status(505).send({
                message: "No se ha enviado el fidCampoProceso o el fidFicha"
            })
        } else {
            if(err){
                if(err.code==="ER_NO_REFERENCED_ROW_2"){
                    res.status(505).send({
                        message: "No existe una entrega de ficha de inscripción donde guardar los campos o un CampoProceso al que asociar el valor"
                    })

                }else{
                    res.status(505).send({
                        message: "Error inesperado del servidor: <br>" + err.message
                    })
                }
            }else{
                res.status(200).send({
                    message: "Valor del campo insertado correctamente"
                })
            }   
        }
    });

    connection.end();
}


//Te permite actualizar la entrega Ficha de Inscripcion de un alumno
function updateSubmittedInscriptionForm(req, res){
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);

    const idFicha = req.body.idFicha;
    const fidAlumnoProceso = req.body.fidAlumnoProceso;
    const aprobado = req.body.aprobado?1:0;
    const estadoDocumento = req.body.estadoDocumento?1:0;
    const observaciones = req.body.observaciones;
    
    const sqlQuery = `UPDATE EntregaFichaInscripcion 
                    SET aprobado=${aprobado}, estadoDocumento=${estadoDocumento}, observaciones="${observaciones}"
                    WHERE fidAlumnoProceso = ${fidAlumnoProceso}
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

//Te permite actualizar un CAMPO LLENADO de la Ficha de Inscripcion
function updateFieldFilledInscriptionForm(req, res){
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);

    const valorAlumno = req.body.valorAlumno;
    const idCampoLlenado = req.body.idCampoLlenado;
    const fidCampoProceso = req.body.fidCampoProceso;
    const fidFicha = req.body.fidFicha;
    
    const sqlQuery = `UPDATE CampoLlenadoFichaInscripcion
                    SET valorAlumno = "${valorAlumno}"
                    WHERE idCampoLlenado= ${idCampoLlenado}
                    AND fidCampoProceso = ${fidCampoProceso}
                    AND fidFicha = ${fidFicha}`;


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
                    message: "Campo actualizado correctamente"
                })
            }
        }   
    });
    connection.end();
}

//Te permite actualizar un Documento asociado a la entrega de la ficha de Inscripcion
function updateDocumentSubmittedInscriptionForm(req, res){

    const connection = mysql.createConnection(MYSQL_CREDENTIALS);
    
    //Se necesita enviar el ID del documento para que esta función permita cambiar el documento que sube el alumno
    const idDocumento = req.body.idDocumento;
    const fidEntregaInscripcion = req.body.fidEntregaInscripcion;
    const nombre = req.body.nombre;
    const archivo = req.body.archivo;
   
    
    const sqlQuery = `UPDATE Documento 
                        SET nombre = "${nombre}", archivo= ${archivo} 
                        WHERE fidEntregaInscripcion = ${fidEntregaInscripcion}
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

module.exports = {
    selectSubmittedInscriptionForm,
    selectFieldsInscriptionFormSpecialty,
    selectDocumentsSubmittedInscriptionForm,
    insertSubmittedInscriptionForm,
    insertDocumentSubmittedInscriptionForm,
    insertFieldFilledInscriptionForm,
    updateSubmittedInscriptionForm,
    updateFieldFilledInscriptionForm,
    updateDocumentSubmittedInscriptionForm,
    selectFieldsFilledInscriptionFormStudent
}