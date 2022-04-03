function sayHello(req, res) {
    const errorServerSimulation = false;
    const bandido = "Daniel";

    if(errorServerSimulation) {
        res.status(505).send({
            message: "Ha ocurrido un error en el servidor"
        })
    } else {
        res.status(200).send({
            message: `Hola ${bandido}! :D`
        })
    }
}
module.exports = {
    sayHello
}