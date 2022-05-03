import React from "react";
import Upload from '../../components/Single/Upload';
import "../../components/Single/CompUpload.scss"

export default function CompUpload (props){

    return(
        <div >
            <h2 >
                Archivos Subidos
            </h2>
            <Upload/>
        </div>
    );
}