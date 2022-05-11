const mysql = require('mysql');
const {MYSQL_CREDENTIALS} = require("../config");

//Traer los entregables de cierto proceso
//function 

//Traer los entregables del alumno

//Traer un entregable en especifico de un alumno
async function deliverableStudent(req, res){
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);
    
    
    functionSelect = () =>{
        return new Promise((resolve, reject)=>{
            connection.query(sqlQuery, async (err, result) => {
                if (err) {
                    return reject(err);
                }else{
                    return resolve(result)
                }
            })
        })
    }

    // functionInsert = () =>{
    //     return new Promise((resolve, reject)=>{
    //         connection.query(sqlQuery, sqlObj, async (err, result) => {
    //             if (err) {
    //                 return reject(err);
    //             }else{
    //                 return resolve(result.insertId);
    //             }
    //         })
    //     })
    // }

    var dataEntregable = {
        "idAlumno":  req.params.idAlumno,    
        "deliverable":{
            "idEntregable": req.params.idEntregable,
            "name": "",
            "description": "",
            "flagIni": null,
            "fechaIni": "",
            "flagFin": null,
            "fechaFin": "",
            "flagNota": null
        },
        "deliverableResponse":{
            "idRespuestaEntregable": null,
            "docState":"",
            "evaState": "",
            "observation": "",
            "grade": null,
            "uploadDate": ""
        }
    }

    const fidEntregable = req.params.idEntregable;
    const idAlumno = req.params.idAlumno;

    var resultElement;

    var sqlQuery = `SELECT * from Entregable 
                      WHERE idEntregable = ${fidEntregable}`;

    connection.connect(err => {
        if (err) throw err;
    });

    try{
        resultElement  = await functionSelect();
        if(!resultElement.length){
            res.status(404).send({ message: "No se encontro un entregable con ese identificador"})
            return 
        } 
    }catch(e){
        res.status(505).send({ message: "Error en el servidor " + e.message})
        return 
    }  

    dataEntregable.deliverable.name = resultElement[0].nombre;
    dataEntregable.deliverable.description = resultElement[0].descripcion;
    dataEntregable.deliverable.flagFin = resultElement[0].flagFin
    dataEntregable.deliverable.flagIni = resultElement[0].flagIni
    dataEntregable.deliverable.fechaIni = resultElement[0].fechaIni
    dataEntregable.deliverable.fechaFin = resultElement[0].fechaFin
    dataEntregable.deliverable.flagNota = resultElement[0].flagNota

    sqlQuery = `SELECT *
                FROM RespuestaEntregable R, AlumnoProceso AP
                WHERE R.fidEntregable = ${idEntregable}
                AND R.fidAlumnoProceso = AP.idAlumnoProceso
                AND AP.fidAlumno = ${idAlumno}
                AND AP.nota is null`;

    try{
        resultElement  = await functionSelect();
        if(resultElement.length){
            dataEntregable.deliverableResponse.idRespuestaEntregable = resultElement[0].idRespuestaEntregable;
            dataEntregable.deliverableResponse.docState = resultElement[0].estado;
            dataEntregable.deliverableResponse.evaState = resultElement[0].flagFin
            dataEntregable.deliverableResponse.observation = resultElement[0].flagIni
            dataEntregable.deliverableResponse.grade = resultElement[0].fechaIni
            dataEntregable.deliverableResponse.uploadDate = resultElement[0].fechaFin
            dataEntregable.deliverableResponse.state = resultElement[0].flagNota
        }
    }catch(e){
        res.status(505).send({ message: "Error en el servidor " + e.message})
        return 
    }  

    
    res.status(200).send({ valor: resultElement})
    connection.end();
}

module.exports = {
    deliverableStudent
}