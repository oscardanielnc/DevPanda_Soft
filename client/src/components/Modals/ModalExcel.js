import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { toast } from 'react-toastify';
import { updateEnrollmentStudentsApi } from "../../api/enrollment";
import ModalBasic from "./ModalBasic";

export default function ModalExcel (props) {
    const {show, setShow, students, excel, idProcess} = props;
    const [newStudents, setNewStudents] = useState([]);

    useEffect(()=> {
        if(students && excel || students.length > 0 || excel.length > 0) {
            let news = [];
            students.forEach((std) => {
                if(std.estadoMatriculado===0 && isInExcel(std)) {
                    const name = `${std.nombres.split(" ")[0]} ${std.apellidos.split(" ")[0]}`;
                    const s = {
                        id: std.idPersona,
                        email: std.correo,
                        name
                    }
                    news.push(s)
                }
            })

            setNewStudents(news)
        }
    }, [excel])

    const isInExcel = std => {
        for(let emailExcel of excel) {
            if(emailExcel===std.correo) {
                return true
            }
        }
        return false;
    }

    const handleRegister = () => {
        if(newStudents.length===0) {
            toast.warning("Ningun alumno seleccionado", {
                position: "top-right",
                autoClose: 3000,
            });
        } else {
            const arr = newStudents.map(std => std.id);
            const data = {
                arrStudents: arr,
                fidProceso: idProcess
            }
            updateEnrollmentStudentsApi(data).then(response => {
                const type = response.success? "success": "error";
                toast[type](response.message, {
                    position: "top-right",
                    autoClose: 3000,
                });
            })
        }
    }
 
    return (
      
        <ModalBasic
            show={show}
            setShow={setShow}
            handlePrimaryAction={handleRegister}
            title="Alumnos que se pueden matricular"
            primaryAction="Registrar"
            secundaryAction="Cancelar"
        >
            <div className="modalExcel"> 
            {
                newStudents.length>0?
                <Table striped bordered hover className="TableAgreement">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        newStudents.map((std, index) => (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{std.name}</td>
                                <td>{std.email}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>:
                <h6>Ningún alumno (no matriculado) coincide con la búsqueda en este docuemnto.</h6>
            }
            </div>
        </ModalBasic>
    )
}