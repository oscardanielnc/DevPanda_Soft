import React from "react";
import { Form } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { createAdministrativeApi } from "../../api/users";
import ModalBasic from './ModalBasic';

import './ModalStudentManagement.scss';

export default function ModalSupervisor (props) {
    const {show, setShow, newData, setNewData, idSpecialty, mode, setCoordinators, coordinators, setFilteredData} = props;

    const handleChangeSwitch = e => {
        setNewData({
            ...newData,
            activo: newData.activo ===1? 0:1
        })
    }
    const handleChangeText = e => {
        setNewData({
            ...newData,
            [e.target.name]: e.target.value
        })
    }
    // const handleSelect = e => {
    //     const text = e.target.value;

    //     setNewData({
    //         ...newData,
    //         fidEspecialidad: Number(text)
    //     })
    // }
    // const getSpecialtyName = (index) => {
    //     for(let i=0; i<specialties.length; i++) {
    //         if(specialties[i].idEspecialidad===index)
    //             return specialties[i].nombreEsp;
    //     }
    // }
    const update = () => {
        setShow(false);
    }
    const insert = async () => {
        if(newData.nombres === "" || newData.apellidos === "" || newData.correo === "") {
            toast.warning("Los nombres, apellidos y el correo no pueden ser campos vacíos", {
                position: "top-right",
                autoClose: 3000,
            });
        } else {
            // if(newData.fidEspecialidad === -1) {
            //     toast.warning("Tiene que seleccioar alguna especialidad para este coordinador", {
            //         position: "top-right",
            //         autoClose: 3000,
            //     });
            // } else {
                const personal = {
                    firstName: newData.nombres, 
                    lastName: newData.apellidos, 
                    email: newData.correo, 
                    specialty: idSpecialty, 
                    personalType: 'S',
                    active: newData.activo
                }
                const result = await createAdministrativeApi(personal);
                if(result.success) {
                    const sup = {
                        idPersona: result.personal.idPersona,
                        nombres: newData.nombres,
                        apellidos: newData.apellidos,
                        correo: newData.correo,
                        activo: newData.activo,
                        estado: '1'
                    }
                    setCoordinators([
                        ...coordinators,
                        sup
                    ])
                    setFilteredData([
                        ...coordinators,
                        sup
                    ])
                    setShow(false);
                }
                const typeToast = result.success? "success": "error";
                toast[typeToast](result.message, {
                    position: "top-right",
                    autoClose: 3000,
                });
            // }
        }
    }

    const handleClick = () => {
        if(mode==="update") update();
        else insert();
    }
    return ( 
        <ModalBasic show={show}
            setShow={setShow}
            handlePrimaryAction={handleClick}
            title={`Datos del supervisor (${mode===update? "Editar": "Agregar"})`}
            primaryAction="Guardar"
            secundaryAction="Cancelar"
        >
            <ToastContainer />  
            <Form className="modalStudentManagement">
                <InputLabel name="nombres" value={newData.nombres} handleChangeText={handleChangeText}/>
                <InputLabel name="apellidos" value={newData.apellidos} handleChangeText={handleChangeText}/>
                <InputLabel name="correo" value={newData.correo} handleChangeText={handleChangeText}/>
 
                <div className="modalStudentManagement__switches">
                    <Form.Group className="modalStudentManagement__switches-group">
                        <Form.Label className="modalStudentManagement__switches-label">
                            Activo: 
                        </Form.Label>
                        <Form.Switch className="modalStudentManagement__switches-group-input"
                            defaultChecked={newData.activo===1} onChange={handleChangeSwitch}/>
                    </Form.Group>
                </div>
                {/* <Form.Group className="modalStudentManagement__switches-group">
                    <Form.Label className="modalStudentManagement__switches-label">
                        Especialidad: 
                    </Form.Label>
                    <Form.Select className="studentManagement__select form-select" onChange={handleSelect} name="select">
                            <option value={"-1"}>Todos</option>
                            {
                                specialties.map((element, index) => (
                                    <option value={`${element.idEspecialidad}`} 
                                    key={index}>{element.nombreEsp}
                                    </option>
                                ))
                            }
                    </Form.Select>
                </Form.Group> */}
            </Form>

        </ModalBasic>
    )
}

function InputLabel({name, value, handleChangeText}) {
    return (
        <Form.Group className="modalStudentManagement__formGroup">
            <Form.Label className="modalStudentManagement__formGroup-label">
                {name[0].toUpperCase() + name.slice(1)}
            </Form.Label>
            <Form.Control className="modalStudentManagement__formGroup-input" type="text" 
                value={value} onChange={handleChangeText} name={name}/>
        </Form.Group>
    )
}