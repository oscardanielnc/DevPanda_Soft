import React from "react";
import DocumentPlusIcon from "../DocumentPlusIcon/DocumentPlusIcon";
import "./ShowFiles.scss"
export default function ShowFiles({docs}) {
    return (
        <div className="row normalrow" style={{marginTop:"5px",marginBottom:"10px"}}>
            {
                docs.length>0 && docs.map((e, index) => (
                    <DocumentPlusIcon doc={e} key={index}/>
                ))                
            }
            {
                docs.length === 0 && <h4 className="noFiles">No hay archivos por mostrar</h4>
            }        
        </div>
    )
}