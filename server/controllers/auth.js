const mysql = require('mysql');
const {MYSQL_CREDENTIALS, PANDA_KEY} = require("../config");
const moment = require("moment");
const jwt = require("jwt-simple");
const e = require('cors');

async function singIn(req, res) {
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);
    const email = req.params.email;
    
    // const sqlQuery = `SELECT * FROM Persona WHERE correo='${email}'`;

    sqlAsync = (sql) =>{
        return new Promise((resolve, reject)=>{
            connection.query(sql, async (err, result) => {
                if (err) {
                    return reject(err);
                }else{
                    return resolve(result)
                }
            })
        })
    }

    connection.connect(err => {
        if (err) throw err;
    });
    try{
        const sqlQueryPersona = `SELECT * FROM Persona WHERE correo='${email}'`;
        const resultPersona  = await sqlAsync(sqlQueryPersona);
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
                expire: moment().add(3, "days").unix(),
            }
            // aqui extrahemos los datos segun su tipo
            if(preUser.tipoPersona === 'e') {
                const sqlQueryAlumno = `SELECT * FROM Alumno A INNER JOIN AlumnoProceso AP 
                                     ON A.idAlumno = AP.fidAlumno WHERE idAlumno = ${preUser.idPersona} AND estado='C';`
                const resultAlumno  = await sqlAsync(sqlQueryAlumno);
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
                const resultPersonal  = await sqlAsync(sqlQueryPersonal);
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

module.exports = {
    singIn
}