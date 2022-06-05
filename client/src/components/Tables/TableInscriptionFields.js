import React,{useState, useEffect} from "react";
import { Button, Table } from 'react-bootstrap';
import ModalEditFieldInscription from "../../components/Modals/ModalEditFieldInscription";
import ModalDeleteFieldInscription from "../../components/Modals/ModalDeleteFieldInscription";
import './TableInscriptionFields.scss';




export default function TableInscriptionFields ({rows, setShow, setNewDataStudent, matr}) {
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [dataEdit,setDataEdit]=useState([]);
    const [dataDelete,setDataDelete]=useState([]);
    const [dataEditCopy,setDataEditCopy]=useState([]);
    if(rows.length === 0) {
        return (
            <p>Ningun Alumno coincide con la busqueda o no existen alumnos registrados todavía.</p>
        )
    }
    const handleClick = student => {
        setShowEdit(true)
        setDataEdit(student)
        setDataEditCopy(student)
    }

    const handleClick2 = student => {
        setShowDelete(true)
        setDataDelete(student)
    }
    //onClick={() => handleClick(row)}
    return (
        <Table striped bordered hover className="">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Campo</th>
                    <th>Seccion</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
            {
                rows.map((row, index) => {
                    return (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{row.nameField}</td>
                        <td>{row.seccion}</td>
                        <td>
                            {
                                (!row.fijo)&& 
                                <div style={{textAlign:"center"}}>
                                    <Button className="btn btn-primary" style={{width:"30%",marginRight:"25px",marginLeft:"25px"}} onClick={()=>handleClick(row)}>Editar</Button>
                                    <Button className="btn btn-primary" style={{width:"30%",marginRight:"25px",marginLeft:"25px"}} onClick={()=>handleClick2(row)}>Eliminar</Button>
                                </div>
                                
                            }
                            
                        </td>
                    </tr>
                )})
            }
            </tbody>
            <ModalEditFieldInscription show={showEdit} setShow={setShowEdit}
                            data={dataEditCopy} setData={setDataEditCopy}/>
            <ModalDeleteFieldInscription show={showDelete} setShow={setShowDelete}
                            data={dataDelete} setData={setDataDelete}/>
        </Table>
    )
}