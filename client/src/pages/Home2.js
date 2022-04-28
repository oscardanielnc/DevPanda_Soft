import React from "react";
import LayoutBasic from "../layouts/LayoutBasic";
import {Form} from 'react-bootstrap';
//import "bootstrap";
import './Home2.scss';

const coordinadores = [
    {
        name: "Javier Palacios"
    },
    {
        name: "Luis Flores"
    },
    {
        name: "Andres Melgar"
    }
]

const facultades = [
    {
        name: "Ciencias e Ingeniería"
    },
    {
        name: "Derecho"
    },
    {
        name: "Ciencias Sociales"
    }
]

export default function Home2 () {
    return (
        <LayoutBasic>
            <div className="container principal">
                <div className="row rows">
                    <h1>Agregar Especialidad</h1>
                </div>
                <div className="row rows">
                    <h1>Nombre</h1>
                </div>
                <div className="row rows">
                    <Form.Group className="mb-3 input" controlId="exampleForm.ControlInput1">
                        <Form.Control type="nombreEspecialidad" placeholder="Ingrese el nombre de la Especialidad" />
                    </Form.Group>
                </div>
                <div className="row rows">
                    <div className="col-sm-8">
                        <h2 style={{marginTop:"20px"}}>Coordinador de Especialidad</h2>
                    </div>
                    <div className="col-sm-4">
                    <Form.Select aria-label="Default select example" className="select">
                        <option>Seleccionar</option>
                        {
                            coordinadores.map((element, index) => (
                                <option value="1" key={index}>{element.name}</option>
                            ))
                        }
                    </Form.Select>
                    </div>
                </div>
                <div className="row rows">
                    <div className="col-sm-8">
                        <h2 style={{marginTop:"20px"}}>Facultad</h2>
                    </div>
                    <div className="col-sm-4">
                    <Form.Select aria-label="Default select example" className="select">
                        <option>Seleccionar</option>
                        {
                            facultades.map((element, index) => (
                                <option value="1" key={index}>{element.name}</option>
                            ))
                        }
                    </Form.Select>
                    </div>
                </div>
                <div className="row rows">
                    <h2>Representante Legal de la PUCP</h2>
                </div>
                <div className="row rows">
                    <div className="col-sm-6">
                        <Form.Control
                            type="text"
                            placeholder="Walter Pequeño"
                            aria-label="Disabled input example"
                            disabled
                            readOnly
                        />
                    </div>
                    <div className="col-sm-6">
                        <Form.Control
                            type="text"
                            placeholder="789456458"
                            aria-label="Disabled input example"
                            disabled
                            readOnly
                        />
                    </div>
                </div>
                <div className="row rows">
                    <div className="col-sm-10">
                        
                    </div>
                    <div className="col-sm-1">
                        <button type="button" className="btn btn-primary">Cancelar</button>
                    </div>
                    <div className="col-sm-1">
                        <button type="button" className="btn btn-primary">Guardar</button>
                    </div>
                </div>
            </div>
            {/* <div style={{textAlign: "center", marginTop:"15px"}}>
                
            </div> */}
           
            
        </LayoutBasic>
    )
}
