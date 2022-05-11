const mysql = require('mysql');
const {MYSQL_CREDENTIALS} = require("../config")


function getMonthlyWeeks(req, res) {
    //Busca una lista de semanas según la fecha actual
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);

    const fechaAct = req.body.fechaAct;

    const sqlQuery = `  SELECT
                            idSemana, fechaInicio, fechaFin
                        FROM
                            Semana
                        WHERE
                            MONTH(fechaInicio) = MONTH("${fechaAct}");`;

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
    getMonthlyWeeks
}