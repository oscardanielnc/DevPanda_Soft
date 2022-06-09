const mysql = require('mysql');
const {MYSQL_CREDENTIALS} = require("../config");
const { sqlAsync } = require('../utils/async');

//Traer todas las Solicitudes de los alumnos segun la especialidad
function requestList(req, res){
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);

    const fidEspecialidad = req.params.idEspecialidad;
    
    
    const sqlQuery = `SELECT idSolicitud, fidAlumno as idAlumno, concat(P.nombres, " ", P.Apellidos) as nombreAlumno, S.estado, A.codigo
                        FROM SolicitudesSinConvenio S, Persona P, Alumno A, AlumnoProceso AP
                        WHERE S.fidEspecialidad = ${fidEspecialidad}
                        AND AP.idAlumnoProceso = S.fidAlumnoProceso
                        AND A.idAlumno = AP.fidAlumno
                        AND P.idPersona = A.idAlumno`;


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

//Traer una solicitud en especifico 
function getRequest(req, res){
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);

    const idSolicitud= req.params.idSolicitud;

    let sqlQuery = `SELECT  idAlumno, S.estado, concat(P.nombres, " ", P.Apellidos) as nombreAlumno, codigo
                    FROM SolicitudesSinConvenio S, Persona P, Alumno A, AlumnoProceso AP
                    WHERE S.idSolicitud = ${idSolicitud}
                    AND AP.idAlumnoProceso = S.fidAlumnoProceso
                    AND A.idAlumno = AP.fidAlumno
                    AND P.idPersona = A.idAlumno`
    
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
            if(result.length===1){
                res.status(200).send({
                    success: true,
                    result
                })   
            }else{
                res.status(404).send({
                    success: false,
                    message: "Se encontró más de una solicitud con ese identificador"
                })   
            }
            
        }
    });

    connection.end();
}

//Verificador del estado de una solicitud de un alumno
function verifyRequest(req, res){
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);

    const fidAlumno= req.params.fidAlumno;

    let sqlQuery = `SELECT S.idSolicitud, S.estado
                    FROM SolicitudesSinConvenio S, AlumnoProceso AP
                    WHERE AP.fidAlumno = ${fidAlumno}
                    and S.fidAlumnoProceso = AP.idAlumnoProceso
                    order by idSolicitud DESC
                    LIMIT 1`
    
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
            if(result[0]){
                res.status(200).send({
                    success: true,
                    data: result[0]
                })
            }else{
                res.status(200).send({
                    success: true,
                    data:
                    {
                        idSolicitud: 0,
                        estado: "Sin enviar"
                    }
                })
            }        
        }
    });

    connection.end();
}

//Insertar una solicitud
async function insertRequest(req, res){
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);

    const fidEspecialidad = req.body.fidEspecialidad;
    const fidAlumnoProceso= req.body.fidAlumnoProceso;
    const estado = "Sin revisar";
    let resultCoordinador;

    let sqlQuery = `SELECT idPersona
                    FROM Persona P, PersonalAdministrativo PA
                    WHERE P.fidEspecialidad = ${fidEspecialidad}
                    AND PA.idPersonal = P.idPersona
                    AND PA.tipoPersonal = "E"`

    connection.connect(err => {
        if (err) throw err;
    });

    try{
        resultCoordinador  = await sqlAsync(sqlQuery, connection);
        if(!resultCoordinador.length){
            res.status(404).send({ 
                success: false,
                message: "No hay un coordinador asociado a la Especialidad"
            })
            return 
        }
    }catch(e){
        res.status(505).send({ 
            message: "Error en el servidor " + e.message
        })
    }  

    const fidCoordinadorEspecialidad = resultCoordinador[0].idPersona;

    sqlQuery = `INSERT INTO 
                SolicitudesSinConvenio(fidEspecialidad, fidCoordinadorEspecialidad, fidAlumnoProceso, estado) 
                values(${fidEspecialidad}, ${fidCoordinadorEspecialidad}, ${fidAlumnoProceso}, "${estado}")`

    try{
        const resultElement  = await sqlAsync(sqlQuery, connection);
        if(!resultElement){
            res.status(404).send({ 
                success: false,
                message: "No se pudo insertar la Solicitud para el Alumno"
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
    
    connection.end();

    res.status(200).send({
        success: true
    })
}

//Actualizar una solicitud
function updateRequest(req, res){
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);

    const estado= req.body.estado;
    const idSolicitud = req.body.idSolicitud;

    let sqlQuery = `UPDATE SolicitudesSinConvenio set estado = "${estado}"
                    where idSolicitud = ${idSolicitud}`
    
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
            if(result.affectedRows===1){
                res.status(200).send({
                    success: true,
                    message: "Se actualizó el valor correctamente"
                })
            }else{
                res.status(404).send({
                    success: false,
                    message: "Se actualizó más de una fila"
                })
            }        
        }
    });

    connection.end();
}

module.exports = {
    insertRequest,
    requestList,
    verifyRequest,
    getRequest,
    updateRequest
}