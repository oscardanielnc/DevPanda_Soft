const express = require('express');
const { API_VERSION } = require('../config');
const inscriptionFormController = require("../controllers/inscriptionForm");

const api = express.Router();

// api.get("/inscriptionForm-SubmittedInscriptionForm/:fidAlumnoProceso",inscriptionFormController.selectSubmittedInscriptionForm);
// api.get("/inscriptionForm-FieldsInscriptionFormSpecialty/:fidEspecialidad",inscriptionFormController.selectFieldsInscriptionFormSpecialty);
// api.get("/inscriptionForm-DocumentsSubmittedInscriptionForm/:fidEntregaInscripcion",inscriptionFormController.selectDocumentsSubmittedInscriptionForm);
// api.get("/inscriptionForm-FieldsFilledInscriptionFormStudent/:fidAlumnoProceso",inscriptionFormController.selectFieldsFilledInscriptionFormStudent);
// api.post("/inscriptionForm-SubmittedInscriptionForm",inscriptionFormController.insertSubmittedInscriptionForm);
// api.post("/inscriptionForm-DocumentSubmittedInscriptionForm",inscriptionFormController.insertDocumentSubmittedInscriptionForm);
// api.post("/inscriptionForm-FieldFilledInscriptionForm",inscriptionFormController.insertFieldFilledInscriptionForm);
// api.put("/inscriptionForm-DocumentSubmittedInscriptionForm",inscriptionFormController.updateDocumentSubmittedInscriptionForm);



api.get("/studentInscriptionForm/:idAlumno",inscriptionFormController.getstudentInscriptionForm);

api.get("/studentListInscriptionForm/:idEspecialidad",inscriptionFormController.getListStudentsInscriptionForm);

api.get("/countryList",inscriptionFormController.getListOfCountry);
api.get("/lineBusinessList",inscriptionFormController.getListOfLineBusiness);

api.put("/studentDataInscriptionForm",inscriptionFormController.updateInscriptionForm);
api.put("/studentFieldsInscriptionForm",inscriptionFormController.updateFieldsInscriptionForm);



module.exports = api;