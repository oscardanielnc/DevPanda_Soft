const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express()
const { API_VERSION } = require('./config');
const { pandaKey } = require("./middlewares/authenticate");

// Load routings
const usersRoutes =  require('./routers/users');
const specialtyRoutes =  require('./routers/specialty');
const agreementLearningPlanRoutes =  require('./routers/agreementLearningPlan');
const inscriptionFormRoutes = require('./routers/inscriptionForm');
const authRoutes =  require('./routers/auth');
const filesRoutes =  require('./routers/files');
const administrativesRoutes =  require('./routers/administratives');
const weekRoutes =  require('./routers/week');
const scheduleRoutes =  require('./routers/schedule');
const deliverablesRoutes = require('./routers/deliverable');
const enrollmentRoutes = require('./routers/enrollment');
const requestRoutes = require('./routers/request');
const emailRoutes = require('./routers/email');
const processRoutes = require('./routers/process');
const resignationRoutes = require('./routers/resignation');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
//app.use(pandaKey);

// Configure Header HTTP
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, 	X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

// Route basic
app.use(`/api/${API_VERSION}`, usersRoutes);
app.use(`/api/${API_VERSION}`, specialtyRoutes);
app.use(`/api/${API_VERSION}`, agreementLearningPlanRoutes);
app.use(`/api/${API_VERSION}`, inscriptionFormRoutes);
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, filesRoutes);
app.use(`/api/${API_VERSION}`, administrativesRoutes);
app.use(`/api/${API_VERSION}`, weekRoutes);
app.use(`/api/${API_VERSION}`, scheduleRoutes);
app.use(`/api/${API_VERSION}`, deliverablesRoutes);
app.use(`/api/${API_VERSION}`, enrollmentRoutes);
app.use(`/api/${API_VERSION}`, requestRoutes);
app.use(`/api/${API_VERSION}`, emailRoutes);
app.use(`/api/${API_VERSION}`, processRoutes);
app.use(`/api/${API_VERSION}`, resignationRoutes);

module.exports = app;
