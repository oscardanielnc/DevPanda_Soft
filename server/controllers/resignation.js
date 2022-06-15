const mysql = require('mysql');
const {MYSQL_CREDENTIALS} = require("../config");

function getListStudentsResignation(req, res){
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);

    const idProceso = req.params.idProceso;
    
    
    const sqlQuery = `  select
                            P.idPersona, concat(P.nombres, P.apellidos) "nombres", E.nombreEsp, R.estado
                        from
                            Renuncia as R inner join AlumnoProceso as AP on R.fidAlumnoProceso = AP.idAlumnoProceso
                            inner join Persona as P on AP.fidAlumno = P.idPersona inner join Especialidad as E
                            on E.idEspecialidad = P.fidEspecialidad
                        where
                            AP.fidProceso = ${idProceso};`;


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
            })
        }
    });

    connection.end();
}

module.exports = {
    getListStudentsResignation
}