const mysql = require('mysql');
const {MYSQL_CREDENTIALS} = require("../config");
const { sqlAsync } = require('../utils/async');

async function selectStudentsByProcessSpecialty(req, res) {
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);
    const {fidProceso} = req.params; 

    connection.connect(err => {
        if (err) throw err;
    });
    try{
        const sqlQueryAlumno = `SELECT idPersona,nombres,apellidos,correo,estadoMatriculado,codigo,grupoAsignado,estado 
                    FROM Alumno A INNER JOIN AlumnoProceso AP ON A.idAlumno = AP.fidAlumno INNER JOIN Persona P ON A.idAlumno = P.idPersona 
                    WHERE P.fidEspecialidad = ${fidProceso} AND P.tipoPersona='e' AND P.activo=1;`
        const resultAlumno  = await sqlAsync(sqlQueryAlumno, connection);
        res.status(200).send({
            success: true,
            students: resultAlumno
        })


    } catch(e){
        res.status(505).send({ 
            success: false,
            message: "Error en el servidor " + e.message
        })
    }
    connection.end();
}

module.exports = {
    selectStudentsByProcessSpecialty
}