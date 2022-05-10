import React from "react";
import Upload from '../../components/Single/Upload';
import "../../components/Single/CompUpload.scss";
import "../../scss/_variables.scss";
import "../../scss/index.scss";
import LoadingButton from "../../components/Single/LoadingButton";

export default function CompUpload (props){

    const onFileChange = (files) => {
        console.log(files);
    }
    return(
        <div className="boxUpload">
            <h2 className="headUpload">
                {props.name}                
            </h2>
            <Upload
                onFileChange={(files) => onFileChange(files)}
            />           
        </div>
    );   

}