import React from "react";
import { Toast } from 'react-bootstrap';

import './ToastPanda.scss';


export default function ToastPanda ({title, message, showToast, setShowToast}) {
    return (
        <Toast onClose={() => setShowToast(false)} 
            show={showToast} 
            delay={5000} 
            autohide
            className="toastPanda"
        >
            <Toast.Header>
            {/* <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt="Panda Toast"
            /> */}
            <strong className="me-auto">{title}</strong>
            <small>1 seg ago</small>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
        </Toast>
    );    
}