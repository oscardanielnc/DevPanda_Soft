import React from "react";

import DocumentIcon from "../asserts/img/png/documento.png";
import "./DocumentoIcono.scss"

export default function DocumentoIcono({name= "Nombre del docuemnto"}){
    return (
        <div className="documentIcon">
            {/*su posición es relativa al div*/}
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-file-earmark-text" viewBox="0 0 16 16" >
            <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
            <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
            </svg>
            {/*<img src={DocumentIcon} alt="Documento" 
            style={{marginLeft:"5px",marginRight:"5px",marginBottom:"4px"}} 
            width="20"             
            height="20" /> */}                      
            <a href="URL DEL DOCUMENTO" >{name}</a>                     
        </div>
    );
}

