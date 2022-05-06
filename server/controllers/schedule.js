const mysql = require('mysql');
const {MYSQL_CREDENTIALS} = require("../config");

function makeAnAppointment(req, res){
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);

    const fidAsesor = req.body.fidAsesor;
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
