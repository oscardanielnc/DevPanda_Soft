import React, { useEffect, useState } from 'react';
import { Accordion, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LayoutAdministrative from '../../layouts/LayoutAdministrative';
import "./scss/ProcessList.scss";

const dummy = [
    {
        idProceso: 3,
        anio: 2020,
        ciclo: 2, 
        fechaIni: "01/04/2020", 
        fechaFin: "01/04/2020", 
        activo: 1, 
        procesoActivo: 1,
        flujo: [
            "Inicio del Proceso",
            "Convenio y Plan de Aprendizaje",
            "Matrícula",
            "Ficha de Inscripción",
            "Elección del Supervisor",
            "Entregables",
            "Informe Final",
        ]
    },
    {
        idProceso: 2,
        anio: 2020,
        ciclo: 1, 
        fechaIni: "01/04/2020", 
        fechaFin: "01/04/2020", 
        activo: 1, 
        procesoActivo: 0,
        flujo: [
            "Inicio del Proceso",
            "Convenio y Plan de Aprendizaje",
            "Ficha de Inscripción",
            "Elección del Supervisor",
            "Entregables",
            "Informe Final",
        ]
    },
    {
        idProceso: 1,
        anio: 2020,
        ciclo: 0,
        fechaIni: "01/04/2020", 
        fechaFin: "01/04/2020", 
        activo: 1, 
        procesoActivo: 0,
        flujo: [
            "Inicio del Proceso",
            "Ficha de Inscripción",
            "Elección del Supervisor",
            "Entregables",
            "Informe Final",
        ]
    },
]

export default function ProcessList() {
    const [data, setData] = useState([]);
    useEffect(()=> {
        setData(dummy);
    }, [setData])

    return(
        <LayoutAdministrative>
            <div className="container processList">
                <Row className="rows processList__title">
                    <h1>Lista de Procesos de la Especialidad</h1>
                    <Link className="btn btn-primary processList__title-btn" to={"/config-process/permissions=E"}>Agregar</Link>
                </Row>
                <Row className="rows">
                    {
                        data.length > 0? 
                        <Accordion defaultActiveKey="0"> 
                        {
                            data.map((element, index) => (
                                <AccordionProcess key={index} element={element} index={index}/>
                            ))
                        }
                        </Accordion>:
                        <h6>Aún no han creado procesos en su especialidad.</h6>
                    }
                </Row>
            </div>
        </LayoutAdministrative>
    )
    
}

function AccordionProcess({element, index}) {
    const {anio, ciclo, fechaIni, fechaFin, procesoActivo, flujo} = element;
    const nombre = `${anio} - ${ciclo}`
    return (
        <Accordion.Item eventKey={`${index}`} className="accordionProcess">
            <Accordion.Header className="accordionProcess__header">
                {
                    procesoActivo===1 && 
                    <OverlayTrigger overlay={<Tooltip>Proceso vigente</Tooltip>}>
                        <i className="bi bi-check accordionProcess__header-check"/>
                    </OverlayTrigger>
                }
                <span className="accordionProcess__header-name">{nombre}</span>
            </Accordion.Header>
            <Accordion.Body className="accordionProcess__body">
                <span className="accordionProcess__body-date">{`${fechaIni} - ${fechaFin}`}</span>
                <div className="accordionProcess__body-items">
                {
                    flujo.map((name, i) => (
                        <div key={i} className="accordionProcess__body-item">
                            <i className="bi bi-check accordionProcess__body-item-circle"/>
                            <span className="accordionProcess__body-item-title">{name}</span>
                        </div>
                    ))
                }
                </div>
            </Accordion.Body>
        </Accordion.Item>
    )
}