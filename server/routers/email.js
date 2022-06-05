const express = require('express');
const EmailController = require("../controllers/email");

const api = express.Router();

api.post("/email", EmailController.sendEmail);

module.exports = api;