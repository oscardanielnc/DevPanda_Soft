const express = require('express');
const AdministrativesController = require("../controllers/administratives");

const api = express.Router();

api.get("/administratives-searchAssessorsBySpecialty", AdministrativesController.searchAssessorsBySpecialty);

module.exports = api;
