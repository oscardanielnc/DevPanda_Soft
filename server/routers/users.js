const express = require('express');
const UsersController = require("../controllers/users");

const api = express.Router();

api.get("/nabvarStudent/:idSpecialty", UsersController.nabvarStudent);

module.exports = api;