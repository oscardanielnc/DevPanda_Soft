const mysql = require('mysql');
const {MYSQL_CREDENTIALS} = require("../config")

async function logIn(req, res) {
    // const connection = mysql.createConnection(MYSQL_CREDENTIALS);
    
    // const sqlProcedure = 'PROCEDURE_NAME';
    // try {
    //     const result = await connection.request()
    //         .input('email', email)
    //         .input('password', password)
    //         .output('Algo', 0)
    //         .execute(sqlProcedure);
    //     const data = result.recordset;

    //     console.log("Esto devuleve el Procedure", data);
    // } catch (error) {
    //     res.status(500).json(error);
    // }

    // connection.end();
    console.log("TO-DO: logIn")
}
module.exports = {
    logIn
}