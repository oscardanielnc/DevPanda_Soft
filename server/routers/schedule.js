const express = require('express');
const ScheduleController = require("../controllers/schedule");

const api = express.Router();

api.put("/schedule-makeAnAppointment", ScheduleController.makeAnAppointment);
api.get("/schedule-getAssessorScheduleByWeek", ScheduleController.getAssessorScheduleByWeek);

module.exports = api;