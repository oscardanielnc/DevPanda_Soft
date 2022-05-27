import React from "react";
import { ButtonGroup, Form, Modal, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import ModalBasic from './ModalBasic';

import './ModalStudentMeeting.scss';

export default function ModalStudentMeeting (props) {
    const {show, setShow, hourModalSelected} = props;
    
    return ( 
        <Modal show={show}
            setShow={setShow}
            onHide={()=>setShow(false)}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton className="modalBasic__header">
                <Modal.Title>Datos del alumno</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="modalStudentManagement">
                    <InputLabel name="ID" value={hourModalSelected} />
                    <InputLabel name="Nombres" />
                    <InputLabel name="Apellidos"/>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

function InputLabel({name, value}) {
    return (
        <Form.Group className="modalStudentManagement__formGroup">
            <Form.Label className="modalStudentManagement__formGroup-label">
                {name}: 
            </Form.Label>
            <Form.Control className="modalStudentManagement__formGroup-input" type="text" value={value} readOnly/>
        </Form.Group> 
    )
}