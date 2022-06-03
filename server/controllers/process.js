const mysql = require('mysql');
const {MYSQL_CREDENTIALS} = require("../config");
const { sqlAsync } = require('../utils/async');

async function createProcess(req, res) {
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);
    const {anio, cicle, specialty, ini, fin, flow} = req.body;

    connection.connect(err => {
        if (err) throw err;
    });
    try{
        const sqlProcess = `SELECT * FROM Proceso WHERE fidEspecialidad=${specialty} AND anio=${anio} AND ciclo=${cicle};`
        const resultProcess  = await sqlAsync(sqlProcess, connection);
        // falta actualizar a procesoActivo=0, los otros procesos de esta especialidad

        if(resultProcess.length > 0) {
            res.status(505).send({ 
                success: false,
                message: "Ya se ha creado un proceso para su especialidad con este año y ciclo"
            })
        } else {
            const sqlQuery = `INSERT INTO 
                Proceso(fidEspecialidad, nombre, fechaIni, fechaFin, activo, procesoActivo, anio, ciclo) 
                values(${specialty}, null, ${ini}, ${fin}, 1, 1, ${anio}, ${cicle})`;
            const result  = await sqlAsync(sqlQuery, connection);

            if(!result.insertId) {
                res.status(505).send({ 
                    success: false,
                    message: "Error al tratar de crear el proceso"
                })
            } else {
                for(let phase of flow) {
                    const sqlPhase = `INSERT INTO 
                        EtapaProceso(fidProceso, nombre, activo, orden, codigo) 
                        values(${result.insertId}, '${phase.name}', 1, ${phase.order}, '${phase.code}')`;
                    await sqlAsync(sqlPhase, connection);
                }
                res.status(200).send({
                    success: true,
                    message: "Proceso creado correctamente!"
                })
            }

        }
    } catch(e){
        res.status(505).send({ 
            success: false,
            message: "Error en el servidor " + e.message
        })
    }
    connection.end();
}

module.exports = {
    createProcess
}