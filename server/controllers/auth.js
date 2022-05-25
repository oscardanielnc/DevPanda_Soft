const mysql = require('mysql');
const {MYSQL_CREDENTIALS, PANDA_KEY} = require("../config");
const moment = require("moment");
const jwt = require("jwt-simple");
const { sqlAsync } = require('../utils/async');

async function singIn(req, res) {
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);
    const email = req.params.email;

    connection.connect(err => {
        if (err) throw err;
    });
    try{
        const sqlQueryPersona = `SELECT * FROM Persona WHERE correo='${email}'`;
        const resultPersona  = await sqlAsync(sqlQueryPersona, connection);
        if(resultPersona.length > 0) {
            const dbUser = resultPersona[0];

            if(dbUser.activo===0) {
                res.status(404).send({
                    message: "El usuario se encuentra desactivado!"
                })
            }
            const preUser = {
                idPersona: dbUser.idPersona,
                fidEspecialidad: dbUser.fidEspecialidad,
                nombres: dbUser.nombres,
                apellidos: dbUser.apellidos,
                correo: dbUser.correo,
                tipoPersona: dbUser.tipoPersona,
                activo: 1,
                expire: moment().add(8, 'hours').unix(),
            }
            // aqui extrahemos los datos segun su tipo
            if(preUser.tipoPersona === 'e') {
                const sqlQueryAlumno = `SELECT * FROM Alumno A INNER JOIN AlumnoProceso AP 
                                     ON A.idAlumno = AP.fidAlumno WHERE idAlumno = ${preUser.idPersona} AND estado='C';`
                const resultAlumno  = await sqlAsync(sqlQueryAlumno, connection);
                if(resultAlumno.length>0) {
                    const dbAlumno = resultAlumno[0];
                    const user = {
                        ...preUser,
                        estadoMatriculado: dbAlumno.estadoMatriculado,
                        estadoProceso: dbAlumno.estadoProceso,
                        codigo: dbAlumno.codigo,
                        idAlumnoProceso: dbAlumno.idAlumnoProceso,
                        fidProceso: dbAlumno.fidProceso,
                        fidAsesor: dbAlumno.fidAsesor,
                        nota: dbAlumno.nota,
                        grupoAsignado: dbAlumno.grupoAsignado,
                        estado: 'C'
                    }
                    const accessToken = jwt.encode(user, PANDA_KEY);
                    res.status(200).send({accessToken});
                    // res.status(200).send({user});

                } else {
                    res.status(404).send({
                        message: "No se ha encontrado que el alumno esté dentro de un proceso, o se hizo un mal registro de él."
                    })
                }
            } else {
                const sqlQueryPersonal = `SELECT * FROM PersonalAdministrativo WHERE idPersonal=${preUser.idPersona};`
                const resultPersonal  = await sqlAsync(sqlQueryPersonal, connection);
                if(resultPersonal.length>0) {
                    const dbPersonal = resultPersonal[0];
                    const user = {
                        ...preUser,
                        tipoPersonal: dbPersonal.tipoPersonal,
                        estado: dbPersonal.estado,
                    }
                    const accessToken = jwt.encode(user, PANDA_KEY);
                    res.status(200).send({accessToken});
                    // res.status(200).send({user});

                } else {
                    res.status(404).send({
                        message: "No se ha encontrado que al personal administrativo. Posiblemente se hizo un mal registro de él."
                    })
                }
            }
        } else {
            res.status(404).send({
                message: "El usuario no se encuentra registrado!"
            })
        }
    }catch(e){
        res.status(505).send({ 
            message: "Error en el servidor " + e.message
        })
    }
    connection.end();
}

async function signUp(req, res) {
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);
    const {firstName, lastName, email, specialty, code} = req.body;

    connection.connect(err => {
        if (err) throw err;
    });
    try{
        const sqlQueryPersonas = `SELECT * FROM Persona WHERE correo='${email}'`;
        const resultPersona  = await sqlAsync(sqlQueryPersonas, connection);

        if(resultPersona.length === 0) {
            // TODO: regsitro en la BD
            const sqlQueryPersona = `INSERT INTO Persona(fidEspecialidad, nombres, apellidos, correo, contrasena, tipoPersona, activo) 
                                            values(${specialty},'${firstName}','${lastName}','${email}',null,'e',1);`
            const resultPersona  = await sqlAsync(sqlQueryPersona, connection);

            const idPersona = resultPersona.insertId;
            if(idPersona && idPersona >= 0) {
                const sqlQueryAlumno = `INSERT INTO Alumno(idAlumno, codigo)
                                                values(${idPersona},${code});`
                const resultAlumno  = await sqlAsync(sqlQueryAlumno, connection);

                if(resultAlumno.affectedRows) {
                    const sqlQueryAlumnoProceso = `INSERT INTO AlumnoProceso(fidProceso, fidAlumno, fidAsesor, nota, grupoAsignado, estado, estadoMatriculado, estadoProceso)
                                                    values(1, ${idPersona}, null, null, null, 'C', 0, 1);`
                    const resultAlumnoProceso  = await sqlAsync(sqlQueryAlumnoProceso, connection);

                    if(resultAlumnoProceso.affectedRows) {
                        const student = {
                            idPersona: idPersona,
                            fidEspecialidad: specialty,
                            nombres: firstName,
                            apellidos: lastName,
                            correo: email,
                            tipoPersona: 'e',
                            activo: 1,
                            expire: moment().add(8, 'hours').unix(),
                            estadoMatriculado: 0,
                            estadoProceso: 1,
                            codigo: code,
                            idAlumnoProceso: resultAlumnoProceso.insertId,
                            fidProceso: 1,
                            fidAsesor: null,
                            nota: null,
                            grupoAsignado: null,
                            estado: 'C'
                        }
                        const accessToken = jwt.encode(student, PANDA_KEY);
                        res.status(200).send({accessToken});
                        // res.status(200).send({user});
                    } else {
                        res.status(505).send({
                            message: "Error al tratar de registrar en la tabla AlumnoProceso"
                        })
                    }
                } else {
                    res.status(505).send({
                        message: "Error al tratar de registrar en la tabla Alumno"
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
    singIn,
    signUp
}