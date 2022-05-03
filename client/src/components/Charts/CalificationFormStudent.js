import React, {useState}  from "react";
import { Button, Table,Form,InputGroup,FormControl } from 'react-bootstrap';

import './CalificationFormStudent.scss';


export default function CalificationFormStudent (props) {
    const {calification,setCalification} = props;
    let pass=(calification.state==="A")?true:false;
    let disapproved=(calification.state==="D")?true:false;
    let unrated=(calification.state==="U")?true:false;
    const changeStatePassed = e => {
        pass=!pass;
        setCalification({
            ...calification,
            state:"A"
        })
    }

    const changeStateDisapproved = e => {
        disapproved=!disapproved;
        setCalification({
            ...calification,
            state:"D"
        })
    }

    const changeStateUnrated = e => {
        unrated=!unrated;
        setCalification({
            ...calification,
            state:"U"
        })
    }

    const changeComments = e => {
        setCalification({
            ...calification,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="container chartCalificationFormStudent">
            <nav className="navbar navbar-fixed-top navbar-inverse bg-inverse "style={{ backgroundColor: "#E7E7E7"}}>
                <h3 style={{"marginLeft":"15px"}}>Retroalimentación</h3>
             </nav>
            <div className="row rows">
                <h3>Calificación:</h3>
            </div>
            <div className="row rows" >
                <div className="col-sm-2 subtitles">
                    <div className="texts">Estado:</div>
                </div>
                <div className="col-sm-10 subtitles">
                    <Form>
                        <div key={`inline-radio`} className="mb-3">
                        <Form.Check
                            inline
                            label="Aprobado"
                            name="Aprobado"
                            type="radio"
                            id={`inline-radio-1`}
                            checked={pass}
                            onChange={changeStatePassed}
                        />
                        <Form.Check
                            inline
                            label="Desaprobado"
                            name="Desaprobado"
                            type="radio"
                            id={`inline-radio-2`}
                            checked={disapproved}
                            onChange={changeStateDisapproved}
                        />
                        <Form.Check
                            inline
                            label="Sin calificar"
                            name="SinCalificar"
                            type="radio"
                            id={`inline-radio-3`}
                            checked={unrated}
                            onChange={changeStateUnrated}
                        />
                        </div>
                    </Form>
                </div>
            </div>
            <div className="row rows">
                <h3>Observaciones:</h3>
            </div>
            <div className="row rows" >
                <Form.Control className="observaciones"
                        placeholder="Esciba las observaciones de la entrega" 
                        onChange={changeComments}
                        value={calification.comments}
                        name="comments"
                        style={{"marginBottom":"10px !important"}}
                        as="textarea"
                        rows={6}/>
            </div>
            <div className="row rows" >
                <div className="col-sm-2 subtitles">
                </div>
                <div className="col-sm-4 botons">
                    <Button variant="primary" style={{"marginBottom":"4px"}}>Regresar</Button>
                </div>
                <div className="col-sm-4 botons">
                    <Button variant="primary" style={{"marginBottom":"4px"}}>Guardar</Button>
                </div>
                <div className="col-sm-2 subtitles">
                </div>
            </div>    
        </div>
    )
}