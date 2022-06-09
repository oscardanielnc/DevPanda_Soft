import React from "react";
import { Button, Table } from 'react-bootstrap';
import ModalNoAgreementReview from "../Modals/ModalNoAgreementReview";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import {getAllDocsApi,uploadDocsApi } from "../../api/files";

export default function TableResignationRequests ({rows, idProcess=1, phase="CONV"}) {
    const {user} = useAuth();
    const [show,setShow]=useState(false);
    const [dataReview,setDatareview]=useState([]);
    const [dataReviewCopy,setDatareviewCopy]=useState([]);
    const [fileList, setFileList] = useState([]);
    if(rows.length === 0) {
        return (
            <p>No se han registrado renuncias todavía.</p>
        )
    }

    const handleClick = async(student) => {
        setShow(true);
        setDatareview(student);
        setDatareviewCopy(student);
        const result = await getAllDocsApi(`${user.fidProceso}-RNCI-${student.idAlumno}`, 1);
        if(result.success) {
            setFileList(result.docs)
        }
    }

    return (
        <Table striped bordered hover className="">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
            {
                rows.map((row, index) => {
                    return (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{row.nombreAlumno}</td>
                        <td>{row.estado}</td>
                        <td>
                            <Button className="btn btn-primary" style={{width:"80%",marginRight:"25px",marginLeft:"25px",textAlign:"center !important"}} onClick={()=>handleClick(row)}>Visualizar</Button>
                        </td>
                    </tr>
                )})
            }
            </tbody>
            <ModalNoAgreementReview show={show} setShow={setShow} files={fileList} setFiles={setFileList}
                data={dataReviewCopy} setData={setDatareviewCopy}></ModalNoAgreementReview>
        </Table>
    )
}