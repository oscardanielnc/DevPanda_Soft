const mysql = require('mysql');
const {MYSQL_CREDENTIALS} = require("../config");
const { sqlAsync } = require('../utils/async');

//Traer todas las Solicitudes de los alumnos segun la especialidad
function requestList(req, res){
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);

    const fidEspecialidad = req.params.idEspecialidad;
    
    
    const sqlQuery = `SELECT idSolicitud, fidAlumno as idAlumno, concat(P.nombres, " ", P.Apellidos) as nombreAlumno, estado
                        FROM SolicitudesSinConvenio S, Persona P, Alumno A
                        WHERE S.fidEspecialidad = ${fidEspecialidad}
                        AND A.idAlumno = S.fidAlumno
                        AND P.idPersona = S.fidAlumno`;


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
//TO DO:

//Verificador de solicitud de un alumno
function verifyRequest(req, res){
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);

    const fidAlumno= req.params.fidAlumno;

    let sqlQuery = `SELECT idSolicitud 
                    FROM SolicitudesSinConvenio 
                    WHERE fidAlumno = ${fidAlumno}
                    AND estado = "Sin revisar"`
    
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
                    conSolicitud: true
                })
            }else{
                res.status(200).send({
                    success: true,
                    conSolicitud: false
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
    const fidAlumno= req.body.fidAlumno;
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
                SolicitudesSinConvenio(fidEspecialidad, fidCoordinadorEspecialidad, fidAlumno, estado) 
                values(${fidEspecialidad}, ${fidCoordinadorEspecialidad}, ${fidAlumno}, "${estado}")`

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

function requestListAgreement(req, res){
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);

    const fidEspecialidad = req.params.idEspecialidad;
    
    
    const sqlQuery = `  select
                            P.idPersona, concat(P.nombres, " ", P.Apellidos) "nombres", AP.estadoMatriculado
                        from
                            Persona as P inner join AlumnoProceso as AP on P.idPersona = AP.fidAlumno
                        where
                            idPersona not in( SELECT A.idAlumno
                                                FROM SolicitudesSinConvenio S inner join Alumno as A on S.fidAlumno = A.idAlumno
                                                WHERE S.fidEspecialidad = ${fidEspecialidad});`;


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
            const data =  result.map(e => {
                return {
                    idPersona: e.idPersona,
                    nombres: e.nombres,
                    estadoMatriculado: e.estadoMatriculado? "Matriculado" : "Sin matricular"
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
    insertRequest,
    requestList,
    verifyRequest,
    requestListAgreement
}