const express = require('express');
const WeekController = require("../controllers/week");

const api = express.Router();

api.get("/week-getMonthlyWeeks", WeekController.getMonthlyWeeks);

module.exports = api;