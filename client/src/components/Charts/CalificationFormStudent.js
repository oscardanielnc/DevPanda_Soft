import React, {useState}  from "react";
import { Button, Table,Form,InputGroup,FormControl } from 'react-bootstrap';
import { registrationUpdateApiStudent} from "../../api/registrationForm";
import { ToastContainer, toast } from 'react-toastify';
import './CalificationFormStudent.scss';


export default function CalificationFormStudent ({data, setData, notgrabado}) {

    const {calification} = data;

    
    let pass=(data.approvalState==="Aprobado")?true:false;
    let disapproved=(data.approvalState==="Desaprobado")?true:false;
    let unrated=(data.approvalState==="Sin calificar")?true:false;
    let observed=(data.approvalState==="Observado")?true:false;

    const changeStatePassed = e => {
        pass=!pass;
        setData({
            ...data,
            approvalState: "Aprobado", 
        })
    }

    const changeStateUnrated = e => {
        unrated=!unrated;
        setData({
            ...data,
            approvalState: "Sin calificar",
        })
    }
    
    const changeStateObserved = e => {
        observed=!observed;
        setData({
            ...data,
            approvalState: "Observado",
        })
    }

    return (
        calification && <div className="container chartCalificationFormStudent">
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
                            disabled={notgrabado}
                            id={`inline-radio-1`}
                            checked={pass}
                            onChange={changeStatePassed}
                        />
                        <Form.Check
                            inline
                            label="Observado"
                            name="Observado"
                            type="radio"
                            id={`inline-radio-3`}
                            disabled={notgrabado}
                            checked={observed}
                            onChange={changeStateObserved}
                        />
                        <Form.Check
                            inline
                            label="Sin calificar"
                            name="SinCalificar"
                            type="radio"
                            id={`inline-radio-3`}
                            disabled={notgrabado}
                            checked={unrated}
                            onChange={changeStateUnrated}
                        />
                        </div>
                    </Form>
                </div>
            </div>
            
            
        </div>
    )
}