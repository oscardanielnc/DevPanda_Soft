const express = require("express");
const bodyParser = require("body-parser");

const app = express()
const { API_VERSION } = require('./config');
const { pandaKey } = require("./middlewares/authenticate");

// Load routings
const usersRoutes =  require('./routers/users');
const specialtyRoutes =  require('./routers/specialty');
const authRoutes =  require('./routers/auth');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
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
app.use(`/api/${API_VERSION}`, authRoutes);

module.exports = app;
