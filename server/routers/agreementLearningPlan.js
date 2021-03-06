const express = require('express');
const AgreementLearningPlanController = require("../controllers/agreementLearningPlan");

const api = express.Router();

api.post("/agreementLearningPlan-insertInfoByStudent", AgreementLearningPlanController.insertInfoByStudent);
api.post("/agreementLearningPlan-insertDocumentByAgreement", AgreementLearningPlanController.insertDocumentByAgreement);

api.get("/agreementLearningPlan-selectInfoByStudent", AgreementLearningPlanController.selectInfoByStudent);
api.get("/agreementLearningPlan-selectDocumentsByAgreement", AgreementLearningPlanController.selectDocumentsByAgreement);
api.get("/agreementLearningPlan-select", AgreementLearningPlanController.select);
api.get("/agreementLearningPlan-selectDocumentsInfoByProcess/:fidAlumno", AgreementLearningPlanController.selectDocumentsInfoByProcess);
api.get("/agreementLearningPlan-selectDocumentsInfoByProcessOnlyStudent/:fidAlumno", AgreementLearningPlanController.selectDocumentsInfoByProcessOnlyStudent);
api.get("/agreementLearningPlan-selectAgreementByStudent/:fidEspecialidad", AgreementLearningPlanController.selectAgreementByStudent);
api.get("/requestListAgreement/:idProceso",AgreementLearningPlanController.requestListAgreement);

api.put("/agreementLearningPlan-updateInfoByStudent", AgreementLearningPlanController.updateInfoByStudent);
api.put("/agreementLearningPlan-updateDocumentByAgreement", AgreementLearningPlanController.updateDocumentByAgreement);


module.exports = api;