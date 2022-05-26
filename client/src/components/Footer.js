import React from "react";
import LogoInstagram from "../assets/svg/Boton IG.svg";
import LogoTikTok from "../assets/svg/Boton Tiktok.svg";
import LogoFacebook from "../assets/svg/Boton Facebook.svg";
import LogoLinkedin from "../assets/svg/Logo LinkedIn.svg";
import LogoTwitter from "../assets/svg/Boton Twitter.svg";
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
                        <i className="bi bi-telephone-fill telfIcon"></i>
                        959300449 de L-V de 9:00 am a 1:00 pm<br/>
                    </div>
                    <div>
                        <i className = "bi bi-envelope-fill mailIcon"></i>
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
                    <i className="bi bi-geo-alt-fill mapIcon"></i>
                    <a href="https://www.google.com/maps/place/Pontificia+Universidad+Cat%C3%B3lica+del+Per%C3%BA/@-12.069512,-77.0793592,15z/data=!4m2!3m1!1s0x0:0xd7a0bfb797e5862e?sa=X&ved=2ahUKEwibiLP_qLX3AhUoGLkGHc7mDKYQ_BJ6BAhkEAU" 
                     style={{marginTop:"25px" , lineHeight:"1em"}}>Ver ubicación en Google Maps</a>
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