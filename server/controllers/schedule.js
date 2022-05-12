const mysql = require('mysql');
const {MYSQL_CREDENTIALS} = require("../config");

async function changeHoursSchedule(req, res){
    //cambia de estado un horario seleccionado
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);
    const {arrHours, idPersona, isStudent} = req.body;
    const idAlumno = isStudent? idPersona: null;

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

    for(const i in arrHours) {
        // console.log(arrHours[i])
        const element = arrHours[i]
        try {
            const sqlQuery = `UPDATE HorarioDisponibilidad 
                SET estado = ${element.state}, idAlumno=${idAlumno}
                WHERE idHorario = ${element.id}`;
            const result = await sqlAsync(sqlQuery);
            console.log(i, result)
        } catch (err) {
            console.log(err)
            res.status(505).send({
                message: "Error inesperado del servidor: " + err.message
            })
        }
    };
    res.status(200).send({
        message: "Registro de horas correcta!"
    })
    connection.end();
}

function getSupervisorSchedule(req, res) {
    //Busca una lista de horarios segun un asesor
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);

    const idAsesor = req.params.idAsesor;

    const sqlQuery = `SELECT * FROM HorarioDisponibilidad
                        WHERE fidAsesor = ${idAsesor} AND activo = 1;`

    connection.connect(err => {
        if (err) throw err;
    });
    connection.query(sqlQuery, (err, result) => {
        if (err) {
            res.status(505).send({
                message: "Error inesperado en el servidor"
            })
        }
        else if(result.length === 0) {
            res.status(404).send({
                message: "No se han encontrado horarios para este Supervisor"
            })
        } else {
            const data = [];
            const dataOrdered = result.sort((a,b) => {
                const fechaA = a.fecha
                const fechaB = b.fecha
                const horaA = a.hora
                const horaB = b.hora
                const auxArrA = fechaA.split('-');
                const numA = Number(auxArrA[2])*1000000 + Number(auxArrA[1])*10000 + Number(auxArrA[0])*100 + horaA
                const auxArrB = fechaB.split('-');
                const numB = Number(auxArrB[2])*1000000 + Number(auxArrB[1])*10000 + Number(auxArrB[0])*100 + horaB
                if(numA>numB) return 1
                else if(numA<numB) return -1
                return 0
            })
            for(let i=0; i<10; i++) {
                const newDay = {
                    day: getDay(dataOrdered[i*14].fecha),
                    date: dataOrdered[i*14].fecha,
                    hours: []
                }
                
                for(let j=0; j<14; j++) {
                    const dat = {
                        state: dataOrdered[i*14 + j].estado,
                        id: dataOrdered[i*14 + j].idHorario
                    }
                    newDay.hours.push(dat)
                }
                data.push(newDay)
            }
            
            res.status(200).send(data)
        }
    });

    connection.end();
}
function getSupervisorsBySpecialty(req, res) {
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);

    const {idSpecialty} = req.params;

    const sqlQuery = `SELECT
	                    P.nombres, P.apellidos, P.idPersona, E.nombreEsp
                    FROM
	                     Persona AS P INNER JOIN PersonalAdministrativo as PA on P.idPersona = PA.idPersonal, Especialidad as E
                    WHERE
                        PA.tipoPersonal = 'S'
                        AND P.fidEspecialidad = ${idSpecialty}
                        AND P.activo = 1
                        AND E.idEspecialidad = ${idSpecialty};`;

    connection.connect(err => {
        if (err) throw err;
    });

    connection.query(sqlQuery, (err, result) => {
        if (err) {
            res.status(505).send({
                message: "Error inesperado en el servidor"
            })
        }
        else if(result.length === 0) {
            res.status(404).send({
                message: "No se han encontrado supervisores para esta especialidad"
            })
        } else {
            const data =  result.map(e => {
                return {
                    id:e.idPersona,
                    name: e.nombres + " " + e.apellidos,
                    idfacultad:e.nombreEsp,
                    isSelected: true,
                    isMySupervisor: false
                }
            });
            
            res.status(200).send(data)
        }
    });
}
function getDay(date) {
    const auxArr = date.split('-');
    const newDate = `${auxArr[1]}-${auxArr[0]}-${auxArr[2]}`;
    const a = new Date(newDate);
    const b = a.toString().substr(0, 3);
    switch (b) {
        case "Mon": return "Lunes";
        case "Tue": return "Martes";
        case "Wed": return "Miércoles";
        case "Thu": return "Jueves";
        case "Fri": return "Viernes";
        case "Sat": return "Sábado";
        default: return "Domingo";
    }
}


module.exports = {
    changeHoursSchedule,
    getSupervisorSchedule,
    getSupervisorsBySpecialty
}