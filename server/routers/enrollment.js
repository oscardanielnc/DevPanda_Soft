const express = require('express');
const EnrollmentController = require("../controllers/enrollment");

const api = express.Router();

api.get("/enrollment-students/:fidProceso", EnrollmentController.selectStudentsByProcessSpecialty); 
api.put("/enrollment-students-ids", EnrollmentController.updateEnrollmentStudents); 

module.exports = api;