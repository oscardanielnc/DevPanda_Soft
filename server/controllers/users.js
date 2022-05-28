const mysql = require('mysql');
const {MYSQL_CREDENTIALS, PANDA_KEY} = require("../config");
const moment = require("moment");
const jwt = require("jwt-simple");
const { sqlAsync } = require('../utils/async');

async function createAdministrative(req, res) {
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);
    const {firstName, lastName, email, specialty, personalType} = req.body;

    connection.connect(err => {
        if (err) throw err;
    });
    try{
        const sqlQueryPersonas = `SELECT * FROM Persona WHERE correo='${email}'`;
        const resultPersona  = await sqlAsync(sqlQueryPersonas, connection);

        if(resultPersona.length === 0) {
            const sqlQueryPersona = `INSERT INTO Persona(fidEspecialidad, nombres, apellidos, correo, contrasena, tipoPersona, activo) 
                                            values(${specialty},'${firstName}','${lastName}','${email}',null,'p',1);`
            const resultPersona  = await sqlAsync(sqlQueryPersona, connection);

            const idPersona = resultPersona.insertId;
            if(idPersona && idPersona >= 0) {
                const sqlQueryPersonal = `INSERT INTO PersonalAdministrativo(idPersonal, tipoPersonal, estado)
                                                values(${idPersona}, '${personalType}', 1);`
                const resultPersonal  = await sqlAsync(sqlQueryPersonal, connection);

                if(resultPersonal.affectedRows) {
                    const personal = {
                        idPersona: idPersona,
                        fidEspecialidad: specialty,
                        nombres: firstName,
                        apellidos: lastName,
                        correo: email,
                        tipoPersona: 'p',
                        activo: 1,
                        expire: moment().add(8, 'hours').unix(),
                        tipoPersonal: personalType,
                        estado: 1
                    }
                    const accessToken = jwt.encode(personal, PANDA_KEY);
                    res.status(200).send({accessToken});
                    // res.status(200).send({user});
                } else {
                    res.status(505).send({
                        message: "Error al tratar de registrar en la tabla PersonalAdministrativo"
                    })
                }
            } else {
                res.status(505).send({
                    message: "Error al tratar de registrar en la tabla Persona"
                })
            }
        } else {
            res.status(505).send({
                message: "Este usuario ya se encuentra registrado en la base de datos"
            })
        }
    }catch(e){
        res.status(505).send({ 
            message: "Error en el servidor " + e.message
        })
    }
    connection.end();
}

module.exports = {
    createAdministrative
}