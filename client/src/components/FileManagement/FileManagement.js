import React from "react";
import Upload from './Upload';
import "./FileManagement.scss";
import "../../scss/_variables.scss";
import "../../scss/index.scss";
import ShowFiles from "./ShowFiles";
import { uploadDocsApi } from "../../api/files";
import {ToastContainer, toast} from "react-toastify";

export default function FileManagement ({canUpload=true, docs, maxFiles=2, fileList=[], setFileList, titleUpload="Subir archivos",titleUploadedFiles="Archivos subidos"}){

    // const onFileChange = async (files) => {
    //     // const response = await uploadDocsApi(files, "1-1-CONV-1", 1);
    //     // if(response.success) {
    //     //     toast.success(response.msg, {
    //     //         position: "top-right",
    //     //         autoClose: 3000,
    //     //         hideProgressBar: false,
    //     //         closeOnClick: true,
    //     //         pauseOnHover: true,
    //     //         draggable: true,
    //     //         progress: undefined,
    //     //     });
    // //         window.location.reload()
    //     // } else {
    //     //     toast.error(response.msg, {
    //     //         position: "top-right",
    //     //         autoClose: 3000,
    //     //         hideProgressBar: false,
    //     //         closeOnClick: true,
    //     //         pauseOnHover: true,
    //     //         draggable: true,
    //     //         progress: undefined,
    //     //     });
    //     // }
    //     toast.error("NO NO NO, equivocadiño. No debes tocar este botón!", {
    //         position: "top-right",
    //         autoClose: 3000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //     });
    // }
    return(
        <div className="boxUpload">
            <ToastContainer />
            {
                (docs && docs.length>0) && ( 
                    <>
                    <h2>
                        {
                            titleUploadedFiles
                        }
                    </h2>
                    <ShowFiles docs={docs}/>
                    </>
                )
            }
            <h2 className="headUpload">
                {canUpload && titleUpload}                
            </h2>
            {
                canUpload && <Upload maxFiles={maxFiles}
                    // onFileChange={(files) => onFileChange(files)}
                    fileList = {fileList}
                    setFileList={setFileList}
                    /> 
            }
                      
        </div>
    );   

}