const express = require('express');
const RequestController = require("../controllers/request");

const api = express.Router();

api.get("/requestList/:idEspecialidad",RequestController.requestList);

api.get("/verifyRequest/:fidAlumno",RequestController.verifyRequest);

api.post("/request", RequestController.insertRequest)

module.exports = api;