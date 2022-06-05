import React, { useState } from 'react';
import { Button, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import LayoutAdministrative from '../../layouts/LayoutAdministrative';
import { DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import "./scss/ConfigProcess.scss";
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { createProcessApi } from '../../api/process';
import { ToastContainer, toast } from 'react-toastify';

const dummyFlows = [
    {
        name: "Iniciar Proceso Con o Sin Convenio",
        checked: true,
        code: "NCON",
        id: 0
    },
    {
        name: "Convenio y Plan de Aprendizaje",
        checked: true,
        code: "CONV",
        id: 1
    },
    {
        name: "Matrícula",
        checked: true,
        code: "MATR",
        id: 2
    },
    {
        name: "Ficha de Inscripción",
        checked: true,
        code: "FINS",
        id: 3
    },
    {
        name: "Elección del Supervisor",
        checked: true,
        code: "ESUP",
        id: 4
    },
    {
        name: "Entregables",
        checked: true,
        code: "ENTS",
        id: 5
    }
]

export default function ConfigProcess() {
    const [flows, setFlows] = useState(dummyFlows);
    const {user} = useAuth();

    const order = (list, startIndex, endIndex) => {
        const result = [...list];
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    }

    const reorder = result => {
        const {source, destination} = result;
        if(!destination || (source.index===destination.index && 
            source.draggableId===destination.droppableId)) return;
        setFlows(prev => order(prev, source.index, destination.index));
    }
    const handleCheck = e => {
        const index = Number(e.target.name);
        const newChecks = flows.map((f, i) => {
            if(index===i) {
                return {
                    ...f,
                    checked: !f.checked
                }
            }
            return f
        })
        setFlows(newChecks)
    }
    const handleSave = async () => {
        const finalFlow = [];
        let counter = 1;
        
        flows.forEach(f => {
            if(f.checked) {
                const fl = {
                    name: f.name,
                    code: f.code,
                    order: counter
                }
                counter++;
                finalFlow.push(fl)
            }
        })
        const ifin = {
            name: "Informe Final",
            code: "IFIN",
            order: counter
        }
        finalFlow.push(ifin);

        const process = {
            anio: 2022, //necesitamos conseguir el anio
            cicle: 1, //necesitamos conseguir el ciclo
            specialty: user.fidEspecialidad,
            ini: null,
            fin: null,
            flow: finalFlow
        }
        console.log(process)
        
        const result = await createProcessApi(process);
        const typeToast = result.success? "success": "error";
        toast[typeToast](result.message, {
            position: "top-right",
            autoClose: 3000,
        });
        // si es exitoso regresar a listConfig
    }

    return(
        <LayoutAdministrative>
            <ToastContainer />  
            <div className="container configProcess">
                <Row className="rows">
                    <h1>Configuración del Nuevo Proceso</h1>
                </Row>
                <Row className="rows configProcess__basic">
                    <FormControl type='number' min="1900" max="2100" 
                        className='configProcess__basic-anio' placeholder='2022'/>
                    <Form.Select className='configProcess__basic-ciclo'>
                        <option>Ciclo</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </Form.Select>
                </Row>

                <Row className="rows configProcess__flow">
                    <h3>Flujo del proceso</h3>
                    <DragDropContext onDragEnd={result => reorder(result)}>
                        <Droppable droppableId='flows'>
                            {(droppableProvided) => (
                                <ul className="configProcess__flow-flows"
                                    {...droppableProvided.droppableProps}
                                    ref={droppableProvided.innerRef}
                                >
                                    {flows.map((f,i) => (
                                        <Draggable  key={f.id} draggableId={`${f.id}`} index={i}> 
                                        {(draggableProvided) => (
                                                <InputGroup {...draggableProvided.draggableProps}
                                                    ref={draggableProvided.innerRef}
                                                    {...draggableProvided.dragHandleProps}
                                                    className="configProcess__flow-flows-item"
                                                    >
                                                    <InputGroup.Checkbox checked={f.checked} name={`${i}`} onChange={handleCheck}/>
                                                    <div className="configProcess__flow-flows-name"><span>{f.name}</span></div>
                                                </InputGroup>
                                            )
                                        }
                                        </Draggable>
                                    ))}
                                    {droppableProvided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </DragDropContext>
                    <InputGroup className="configProcess__flow-flows-item">
                        <InputGroup.Checkbox checked readOnly/>
                        <div className="configProcess__flow-flows-name"><span>Informe Final</span></div>
                    </InputGroup>
                </Row>
                <Row className="rows configProcess__btns">
                    <Link to="/list-process/permissions=E" 
                        className='btn btn-outline-primary configProcess__btns-btn'>
                            Regresar
                    </Link>
                    <Button variant="primary" className='configProcess__btns-btn' onClick={handleSave}>
                        Guardar
                    </Button>
                </Row>
            </div>
        </LayoutAdministrative>
    )
}
