const express = require('express');
const EnrollmentController = require("../controllers/enrollment");

const api = express.Router();

api.get("/enrollment-students/:fidProceso", EnrollmentController.selectStudentsByProcessSpecialty); 

module.exports = api;