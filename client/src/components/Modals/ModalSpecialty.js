import React from "react";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { specialtyInsertApi } from "../../api/specialty";
// import { createAdministrativeApi } from "../../api/users";
import ModalBasic from './ModalBasic';

import './ModalStudentManagement.scss';

const coordinators = [
    // {
    //     name: "Bello Torres",
    //     id: 1
    // },
    // {
    //     name: "Blanco Negro",
    //     id: 2
    // },
    // {
    //     name: "Pika Chug",
    //     id: 3
    // }
]

export default function ModalSupervisor (props) {
    const {show, setShow, newData, setNewData, mode, setEspecialidades, setFilteredData, especialidades} = props;

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
    const handleSelect = e => {
        const text = e.target.value;

        setNewData({
            ...newData,
            fidCoordVigente: Number(text)
        })
    }

    const update = () => {
        setShow(false);
    }
    const insert = async () => {
        if(newData.nombreEsp === "" || newData.codigo === "") {
            toast.warning("El nombre de la especialidad y el código no pueden ser campos vacíos", {
                position: "top-right",
                autoClose: 3000,
            });
        } else {
                const specialty = {
                    nombreEsp: newData.nombreEsp,
                    codigo: newData.codigo,
                    activo: newData.activo
                }
                const result = await specialtyInsertApi(specialty);
                if(result.success) {
                    const spe = {
                        idEspecialidad: result.specialty.idEspecialidad,
                        nombreEsp: newData.nombreEsp,
                        codigo: newData.codigo,
                        fidCoordVigente: null,
                        activo: newData.activo
                    }
                    setEspecialidades([
                        ...especialidades,
                        spe
                    ])
                    setFilteredData([
                        ...especialidades,
                        spe
                    ])
                    setShow(false);
                }
                const typeToast = result.success? "success": "error";
                toast[typeToast](result.message, {
                    position: "top-right",
                    autoClose: 3000,
                });
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
            title={`Datos de la especialidad (${mode==="update"? "Editar": "Agregar"})`}
            primaryAction="Guardar"
            secundaryAction="Cancelar"
        >
            <Form className="modalStudentManagement">
                <InputLabel name="nombreEsp" value={newData.nombreEsp} handleChangeText={handleChangeText} nombre="Nombre"/>
                <InputLabel name="codigo" value={newData.codigo} handleChangeText={handleChangeText} nombre="Código"/>
 
                <div className="modalStudentManagement__switches">
                    <Form.Group className="modalStudentManagement__switches-group">
                        <Form.Label className="modalStudentManagement__switches-label">
                            Activo: 
                        </Form.Label>
                        <Form.Switch className="modalStudentManagement__switches-group-input"
                            defaultChecked={newData.activo===1} onChange={handleChangeSwitch}/>
                    </Form.Group>
                </div>
                <Form.Group className="modalStudentManagement__switches-group">
                    <Form.Label className="modalStudentManagement__switches-label">
                        Coordinador: 
                    </Form.Label>
                    <Form.Select className="studentManagement__select form-select" onChange={handleSelect} name="select">
                            <option value={"-1"}>Todos</option>
                            { coordinators.length >0 &&
                                coordinators.map((element, index) => (
                                    <option value={`${element.id}`} 
                                    key={index}>{element.name}
                                    </option>
                                ))
                            }
                    </Form.Select>
                </Form.Group>
            </Form>

        </ModalBasic>
    )
}

function InputLabel({name, value, handleChangeText, nombre}) {
    return (
        <Form.Group className="modalStudentManagement__formGroup">
            <Form.Label className="modalStudentManagement__formGroup-label">
                {nombre}
            </Form.Label>
            <Form.Control className="modalStudentManagement__formGroup-input" type="text" 
                value={value} onChange={handleChangeText} name={name}/>
        </Form.Group>
    )
}