const mysql = require('mysql');
const {MYSQL_CREDENTIALS} = require("../config");

function makeAnAppointment(req, res){
    //Coloca como ocupado un horario seleccionado
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);

    const idHorario = req.body.idHorario;

    const sqlQuery = `UPDATE HorarioDisponibilidad 
    SET ocupado = 1
    WHERE idHorario = ${idHorario}
    AND ocupado = 0`;

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

function getAssessorScheduleByWeek(req, res) {
    //Busca una lista de horarios segun un asesor y una semana
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);

    const idAsesor = req.body.idAsesor;
    const semana = req.body.semana;
    const fechaInicio = semana.fechaInicio;
    const fechaFin = semana.fechaFin;

    const sqlQuery = `  SELECT
                            idHorario, fecha, estado, hora
                        FROM
                            HorarioDisponibilidad
                        WHERE
                            fidAsesor = ${idAsesor}
                            AND fecha >= "${fechaInicio}"
                            AND fecha <= "${fechaFin}"
                            AND activo = 1;`

    connection.connect(err => {
        if (err) throw err;
    });
    connection.query(sqlQuery, sqlObj, (err, result) => {
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
    makeAnAppointment,
    getAssessorScheduleByWeek
}