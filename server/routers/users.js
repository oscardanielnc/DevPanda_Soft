const express = require('express');
const UsersController = require("../controllers/users");

const api = express.Router();

api.post("/create-administrative", UsersController.createAdministrative);

module.exports = api;