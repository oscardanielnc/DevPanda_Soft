import React, { useState } from "react";
import LayoutBasic from "../layouts/LayoutBasic";
import {sayHelloApi} from '../api/example'
import ModalExample from "../components/Modals/ModalExample";
import './Home.scss';


export default function Home () {
    const [data, setData] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const sayHello = async () => {
        const message = await sayHelloApi();
        console.log("🥵")
        setData(message)

        // con la siguiente linea hacemos visible el Modal
        setShowModal(true)
    }
    const agregarEspecialidad=()=>{

    }

    const dataEspecialidades=[
        {
            "idEspecialidad": 1,
            "nombreEsp": "Ingeniería Informática",
            "flagMatricula": 1,
            "flagConvenio": 0
        },
        {
            "idEspecialidad": 2,
            "nombreEsp": "Ingeniería Industrial",
            "flagMatricula": 1,
            "flagConvenio": 0
        },
        {
            "idEspecialidad": 3,
            "nombreEsp": "Ingeniería de Telecomunicaciones",
            "flagMatricula": 1,
            "flagConvenio": 0
        },
        {
            "idEspecialidad": 4,
            "nombreEsp": "Ingeniería Electrónica",
            "flagMatricula": 1,
            "flagConvenio": 0
        }
    ]
    
    return (
        <LayoutBasic>
            <div className="container principal">
                <div className="row rows" style={{textAlign: "center"}}>
                    <h1>Gestión de especialidades</h1>
                </div>
                <div className="row rows" style={{"margin-right": "0px","margin-left":"auto", }}>
                    <button type="button" className="btn btn-primary" onClick={agregarEspecialidad} style={{"width":"100px"}} >Agregar</button>
                </div>
                {/*
                <div className="row rows" style={{textAlign: "right"}}>
                    <button onClick={sayHello}>Tócame!</button>
                    {data && <h3>{`Mensaje: ${data}`}</h3>}
                </div>*/}
                <div className="row rows">
                    <div className="col-sm-8 modified" style={{textAlign: "center"}}>Nombre Especialidad</div>                    
                    <div className="col-sm-4 modified" style={{textAlign: "left"}}>Acciones</div>
                </div>
                <div className="row rows">
                    {
                        dataEspecialidades.map((element,index)=>(
                            <div className="row" key={index}>
                            <div className="col-sm-8 modified" >{element.nombreEsp}</div>                    
                            <div className="col-sm-2 modified"><button type="button" className="btn btn-primary">Editar</button></div>
                            <div className="col-sm-2 modified" ><button type="button" className="btn btn-danger">Eliminar</button></div>
                            </div>
                        ))

                    }
                </div>
            </div>
            <ModalExample show={showModal}
                setShow={setShowModal}
                message={data}
            />
        </LayoutBasic>
    )
}