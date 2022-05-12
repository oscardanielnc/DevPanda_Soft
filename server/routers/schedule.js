const express = require('express');
const ScheduleController = require("../controllers/schedule");

const api = express.Router();

api.put("/schedule-changeHours", ScheduleController.changeHoursSchedule);
api.get("/schedule-supervisor/:idAsesor", ScheduleController.getSupervisorSchedule);
api.get("/schedule-supervisors-specialty/:idSpecialty", ScheduleController.getSupervisorsBySpecialty);

module.exports = api;