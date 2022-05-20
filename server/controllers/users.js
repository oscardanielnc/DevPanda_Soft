const mysql = require('mysql');
const {MYSQL_CREDENTIALS} = require("../config")

function test(req, res) {
    console.log("Mensaje desconocido")
    res.status(200).send({message: "Estoy encendido, pandita!"})
}
module.exports = {
    test
}