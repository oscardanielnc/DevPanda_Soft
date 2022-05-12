const API_VERSION = "v1";
const IP_SERVER = "52.54.42.131";
const PORT_SERVER = process.env.PORT || 8080;
// const PORT_SERVER = process.env.PORT || 3977;
const PANDA_KEY = "pandita69";

const MYSQL_CREDENTIALS = {
    host     : 'devpandadb.c5sbfmi8wxnv.us-east-1.rds.amazonaws.com',
    port     : 3306,
    user     : 'admin',
    password : 'DevPanda123%',
    database : 'DevPandaDB'
  };


module.exports = {
    API_VERSION,
    IP_SERVER,
    PORT_SERVER,
    MYSQL_CREDENTIALS,
    PANDA_KEY
};



  