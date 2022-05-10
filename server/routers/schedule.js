const express = require('express');
const ScheduleController = require("../controllers/schedule");

const api = express.Router();

api.put("/makeAnAppointment", ScheduleController.makeAnAppointment);

module.exports = api;