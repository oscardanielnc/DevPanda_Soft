import React from "react";
import DocumentPlusIcon from "../DocumentPlusIcon/DocumentPlusIcon";

export default function ShowFiles({docs}) {
    return (
        <div className="row rows">
            {
                docs.length>0 && docs.map((e, index) => (
                    <DocumentPlusIcon name={e.nombre} path={e.ruta} key={index}/>
                ))
            }
        </div>
    )
}