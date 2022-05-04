const express = require('express');
const AuthController = require("../controllers/auth");

const api = express.Router();

api.post("/sign-in", AuthController.singIn);

module.exports = api;