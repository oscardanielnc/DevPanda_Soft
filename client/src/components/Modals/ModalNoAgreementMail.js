import React from "react";
import {Modal, Button} from 'react-bootstrap';
import './ModalNoAgreementMail.scss';
export default function ModalNoAgreementMail (props) {
    const {show, setShow} = props;
    return (
        <Modal

            show={show}
            onHide={()=>setShow(false)}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton className="modalBasic__header">
                <Modal.Title>Envío de solicitud confirmado</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <div className="row">
                <div className="col-sm-4 subtitles">
                    <i className = "bi bi-envelope-fill correo"></i>
                </div>
                <div className="col-sm-8 subtitles">
                    <p style={{textAlign: "left",marginTop:"5px"}}>
                        Su solicitud ha sido enviada con éxito. En máximo 3 días se le notificará por correo si es que cuenta con permiso para comenzar el proceso de convalidación de PSP
                    </p>
                </div>

                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={()=>setShow(false)} >
               Volver al inicio
            </Button>
            </Modal.Footer>
        </Modal>
    )
}