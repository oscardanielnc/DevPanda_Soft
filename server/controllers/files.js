const mysql = require('mysql');
const {MYSQL_CREDENTIALS} = require("../config")
const fs = require('fs');
const path = require('path');

function uploadDocs(req, res) {
    const code = req.params.code;
    const isStudent = Number(req.params.isStudent);
    const files = req.files;

    for (const doc in files) {
        const objDoc = files[doc];
        if(!checkCorrectDocument(objDoc, ['pdf', 'docx', 'doc', 'xlsx', 'txt'])) {
            res.status(505).send({ 
                success: false,
                message: "La extencion alguna imagen no es valida. Solo se aceptan: pdf, docx, doc, txt, xlsx."
            })
        }
    }
    //console.log(req)
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);
    connection.connect(err => {
        if (err) throw err;
    });
    
    if(files && Object.keys(files).length !== 0) {
        const sqlQuerySearch = `UPDATE Documento SET activo = 0 WHERE codigo='${code}' AND delAlumno=${isStudent}`;
        connection.query(sqlQuerySearch, (err, result) => {
            if (err) {
                console.log(err)
                res.status(505).send({
                    success: false,
                    message: "Error al tratar de comprobar documentos en DB."
                })
            }
        });

        for (const doc in files) {
            const objDoc = files[doc];
            const docPathName = objDoc.path.split("/")[2];
            const docOriginalName = objDoc.originalFilename;

            const sqlObj = {
                nombre: docOriginalName,
                ruta: docPathName,
                delAlumno: isStudent,
                activo: 1,
                codigo: code
            };
            const sqlQuery = `INSERT INTO Documento SET ?`;

            connection.query(sqlQuery, sqlObj, (err, result) => {
                if (err) {
                    res.status(505).send({
                        success: false,
                        message: "Error al tratar de insertar un docuemnto."
                    })
                }
            });
        }

        res.status(200).send({
            success: true,
            message: "Archivos insertados correctamente!"
        })

    } else {
        res.status(505).send({
            success: false,
            message: "No se han enviado archivos!"
        })
    }
    connection.end();
}

function getAllDocs(req, res) {
    const connection = mysql.createConnection(MYSQL_CREDENTIALS);
    const code = req.params.code;
    const isStudent = Number(req.params.isStudent);
    const sqlQuery = `SELECT * FROM Documento WHERE codigo='${code}' AND delAlumno=${isStudent} AND activo=1;`;
    connection.connect(err => {
        if (err) throw err;
    });
    connection.query(sqlQuery, (err, result) => {
        if (err) {
            console.log(err)
            res.status(505).send({
                success: false,
                message: "Error al tratar de acceder a la BD."
            })
        }
        
        res.status(200).send({
            success: true,
            result
        })
    });

    connection.end();
}

function getDoc(req, res) {
    const filePath = req.params.filePath;
    const fileName = req.params.fileName || `blank.${filePath.split(".")[1]}`;
    const exactPath = `./uploads/docs/${filePath}`;

    res.download(exactPath, fileName, (err) => {
        if(err) {
            console.log(err)
        }
    });
}

function checkCorrectDocument(objDoc, exts) {
    let filePath = objDoc.path;
    let fileSplit = filePath.split("/");
    let fileName = fileSplit[2];

    let extSplit = fileName.split(".");
    let fileExt = extSplit[1];

    return exts.includes(fileExt)
}


module.exports = {
    uploadDocs,
    getAllDocs,
    getDoc
}