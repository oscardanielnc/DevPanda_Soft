const API_VERSION = "v1";
const IP_SERVER = "localhost";
const PORT_SERVER = process.env.PORT || 3977;
//const PORT_DB = 27017

const MYSQL_CREDENTIALS = {
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    password : 'admin',
    database : 'devpanda'
};


module.exports = {
    API_VERSION,
    IP_SERVER,
    PORT_SERVER,
    MYSQL_CREDENTIALS
};


// const MYSQL_CREDENTIALS = {
//     host     : 'devpandadb.c5sbfmi8wxnv.us-east-1.rds.amazonaws.com', // TODO: change with DB tokens
//     port     : 3306, //
//     user     : 'admin',
//     password : 'DevPanda123%',
//     database : 'DevPandaDB' //
//   };
  