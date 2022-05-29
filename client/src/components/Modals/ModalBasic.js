import React from "react";
import {Modal, Button} from 'react-bootstrap';

import './ModalBasic.scss';


export default function ModalBasic (props) {
    const {show, setShow, children, title, primaryAction, secundaryAction, handlePrimaryAction} = props;
    return (
        <Modal className="modalBasic"
            show={show}
            onHide={()=>setShow(false)}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton className="modalBasic__header">
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            {
            secundaryAction && primaryAction && <Modal.Footer>
                {
                secundaryAction && 
                <Button variant="secondary" onClick={()=>setShow(false)}>
                    {secundaryAction}
                </Button>
                }
                {
                primaryAction && 
                <Button variant="primary" onClick={handlePrimaryAction}>
                    {primaryAction}
                </Button>
                }
            </Modal.Footer>
            }
        </Modal>
    )
}



const dataNavbar = [
    {
        title: "Convenio y Plan de Aprendizaje",
        code: "CONV",
        completed: true,
    },
    {
        title: "Matrícula",
        code: "MATR",
        completed: true,
    } ,
    {
        title: "Ficha de inscripción",
        code: "FINS",
        completed: true,
    },
    {
        title: "Elección del supervisor",
        code: "ESUP",
        completed: false,
    },
    {
        title: "Entregables",
        code: "ENTS",
        completed: false,
    }
]