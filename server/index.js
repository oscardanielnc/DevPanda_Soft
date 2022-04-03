const app = require("./app")
const PORT_SERVER = process.env.PORT || 3977
const { API_VERSION, IP_SERVER } = require("./config")


// aquí se establecerá la conexión con la base de datos
app.listen(PORT_SERVER, ()=> {
    console.log("###############################")
    console.log("###### DevPanda API REST ######")
    console.log("###############################")
    console.log(`http://${IP_SERVER}:${PORT_SERVER}/api/${API_VERSION}/`)
})