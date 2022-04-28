const express = require('express');
const UsersController = require("../controllers/users");

const api = express.Router();

api.get("/users", UsersController.logIn);

module.exports = api;