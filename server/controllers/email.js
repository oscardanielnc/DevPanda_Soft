
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(req, res) {

    try{

        const maillist = req.body.maillist;
        const msg= req.body.msg;

        //  Ejemplo de msg
        // {
        //     subject: "Hello", // Subject line
        //     text: "Hello world?", // plain text body
        //     html: "<b>Hello world?</b>", // html body
        // }

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
            user: "psp.faci.pucp@gmail.com", // User
            pass: "yzjykefxuvyzjvqb", // Password
            },
        });
        
        maillist.forEach(function (to, i , array) {

            msg.to = to;
            msg.from = '"PSP-FACI" <psp.faci.pucp@gmail.com>', // sender address
            
            transporter.sendMail(msg, function (err) {
            })
        })

        res.status(200).send({
            success: true,
            message: "Solicitud de enviado realizado correctamente"
        })  

    }catch(e){
        res.status(500).send({ 
            success: false,
            message: "Error en el servidor " + e.message
        })
        return 
    }  
  
}
module.exports = {
    sendEmail
}