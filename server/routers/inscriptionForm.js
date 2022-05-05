const express = require('express');
const { API_VERSION } = require('../config');
const inscriptionFormController = require("../controllers/inscriptionForm");

const api = express.Router();

api.get("/inscriptionForm-selectSubmittedInscriptionForm/:fidAlumnoProceso",inscriptionFormController.selectSubmittedInscriptionForm);
api.get("/inscriptionForm-selectFieldsInscriptionFormSpecialty/:fidEspecialidad",inscriptionFormController.selectFieldsInscriptionFormSpecialty);
api.get("/inscriptionForm-selectDocumentsSubmittedInscriptionForm/:fidEntregaInscripcion",inscriptionFormController.selectDocumentsSubmittedInscriptionForm);
api.get("/inscriptionForm-selectFieldsFilledInscriptionFormStudent/:fidAlumnoProceso",inscriptionFormController.selectFieldsFilledInscriptionFormStudent);

api.post("/inscriptionForm-insertSubmittedInscriptionForm",inscriptionFormController.insertSubmittedInscriptionForm);
api.post("/inscriptionForm-insertDocumentSubmittedInscriptionForm",inscriptionFormController.insertDocumentSubmittedInscriptionForm);
api.post("/inscriptionForm-insertFieldFilledInscriptionForm",inscriptionFormController.insertFieldFilledInscriptionForm);

api.put("/inscriptionForm-updateSubmittedInscriptionForm",inscriptionFormController.updateSubmittedInscriptionForm);
api.put("/inscriptionForm-updateFieldFilledInscriptionForm",inscriptionFormController.updateFieldFilledInscriptionForm);
api.put("/inscriptionForm-updateDocumentSubmittedInscriptionForm",inscriptionFormController.updateDocumentSubmittedInscriptionForm);
module.exports = api;