const express = require('express');
const DeliverableController = require("../controllers/deliverable");

const api = express.Router();

api.get("/deliverableStudent/:idEntregable/:idAlumno",DeliverableController.deliverableStudent);
module.exports = api;