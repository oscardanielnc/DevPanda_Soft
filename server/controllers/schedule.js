const mysql = require('mysql');
const {MYSQL_CREDENTIALS} = require("../config");

function changeOneHourSchedule(req, res){
    //cambia de estado un horario seleccionado
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);

    const {idHorario, idPersona, isStudent, estado} = req.body;

    const sqlQuery = `UPDATE HorarioDisponibilidad 
    SET estado = ${estado}, idAlumno=${isStudent? idPersona: null}
    WHERE idHorario = ${idHorario}`;

    connection.connect(err => {
        if (err) throw err;
    });

    
    connection.query(sqlQuery, (err, result) => {
        if(err){
            res.status(505).send({
                message: "Error inesperado del servidor: " + err.message
            })
        }else{
            if(!result.affectedRows){
                res.status(404).send({
                    message: "No se actualizó ninguna fila"
                })
            }else{
                res.status(200).send({
                    message: "Registro correcto!"
                })
            }
        }   
    });
    connection.end();
}

function getSupervisorSchedule(req, res) {
    //Busca una lista de horarios segun un asesor
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);

    const idAsesor = req.body.idAsesor;

    const sqlQuery = `SELECT * FROM HorarioDisponibilidad
                        WHERE fidAsesor = ${idAsesor} AND activo = 1;`

    connection.connect(err => {
        if (err) throw err;
    });
    connection.query(sqlQuery, sqlObj, (err, result) => {
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
            for(let i=0; i<10; i++) {
                const newDay = {
                    day: getDay(result[i*14].fecha),
                    date: result[i*14].fecha,
                    hours: []
                }

                for(let j=0; j<14; j++) {
                    newDay.hours.push(result[i*14 + j].estado)
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
    const obj = {
        id:1,
        name: "Javier Palacios",
        idfacultad:"informatica",
        isSelected: true,
        isMySupervisor: false
    }

    console.log("Aqui debemos conseguir la lista de supervisores de esta especialidad, devolviendo un array de obj")
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
    changeOneHourSchedule,
    getSupervisorSchedule,
    getSupervisorsBySpecialty
}