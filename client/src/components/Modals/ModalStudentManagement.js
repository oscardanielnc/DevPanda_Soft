import React from "react";
import { ButtonGroup, Form, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import ModalBasic from './ModalBasic';

import './ModalStudentManagement.scss';

const radios = [
    { name: 'Sin asignar', value: '0' },
    { name: 'Grupo 1', value: '1' },
    { name: 'Grupo 2', value: '2' },
  ];

export default function ModalStudentManagement (props) {
    const {show, setShow, updateStudent, newDataStudent, setNewDataStudent, matr} = props;

    const handleChangeToggleButton = e => {
        const grupo = (e.currentTarget.value === '0')? null: e.currentTarget.value;
        setNewDataStudent({
            ...newDataStudent,
            grupoAsignado: grupo,
        })
    }
    const handleChangeSwitch = e => {
        let newfiled;
        if(e.target.name === "enrolled") {
            newfiled = {
                estadoMatriculado: newDataStudent.estadoMatriculado===1? 0: 1
            }
        } else {
            newfiled = {
                estado: newDataStudent.estado==='R'? 'C': 'R'
            }
        }
        setNewDataStudent({
            ...newDataStudent,
            ...newfiled
        })
    }
    const handleChangeText = e => {
        setNewDataStudent({
            ...newDataStudent,
            codigo: e.target.value
        })
    }
    
    return ( 
        <ModalBasic show={show}
            setShow={setShow}
            handlePrimaryAction={updateStudent}
            title="Datos del alumno"
            primaryAction="Guardar"
            secundaryAction="Cancelar"
        >
            <Form className="modalStudentManagement">
                <InputLabel name="Nombres" value={newDataStudent.nombres} />
                <InputLabel name="Apellidos" value={newDataStudent.apellidos} />
                <InputLabel name="Correo" value={newDataStudent.correo} />

                <Form.Group className="modalStudentManagement__formGroup">
                    <Form.Label className="modalStudentManagement__formGroup-label">
                        Código PUCP: 
                    </Form.Label>
                    <Form.Control className="modalStudentManagement__formGroup-input" type="text" 
                        value={newDataStudent.codigo} onChange={handleChangeText}/>
                </Form.Group>

                <div className="modalStudentManagement__switches">
                    {
                        matr && 
                        <Form.Group className="modalStudentManagement__switches-group">
                            <Form.Label className="modalStudentManagement__switches-label">
                                Matriculado: 
                            </Form.Label>
                            <Form.Switch name="enrolled" className="modalStudentManagement__switches-group-input" 
                                defaultChecked={newDataStudent.estadoMatriculado===1} onChange={handleChangeSwitch}/>
                        </Form.Group>
                    }

                    <Form.Group className="modalStudentManagement__switches-group">
                        <Form.Label className="modalStudentManagement__switches-label">
                            Retirado: 
                        </Form.Label>
                        <Form.Switch name="retired" className="modalStudentManagement__switches-group-input"
                            defaultChecked={newDataStudent.estado==='R'} onChange={handleChangeSwitch}/>
                    </Form.Group>
                </div>
                
                <Form.Group className="modalStudentManagement__formGroup">
                    <Form.Label className="modalStudentManagement__formGroup-label">
                        Grupo asignado: 
                    </Form.Label>
                    <ButtonGroup>
                        {radios.map((radio, idx) => (
                        <ToggleButton
                            key={idx}
                            id={`radio-sm-${idx}`} //si alguien usa esto, cambie los nombres
                            type="radio"
                            variant="outline-primary"
                            name="radio"
                            value={radio.value}
                            checked={(radio.value==='0' && newDataStudent.grupoAsignado===null) || radio.value===`${newDataStudent.grupoAsignado}`}
                            onChange={handleChangeToggleButton}
                        >
                            {radio.name}
                        </ToggleButton>
                        ))}
                    </ButtonGroup>
                </Form.Group>
            </Form>

        </ModalBasic>
    )
}

function InputLabel({name, value}) {
    return (
        <Form.Group className="modalStudentManagement__formGroup">
            <Form.Label className="modalStudentManagement__formGroup-label">
                {name}: 
            </Form.Label>
            <Form.Control className="modalStudentManagement__formGroup-input" type="text" value={value} readOnly/>
        </Form.Group> 
    )
}