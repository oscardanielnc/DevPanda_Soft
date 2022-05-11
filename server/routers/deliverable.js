const express = require('express');
const DeliverableController = require("../controllers/deliverable");

const api = express.Router();

api.get("/deliverableStudent/:idEntregable/:idAlumno",DeliverableController.deliverableStudent);
api.get("/deliverablesProcess/:idProceso",DeliverableController.deliverablesProcess);

api.put("/deliverableStudent",DeliverableController.updateDeliverableStudent);

module.exports = api;