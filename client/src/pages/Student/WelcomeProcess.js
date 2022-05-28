import LayoutBasic from "../../layouts/LayoutBasic";
import { Button} from "react-bootstrap";
import ModalNoAgreement from "../../components/Modals/ModalNoAgreement";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import ModalNoAgreementMail from "../../components/Modals/ModalNoAgreementMail";

export default function WelcomeProcess () {
    const [show,setShow]=useState(false);
    const {user} = useAuth();
    const [showSm,setShowSm]=useState(false);
    console.log(user);
    const link =`/agreement/idStudent=${user.idPersona}&idProcess=${user.fidProceso}&phase=CONV`
    return(
        <LayoutBasic>
            <div className="container" style={{"padding":"1px"}}>
                <div className="row rows" style={{textAlign: "left"}}>
                    <h1>
                        Proceso de Convalidación de Prácticas Pre Profesionales
                    </h1>
                </div>
                <div className="row rows" style={{textAlign: "left"}}>
                    <p>
                    Bienvenido al proceso de convalidación de prácticas pre profesionales de la Pontificia Universidad Católica del Perú. Este es el primer paso para comenzar con la convalidación de tus prácticas y por consecuente la aprobación del curso de PSP de tu especialidad.
                    </p>
                    <p>
                        El proceso consta de varias fases las cuales se deberán ir completando secuencialmente para culiminar la convalidación. Cabe resaltar que las fases pueden tener algunos cambios dependiendo de las especialidad a la que pertenezcas.
                    </p> 
                    <p>
                        Todos los avances que se realizen de una fase a otra se te notificarán por correo electrónico.
                    </p> 
                    <p>
                        Si aún no has revisado las fases del proceso de convalidación de PSP, puedes acceder a información detallada en la página principal. Si ya las has revisado, continua con la lectura de la página.
                    </p> 
                </div>
                <div className="row rows" style={{textAlign: "left"}}>
                    <h2>
                        Inicio del proceso
                    </h2>
                </div>
                <div  className="row rows" style={{textAlign: "left"}}>
                    <p>
                        Por favor, indícanos si cuentas con Convenio y Plan de Aprendizaje. Si cuentas con los documentos, comenzarás con el proceso inmediatamente, pero si no cuentas con los documentos, entonces deberás  solicitar permiso para comenzar el proceso sin contar con estos.
                    </p> 
                </div>
                <div className="row rows boton">
                    <Button className="btn btn-primary" style={{width:"20%",marginRight:"50px"}} onClick={()=>setShow(true)}>No cuento con los documentos</Button>
                    <ModalNoAgreement show={show} setShow={setShow} user={user}showSm={showSm}setShowSm={setShowSm}></ModalNoAgreement>
                    <ModalNoAgreementMail show={showSm} setShow={setShowSm}></ModalNoAgreementMail>
                        <Button className="btn btn-primary" style={{width:"20%"}} href={link}>Sí cuento con los documentos</Button>
                </div>
            </div>
        </LayoutBasic>
    )
}