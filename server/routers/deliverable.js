const express = require('express');
const DeliverableController = require("../controllers/deliverable");

const api = express.Router();

api.get("/deliverableStudent/:idEntregable/:idAlumno",DeliverableController.deliverableStudent);
api.get("/deliverablesProcess/:idProceso",DeliverableController.deliverablesProcess);
api.get("/fieldsDeliverables/:idEntregable/:idRespuestaEntregable", DeliverableController.fieldsDeliverables);
api.get("/getDeliverableByStudentSpecialty/:idFacultad", DeliverableController.getDeliverableByStudentSpecialty);
api.put("/deliverableStudent",DeliverableController.updateDeliverableStudent);
api.put("/fieldsDeliverables", DeliverableController.updatefieldsDeliverables);
module.exports = api;