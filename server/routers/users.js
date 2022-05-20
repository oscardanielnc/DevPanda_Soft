const express = require('express');
const UsersController = require("../controllers/users");

const api = express.Router();

api.get("/test", UsersController.test);

module.exports = api;