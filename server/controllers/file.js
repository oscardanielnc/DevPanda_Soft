const mysql = require('mysql');
const {MYSQL_CREDENTIALS} = require("../config");

function insertFile(req, res) {
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);
    
    const nombre = req.body.nombre;
    const archivo = req.body.archivo;
    const fidRespuestaEntregable = req.body.fidRespuestaEntregable;
    const delAlumno = req.body.delAlumno? 1: 0;
    const activo = 1;
    //const  fidAlumnoProceso = req.body.fidAlumnoProceso;

    const sqlObj = {
        nombre, archivo, activo, delAlumno, fidRespuestaEntregable
    };

  
    const sqlQuery = `INSERT INTO Documento SET ?`;


    connection.connect(err => {
        if (err) throw err;
    });

    connection.query(sqlQuery, sqlObj, (err, result) => {

        if(!fidRespuestaEntregable){
            res.status(505).send({
                message: "No se ha enviado el fidRespuestaEntregable"
            })
        } else {
            if(err){
                if(err.code==="ER_NO_REFERENCED_ROW_2"){
                    res.status(505).send({
                        message: "No existe respuesta de entregable donde guardar el documento. "
                    })

                }else{
                    res.status(505).send({
                        message: "Error inesperado del servidor: <br>" + err.message
                    })
                }
                
            }else{
                res.status(200).send({
                    message: "Documento insertado correctamente"
                })
            }   
        }
    });

    connection.end();
}
