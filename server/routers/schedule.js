const express = require('express');
const ScheduleController = require("../controllers/schedule");

const api = express.Router();

api.put("/schedule-changeHours", ScheduleController.changeHoursSchedule);
api.put("/schedule-update-meeting-link", ScheduleController.updateMeetingLink);
api.get("/schedule-supervisor/:idAsesor", ScheduleController.getSupervisorSchedule);
api.get("/schedule-supervisors-specialty/:idSpecialty", ScheduleController.getSupervisorsBySpecialty);
api.get("/schedule-studentDate/:idStudent", ScheduleController.getStudentDate);

module.exports = api;