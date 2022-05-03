const express = require('express');
const SpecialtyController = require("../controllers/specialty");

const api = express.Router();

api.post("/specialty", SpecialtyController.insert);
api.get("/specialty-all", SpecialtyController.selectAll);

module.exports = api;