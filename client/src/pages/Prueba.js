import React, {useState} from "react";
import LayoutBasic from "../layouts/LayoutBasic";
import DocumentoIcono from "../components/DocumentoIcono";
import "./Prueba.scss";

console.log("fuera", this)

export default function Prueba () {
    const [doc, setDoc] = useState({
        name: "Rubrica de convenio",
        file: null
    })

    return (
        <LayoutBasic>
            <div className="docIcon">                                
                <DocumentoIcono name={doc.name}/>
            </div>            
        </LayoutBasic>
    )
}