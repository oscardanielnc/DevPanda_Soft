import React from "react";
import "./DocumentPlusIcon.scss"

export default function DocumentPlusIcon({name= "Nombre del documento",url}){
    return (
        <div className="documentIcon">
            <i className="bi bi-file-earmark-text documentIcon__doc" ></i>                    
            <span href={url} download={name} className="documentIcon__name">{name}</span>                     
        </div>
    );
}


