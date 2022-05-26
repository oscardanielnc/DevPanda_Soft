const mysql = require('mysql');
const {MYSQL_CREDENTIALS} = require("../config")

function nabvarStudent(req, res) {
    console.log("Mensaje desconocido")
    res.status(200).send({message: "Estoy encendido, pandita!"})
}
module.exports = {
    nabvarStudent
}