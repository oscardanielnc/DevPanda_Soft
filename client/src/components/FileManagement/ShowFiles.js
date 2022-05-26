import React from "react";
import DocumentPlusIcon from "../DocumentPlusIcon/DocumentPlusIcon";
import "./ShowFiles.scss"
export default function ShowFiles({docs}) {
    return (
        <div className="row normalrow" style={{marginTop:"5px",marginBottom:"10px"}}>
            {
                docs.length>0 && docs.map((e, index) => (
                    <DocumentPlusIcon name={e.nombre} path={e.ruta} key={index}/>
                ))                
            }
            {
                docs.length === 0 && <h4 className="noFiles">No hay archivos por mostrar</h4>
            }        
        </div>
    )
}