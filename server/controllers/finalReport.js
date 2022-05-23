const mysql = require('mysql');
const {MYSQL_CREDENTIALS} = require("../config");

function insertFinalReport(req, res) {
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);
    
    const  fidAlumnoProceso = req.params.fidAlumnoProceso;
    //const  fidAlumnoProceso = req.body.fidAlumnoProceso;

    const sqlQuery = `SELECT *
                    FROM EntregaFichaInscripcion
                    WHERE fidAlumnoProceso = ${fidAlumnoProceso}`;

    connection.connect(err => {
        if (err) throw err;
    });

    connection.query(sqlQuery, (err, result) => {
        if (err) {
            res.status(505).send({
                success: false,
                message: "Error inesperado en el servidor"
            })
        }else{
            res.status(200).send({
                success: false,
                result: result[0]
            });
        }
    });

    connection.end();
}
