const express = require('express');
const ProcessController = require("../controllers/process");

const api = express.Router();

api.post("/process-create", ProcessController.createProcess)

module.exports = api;