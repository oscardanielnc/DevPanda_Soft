import React from "react";
import LogoTelefono from "../asserts/img/png/telefono.PNG";
import LogoSobre from "../asserts/img/png/sobreEmail.PNG";
import LogoDerechos from "../asserts/img/png/derechosReservados.PNG";
import LogoMapa from "../asserts/img/png/googleMaps.png";
import LogoInstagram from "../asserts/img/png/logoInstagram.PNG";
import LogoTikTok from "../asserts/img/png/logoTikTok.PNG";
import LogoFacebook from "../asserts/img/png/logoFacebook.PNG";
import LogoLinkedin from "../asserts/img/png/logoLinkedin.PNG";
import LogoTwitter from "../asserts/img/png/logoTwitter.PNG";
import './Footer.scss';

export default function Footer (props) {
    return (
        <div className="footer">
            <div className="footer__left">
                <div className="footer__leftcontactanos">
                    <div >
                        Contactanos:<br/>
                    </div>
                </div>
                <div className="footer__leftcontactanosInfo">
                    <div>
                        <img src={LogoTelefono} alt="Telefono"
                        style={{marginLeft: "8px",marginRight:"5px"}}
                        width="20" 
                        height="20" />
                        959300449 de L-V de 9:00 am a 1:00 pm<br/>
                    </div>
                    <div>
                        <img src={LogoSobre} alt="SobreEmail"
                        style={{marginLeft: "8px",marginRight:"5px"}}
                        width="20" 
                        height="20" />
                        informes-fci@pucp.edu.pe<br/>
                    </div>
                </div>
                <div className="footer__leftderechos">
                    Pontificia Universidad Católica del Perú - Todos los derechos reservados
                </div>

            </div>
            <div className="footer__right" >
                <div className="footer__rightubicanos">
                    <div>
                        Ubicación:<br/>
                    </div>
                </div>
                <div className="footer__rightubicanosInfo">
                    <div>
                        Av. Universitaria 1801 San Miguel, 15088, Lima - Perú<br/>
                    </div>
                    <img src={LogoMapa} alt="GoogleMapa"
                        style={{marginLeft: "0px",marginRight:"5px"}}
                        width="15" 
                        height="18" />
                    <a href="https://www.google.com/maps/place/Pontificia+Universidad+Cat%C3%B3lica+del+Per%C3%BA/@-12.069512,-77.0793592,15z/data=!4m2!3m1!1s0x0:0xd7a0bfb797e5862e?sa=X&ved=2ahUKEwibiLP_qLX3AhUoGLkGHc7mDKYQ_BJ6BAhkEAU" 
                    className="icon-linkedin" style={{marginTop:"20px"}}>Ver ubicación en Google Maps</a>
                    <div>
                        <br/>
                    </div>
                   
                </div>
                <div className="footer__rightredesSociales">
                    <a  href="https://www.instagram.com/pucp/"><img src={LogoInstagram} alt="LogoInstagram" width="25" 
                        height="25"/></a>
                    <a  href="https://www.tiktok.com/@pucp?lang=es"><img src={LogoTikTok} alt="LogoTikTok" width="25" 
                        height="25"/></a>
                    <a  href="https://www.linkedin.com/school/pucp/"><img src={LogoLinkedin} alt="LogoLinkedin" width="25" 
                        height="25"/></a>
                    <a  href="https://twitter.com/pucp?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"><img src={LogoTwitter} alt="LogoTwitter" width="25" 
                        height="25"/></a>
                    <a  href="https://www.facebook.com/pucp"><img src={LogoFacebook} alt="LogoFacebook" width="25" 
                        height="25"/></a>
                </div>
            </div>
            
        </div>
    )
}