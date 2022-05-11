const mysql = require('mysql');
const {MYSQL_CREDENTIALS} = require("../config")

function searchAssessorsBySpecialty(req, res) {
    //Busca una lista de asesores según la especialidad de un alumno 
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);

    const idAlumno = req.body.idAlumno;

    const sqlQuery = `SELECT
	                    P.nombres, P.apellidos, P.idPersona
                    FROM
	                     Persona AS P INNER JOIN PersonalAdministrativo as PA on P.idPersona = PA.idPersonal
                    WHERE
                        PA.tipoPersonal = 'S'
                        AND P.fidEspecialidad = (	SELECT
                                                        fidEspecialidad
                                                    FROM
                                                        Persona
                                                    WHERE
                                                        idPersona = ${idAlumno})
                        AND P.activo = 1;`;

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


module.exports = {
    searchAssessorsBySpecialty
}
