const express = require("express");
const bodyParser = require("body-parser");

const app = express()
const { API_VERSION } = require('./config');

// Load routings
const exampleRoutes =  require('./routers/example');
const usersRoutes =  require('./routers/users');
const specialtyRoutes =  require('./routers/specialty');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Configure Header HTTP
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, 	X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

// Route basic
app.use(`/api/${API_VERSION}`, exampleRoutes);
app.use(`/api/${API_VERSION}`, usersRoutes);
app.use(`/api/${API_VERSION}`, specialtyRoutes);

module.exports = app;