const express = require('express');
const RequestController = require("../controllers/request");

const api = express.Router();

api.get("/requestList/:idEspecialidad",RequestController.requestList);

api.get("/verifyRequest/:fidAlumno",RequestController.verifyRequest);

api.get("/getRequest/:idSolicitud",RequestController.getRequest);

api.post("/request", RequestController.insertRequest);

api.put("/updateRequest", RequestController.updateRequest);

module.exports = api;