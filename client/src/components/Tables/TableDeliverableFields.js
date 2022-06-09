import React,{useState, useEffect} from "react";
import { Button, Table } from 'react-bootstrap';
import ModalEditFieldDeliverable from "../../components/Modals/ModalEditFieldDeliverable";
import ModalDeleteFieldDeliverable from "../../components/Modals/ModalDeleteFieldDeliverable";
import './TableDeliverableFields.scss';




export default function TableDeliverableFields ({rows, setShow, setNewDataStudent, matr}) {
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [dataEdit,setDataEdit]=useState([]);
    const [dataDelete,setDataDelete]=useState([]);
    const [dataEditCopy,setDataEditCopy]=useState([]);
    if(rows.length === 0) {
        return (
            <p>El deliverable seleccionado no tiene ningún campo</p>
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
                        <td>
                            {
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
            <ModalEditFieldDeliverable show={showEdit} setShow={setShowEdit}
                            data={dataEditCopy} setData={setDataEditCopy}/>
            <ModalDeleteFieldDeliverable show={showDelete} setShow={setShowDelete}
                            data={dataDelete} setData={setDataDelete}/>
        </Table>
    )
}