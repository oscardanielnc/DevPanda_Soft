const mysql = require('mysql');
const {MYSQL_CREDENTIALS} = require("../config");
const { sqlAsync } = require('../utils/async');

async function createAdministrative(req, res) {
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);
    const {firstName, lastName, email, specialty, personalType, active} = req.body;

    connection.connect(err => {
        if (err) throw err;
    });
    try{
        const sqlQueryPersonas = `SELECT * FROM Persona WHERE correo='${email}'`;
        const resultPersona  = await sqlAsync(sqlQueryPersonas, connection);

        if(resultPersona.length === 0) {
            const sqlQueryPersona = `INSERT INTO Persona(fidEspecialidad, nombres, apellidos, correo, contrasena, tipoPersona, activo) 
                                            values(${specialty},'${firstName}','${lastName}','${email}',null,'p',${active});`
            const resultPersona  = await sqlAsync(sqlQueryPersona, connection);

            const idPersona = resultPersona.insertId;
            if(idPersona && idPersona >= 0) {
                const sqlQueryPersonal = `INSERT INTO PersonalAdministrativo(idPersonal, tipoPersonal, estado)
                                                values(${idPersona}, '${personalType}', 1);`
                const resultPersonal  = await sqlAsync(sqlQueryPersonal, connection);

                if(resultPersonal.affectedRows) {
                    // Solo para los supervisores, creamos su horarios
                    if(personalType==='S') {
                        for(let i=16; i<28; i++) {
                            for(let j=9; j<23; j++) {
                                const sqlHour = `INSERT INTO HorarioDisponibilidad(fidAsesor, hora, estado, fecha, activo, idAlumno, link) 
                                    VALUES(${idPersona}, ${j}, 1, '${i}-05-2022', 1, null, null);`
                                await sqlAsync(sqlHour, connection);
                            }
                            if(i===20) i+=2;
                        }
                    }

                    const personal = {
                        idPersona: idPersona,
                        fidEspecialidad: specialty,
                        nombres: firstName,
                        apellidos: lastName,
                        correo: email,
                        tipoPersona: 'p',
                        activo: 1,
                        tipoPersonal: personalType,
                        estado: 1
                    }
                    const type = (personalType==='S')? "supervisor": "coordinador";
                    res.status(200).send({
                        success: true,
                        message: `Se ha creado el ${type} correctamente`,
                        personal
                    });
                } else {
                    res.status(505).send({
                        success: false,
                        message: "Error al tratar de registrar en la tabla PersonalAdministrativo"
                    })
                }
            } else {
                res.status(505).send({
                    success: false,
                    message: "Error al tratar de registrar en la tabla Persona"
                })
            }
        } else {
            res.status(505).send({
                success: false,
                message: "Este usuario ya se encuentra registrado en la base de datos"
            })
        }
    }catch(e){
        res.status(505).send({ 
            success: false,
            message: "Error en el servidor " + e.message
        })
    }
    connection.end();
}

function getCoordinators(req, res) {
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);

    const sqlQuery = `SELECT idPersona,nombres,apellidos,fidEspecialidad, nombreEsp, activo, correo, estado FROM PersonalAdministrativo A 
        INNER JOIN Persona P ON A.idPersonal = P.idPersona INNER JOIN Especialidad E ON E.idEspecialidad = P.fidEspecialidad
        WHERE tipoPersonal='E';`;

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
        else if(result.length === 0) {
            res.status(404).send({
                success: false,
                message: "No se han encontrados coordinadores para esta especialidad"
            })
        } else {            
            res.status(200).send({
                success: true,
                result
            })
        }
    });
}
function getSupervisors(req, res) {
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);
    const {idSpecialty} = req.params;

    const sqlQuery = `SELECT P.nombres, P.apellidos, P.idPersona, P.correo, PA.estado, P.activo FROM
        Persona AS P INNER JOIN PersonalAdministrativo as PA ON P.idPersona = PA.idPersonal
        WHERE PA.tipoPersonal = 'S' AND P.activo = 1 AND P.tipoPersona = 'p' AND P.fidEspecialidad = ${idSpecialty};`;

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
        else if(result.length === 0) {
            res.status(404).send({
                success: false,
                message: "No se han encontrados suvervisores para esta especialidad"
            })
        } else {            
            res.status(200).send({
                success: true,
                result
            })
        }
    });
}

function getSupervisorByID(req, res) {
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);
    const {idSupervisor} = req.params;

    const sqlQuery = `SELECT P.nombres, P.apellidos, P.idPersona, P.correo, PA.estado, P.activo FROM
        Persona AS P INNER JOIN PersonalAdministrativo as PA ON P.idPersona = PA.idPersonal
        WHERE PA.tipoPersonal = 'S' AND P.activo = 1 AND P.tipoPersona = 'p' AND P.idPersona = ${idSupervisor};`;

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
        else if(result.length === 0) {
            res.status(404).send({
                success: false,
                message: "No se han encontrado suvervisor para este ID"
            })
        } else {            
            res.status(200).send({
                success: true,
                result
            })
        }
    });
}

module.exports = {
    createAdministrative,
    getCoordinators,
    getSupervisors,
    getSupervisorByID
}