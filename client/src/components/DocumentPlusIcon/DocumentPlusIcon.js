import React from "react";
import "./DocumentPlusIcon.scss"
import moment from "moment";
import {API_VERSION, BASE_PATH, PANDA_KEY} from '../../api/config';

export default function DocumentPlusIcon({doc}){
    const mxx = moment
    debugger
    return (
        <div className="documentIcon">
            <i className="bi bi-file-earmark-text documentIcon__doc" target="_blank"></i>                    
            <a href={`${BASE_PATH}/${API_VERSION}/doc/${doc.ruta}/${doc.nombre}`}>
                <span className="documentIcon__name">{doc.nombre}</span>
            </a>
            <span className="documentIcon__hour">
                {doc.horaSubida? moment(doc.horaSubida).format("LLL"): ""}
            </span>      
        </div>
    );
}


