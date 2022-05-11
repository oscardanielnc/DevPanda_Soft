const express = require('express');
const ScheduleController = require("../controllers/schedule");

const api = express.Router();

api.put("/schedule-changeOneHour", ScheduleController.changeOneHourSchedule);
api.get("/schedule-supervisor/:idAsesor", ScheduleController.getSupervisorSchedule);
api.get("/schedule-supervisors-specialty/:idSpecialty", ScheduleController.getSupervisorsBySpecialty);

module.exports = api;