import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import './Upload.scss'; 

import fileDefault from '../../asserts/img/svg/file-earmark-arrow-up.svg';
import fileDoc from '../../asserts/img/svg/file-earmark-word.svg';
import filePdf from '../../asserts/img/svg/filetype-pdf.svg';
import fileDocx from '../../asserts/img/svg/filetype-docx.svg';
import { Button } from 'react-bootstrap';

const listImgConfig = {
    default: fileDefault,
    pdf: filePdf,
    docx: fileDocx,
    doc: fileDoc
}


export default function Upload ({maxFiles, onFileChange, fileList, setFileList}) {

    const wrapperRef = useRef(null);

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
    return (
        <>
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
        </>
    );
}

Upload.propTypes = {
    onFileChange: PropTypes.func
}

