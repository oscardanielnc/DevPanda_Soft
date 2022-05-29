const express = require('express');
const UsersController = require("../controllers/users");

const api = express.Router();

api.post("/create-administrative", UsersController.createAdministrative);
api.get("/coordinators", UsersController.getCoordinators);
api.get("/supervisors/:idSpecialty", UsersController.getSupervisors);

module.exports = api;