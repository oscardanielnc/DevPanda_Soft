const express = require('express');
const AgreementLearningPlanController = require("../controllers/agreementLearningPlan");

const api = express.Router();

api.post("/agreementLearningPlan-insertInfoByStudent", AgreementLearningPlanController.insertInfoByStudent);
api.post("/agreementLearningPlan-insertDocumentByAgreement", AgreementLearningPlanController.insertDocumentByAgreement);

api.get("/agreementLearningPlan-selectInfoByStudent", AgreementLearningPlanController.selectInfoByStudent);
api.get("/agreementLearningPlan-selectDocumentsByAgreement", AgreementLearningPlanController.selectDocumentsByAgreement);
api.get("/agreementLearningPlan-select", AgreementLearningPlanController.select);
api.get("/agreementLearningPlan-selectDocumentsInfoByProcess", AgreementLearningPlanController.selectDocumentsInfoByProcess);

api.put("/agreementLearningPlan-updateInfoByStudent", AgreementLearningPlanController.updateInfoByStudent);
api.put("/agreementLearningPlan-updateDocumentByAgreement", AgreementLearningPlanController.updateDocumentByAgreement);


module.exports = api;