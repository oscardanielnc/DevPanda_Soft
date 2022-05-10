import React from "react";
import "./DocumentPlusIcon.scss"
import {API_VERSION, BASE_PATH, PANDA_KEY} from '../../api/config';

export default function DocumentPlusIcon({name= "Sin nombre.xxx", path}){
    return (
        <div className="documentIcon">
            <i className="bi bi-file-earmark-text documentIcon__doc" target="_blank"></i>                    
            <a href={`${BASE_PATH}/${API_VERSION}/doc/${path}/${name}`}>
                <span className="documentIcon__name">{name}</span>
            </a>           
        </div>
    );
}


