const mysql = require('mysql');
const {MYSQL_CREDENTIALS, PANDA_KEY} = require("../config");
const moment = require("moment");
const jwt = require("jwt-simple");

function singIn(req, res) {
    //const connection = mysql.createConnection(MYSQL_CREDENTIALS);

    const email = req.body.email;

    // const sqlQuery = `SELECT * FROM Alumno?`;

    // connection.connect(err => {
    //     if (err) throw err;
    // });
    // connection.query(sqlQuery, (err, result) => {
    //     if (err) {
    //         res.status(505).send({
    //             message: "Error inesperado en el servidor"
    //         })
    //     }
    //     // las conversiones respectivas asies
    //     res.status(200).send(result)
    // });

    // connection.end();
    const user = {
        idPersona: 1,
        fidEspecialidad: 1,
        nombres: "Oscar Daniel",
        apellidos: "Navarro Cieza",
        correo: email,
        tipoPersona: 'A',
        activo: true,
        estadoMatriculado: true,
        estadoProceso: 1,
        expire: moment().add(3, "days").unix()
    }
    const accessToken = jwt.encode(user, PANDA_KEY);
    res.status(200).send({accessToken});
    //res.status(200).send(user);
}

module.exports = {
    singIn
}