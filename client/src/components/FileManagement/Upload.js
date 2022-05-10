import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import './Upload.scss'; 

import fileDefault from '../../asserts/img/svg/file-earmark-arrow-up.svg';
import fileDoc from '../../asserts/img/svg/file-earmark-word.svg';
import filePdf from '../../asserts/img/svg/filetype-pdf.svg';
import fileDocx from '../../asserts/img/svg/filetype-docx.svg';
import { Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

const listImgConfig = {
    default: fileDefault,
    pdf: filePdf,
    docx: fileDocx,
    doc: fileDoc
}


export default function Upload ({maxFiles, onFileChange}) {

    const wrapperRef = useRef(null);

    const [fileList, setFileList] = useState([]);

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        if (newFile) {
            const updatedList = [...fileList, newFile];
            setFileList(updatedList);
        }
    }

    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
    }
    const sendFiles = () => {
        if(fileList.length === maxFiles)
            onFileChange(fileList)
        else {
            toast.warning(`Se requieren ${maxFiles} archivos para esta entrega.`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    return (
        <>
            <ToastContainer />
            <div
                ref={wrapperRef}
                className="drop-file-input"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className="drop-file-input__label">
                    <i className="bi bi-upload" style={{"fontSize":"35px"}}></i>
                    <p>Arrastra o suelta tus archivos aquí. Máximo {maxFiles} archivos.</p>
                </div>
                <input type="file" value="" onChange={onFileDrop}/>
            </div>
            {
                fileList.length > 0 ? (
                    <div className="drop-file-preview">
                        <p className="drop-file-preview__title">
                            Listo para subir
                        </p>
                        {
                            fileList.map((item, index) => (
                                <div key={index} className="drop-file-preview__item">
                                    <img src={listImgConfig[item.name.split('.')[1]] || listImgConfig['default']} alt="" />
                                    <div className="drop-file-preview__item__info">
                                        <p>{item.name}</p>
                                        <p>{item.size} Bytes</p>
                                    </div>
                                    <span className="drop-file-preview__item__del" onClick={() => fileRemove(item)}>
                                        <i className="bi bi-x drop-file-preview__item__del-icon"></i>
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                ) : null
            }
            <div className="row rows boton">
                <Button className="btn btn-primary" style={{width:"40%"}} onClick={sendFiles}>Entregar</Button>
            </div>
        </>
    );
}

Upload.propTypes = {
    onFileChange: PropTypes.func
}

