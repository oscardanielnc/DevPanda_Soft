const app = require("./app")

const { API_VERSION, IP_SERVER, PORT_SERVER } = require("./config")

app.listen(PORT_SERVER, ()=> {
    console.log("###############################")
    console.log("###### DevPanda API REST ######")
    console.log("###############################")
    console.log(`http://${IP_SERVER}:${PORT_SERVER}/api/${API_VERSION}/`)
})