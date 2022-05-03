const mysql = require('mysql');
const {MYSQL_CREDENTIALS} = require("../config")

function insert(req, res) {
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);

    const nombreEsp = req.body.nombreEsp;
    const flagMatricula = req.body.flagMatricula? 1: 0;
    const flagConvenio = req.body.flagConvenio? 1: 0;

    const sqlObj = {
        nombreEsp, flagMatricula, flagConvenio
    };
    const sqlQuery = `INSERT INTO Especialidad SET ?`;
    connection.connect(err => {
        if (err) throw err;
    });
    connection.query(sqlQuery, sqlObj, (err, result) => {
        if (err) {
            res.status(505).send({
                message: "Error inesperado en el servidor"
            })
        }
        res.status(200).send({
            message: "Especialidad insertada correctamente"
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
                message: "Error inesperado en el servidor"
            })
        }
        res.status(200).send(result)
    });

    connection.end();
}
module.exports = {
    insert,
    selectAll
}