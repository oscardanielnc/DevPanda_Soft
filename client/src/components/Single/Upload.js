import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import './Upload.scss';

import fileDefault from '../../asserts/img/svg/file-earmark-arrow-up.svg';
import fileDoc from '../../asserts/img/svg/file-earmark-word.svg';
import filePdf from '../../asserts/img/svg/filetype-pdf.svg';
import fileDocx from '../../asserts/img/svg/filetype-docx.svg';

const ImageConfig = {
    default: fileDefault,
    pdf: filePdf,
    docx: fileDocx,
    doc: fileDoc
}


export default function Upload (props) {

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
            props.onFileChange(updatedList);
        }
    }

    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        props.onFileChange(updatedList);
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
                    <i className="bi bi-upload" style={{"font-size":"35px"}}></i>
                    <p>Arrastra & Suelta tus archivos aquí</p>
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
                                    <img src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']} alt="" />
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

