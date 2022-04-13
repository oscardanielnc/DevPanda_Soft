import React from "react";
import ModalBasic from './ModalBasic';

//import './ModalExample.scss';

export default function ModalExample (props) {
    const {show, setShow, message} = props;
    return (
        <ModalBasic show={show}
            setShow={setShow}
            primaryAction="Primary"
            secundaryAction="Secundary"
        >
            <h3>Mensaje Modal: {message}</h3>
        </ModalBasic>
    )
}