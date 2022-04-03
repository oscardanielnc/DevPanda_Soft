const express = require('express');
const ExampleController = require("../controllers/example");

const api = express.Router();

api.get("/example", ExampleController.sayHello);

module.exports = api;