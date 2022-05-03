const PANDA_KEY = "pandita69";

exports.pandaKey = (req, res, next) => {
    // para asegurarnos que todas las peticiones a nuestra API solo provengan de la applicacion o Postman de un miembro del grupo con el PandaKey 
    if(!req.headers.authorization) {
        return res.status(403).send({ 
            message: "La peticion no tiene cabecara de autenticación"
        })
    }else if(req.headers.authorization != PANDA_KEY)  {
        return res.status(404).send({
            message: "Panda key inválido"
        })
    }
    
    next()
}