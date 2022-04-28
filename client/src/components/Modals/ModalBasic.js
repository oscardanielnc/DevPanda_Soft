import React from "react";
import {Modal, Button} from 'react-bootstrap';

import './ModalBasic.scss';


export default function ModalBasic (props) {
    const {show, setShow, children, primaryAction, secundaryAction} = props;
    return (
        <Modal
            show={show}
            onHide={()=>setShow(false)}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={()=>setShow(false)}>
                {secundaryAction}
            </Button>
            <Button variant="primary" disabled>
                {primaryAction}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}