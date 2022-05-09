import React from "react";
import DocumentPlusIcon from "../DocumentPlusIcon/DocumentPlusIcon";

export default function UploadFiles({docs}) {
    return (
        <div className="row rows">
            <h3>Archivos subidos</h3>
            {
                docs.length>0 && docs.map((e, index) => (
                    <DocumentPlusIcon name={e.nombre} path={e.ruta} key={index}/>
                ))
            }
        </div>
    )
}