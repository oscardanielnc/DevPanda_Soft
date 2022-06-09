const express = require('express');
const ResignationController = require("../controllers/resignation");

const api = express.Router();

api.get("/getListStudentsResignation/:idProceso", ResignationController.getListStudentsResignation);

module.exports = api;