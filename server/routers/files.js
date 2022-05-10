const express = require('express');
const FilesController = require("../controllers/files");
const multipart = require("connect-multiparty");

const md_upload_docs = multipart({uploadDir: "./uploads/docs"})

const api = express.Router();

api.get("/docs/:code/:isStudent", FilesController.getAllDocs);
api.put("/docs/:code/:isStudent", [md_upload_docs], FilesController.uploadDocs);
api.get("/doc/:filePath/:fileName", FilesController.getDoc);

module.exports = api;