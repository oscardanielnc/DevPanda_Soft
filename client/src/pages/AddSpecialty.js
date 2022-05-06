import React, {useState} from "react";
import LayoutBasic from "../layouts/LayoutCoordFACI";
import {Form} from 'react-bootstrap';
import './AddSpecialty.scss';
import { Link } from "react-router-dom";
import { specialtyInsertApi } from "../api/specialty";
import ToastPanda from "../components/Toast/ToastPanda";

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
    }
]

export default function AddSpecialty () {
    const [inputs, setInputs] = useState({
        nombreEsp: "",
        flagMatricula: false,
        flagConvenio: false
    })
    const [showToast, setShowToast] = useState(false);
    const [resultInsertMsg, setResultInsertMsg] = useState("");


    const inputValidation = e => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }
    const insert = async e => {
        e.preventDefault();
        
        const response = await specialtyInsertApi(inputs);
        setResultInsertMsg(response.msg);
        setShowToast(true);
        if(response.success)
            window.location.href = "/";
    }
    return (
        <LayoutBasic>
            <Form className='container principal'>
                <div className="row rows">
                    <h1>Agregar Especialidad</h1>
                </div>

                <div className="row rows">
                    <Form.Group className="mb-3 input">
                        <h3>Nombre</h3>
                        <Form.Control placeholder="Ingrese el nombre de la Especialidad" 
                            onChange={inputValidation}
                            value={inputs.nombreEsp}
                            name="nombreEsp"/>
                    </Form.Group>
                </div>
                <div className="row rows">
                    <div className="col-sm-8">
                        <h3 style={{marginTop:"20px"}}>Coordinador de Especialidad</h3>
                    </div>
                    <div className="col-sm-4">
                    <Form.Select className="select">
                        <option value="-1">Seleccionar</option>
                        {
                            coordinadores.map((element, index) => (
                                <option value={index} 
                                    key={index}>{element.name}
                                </option>
                            ))
                        }
                    </Form.Select>
                    </div>
                </div>
                <div className="row rows">
                    <div className="col-sm-8">
                        <h3 style={{marginTop:"20px"}}>Facultad</h3>
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
                    <h3>Representante Legal de la PUCP</h3>
                </div>
                <div className="row rows">
                    <div className="col-sm-6">
                        <Form.Control
                            type="text"
                            placeholder="Walter Pequeño"
                            disabled
                            readOnly
                        />
                    </div>
                    <div className="col-sm-6">
                        <Form.Control
                            type="text"
                            placeholder="789456458"
                            disabled
                            readOnly
                        />
                    </div>
                </div>
                <div className="row add-specialty__buttons">
                        <Link className="btn btn-primary" to = "/">Cancelar</Link>
                        <button className="btn btn-primary" onClick={insert}>Guardar</button>
                </div>
            </Form>
            <ToastPanda title="DevPanda"
                message={resultInsertMsg}
                showToast={showToast}
                setShowToast={setShowToast}/>
        </LayoutBasic>
    )
}
