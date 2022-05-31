const mysql = require('mysql');
const {MYSQL_CREDENTIALS} = require("../config")

function insert(req, res) {
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);


    const nombreEsp = req.body.nombreEsp;
    const codigo = req.body.codigo;
    const activo = req.body.activo? 1: 0;

    const sqlObj = {
        nombreEsp, codigo, activo
    };
    const sqlQuery = `INSERT INTO Especialidad SET ?`;
    connection.connect(err => {
        if (err) throw err;
    });
    connection.query(sqlQuery, sqlObj, (err, result) => {
        if (err) {
            res.status(505).send({
                success: false,
                message: "Error inesperado en el servidor"
            })
        }
        const specialty = {
            idEspecialidad: result.insertId,
            nombreEsp: nombreEsp,
            codigo: codigo,
            fidCoordVigente: null,
            activo: activo
        }
        res.status(200).send({
            success: true,
            specialty
        })
    });

    connection.end();
}
function selectAll(req, res) {
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);

    const sqlQuery = `SELECT * FROM Especialidad`;
    connection.connect(err => {
        if (err) throw err;
    });
    connection.query(sqlQuery, (err, result) => {
        if (err) {
            res.status(505).send({
                success: false,
                message: "Error inesperado en el servidor"
            })
        }
        
        res.status(200).send({
            success: true,
            result
        })
    });

    connection.end();
}
module.exports = {
    insert,
    selectAll
}