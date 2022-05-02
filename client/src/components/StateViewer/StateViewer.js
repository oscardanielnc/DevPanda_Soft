import React, {useState} from "react";
import { Button, Table,Form,InputGroup,FormControl } from 'react-bootstrap';

import './StateViewer.scss';


export default function StateViewer ({states}) {
    return (
        <div className="container gx-0 statesContainer">
            <div className="row center gx-0">
            {
            states.map((states, index) => (
                <div className="col-6 col-lg-4 box">
                    <h5 className="title">{states.title}</h5>
                    <img className="image" src={states.image}></img>
                    <p className="description">{states.description}</p>
                </div>
            ))
            }
            </div>
        </div>
    )
}