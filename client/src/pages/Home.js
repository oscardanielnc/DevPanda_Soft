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
            <div style={{textAlign: "center"}}>
                <h1>Gestión de especialidades</h1>
            </div>
            <div style={{textAlign: "right"}}>
            <button type="button" class="btn btn-primary" onClick={agregarEspecialidad} style={{"marginRight":"50px"}} >Agregar</button>
            </div>
            <div>
            <button onClick={sayHello}>Tócame!</button>
                {data && <h3>{`Mensaje: ${data}`}</h3>}
            </div>
            <div class="container" style={{marginBottom:"20px"}}>
                <div class="row">
                <div class="col-sm-8" style={{"marginTop":"15px",textAlign: "center"}}>Nombre Especialidad</div>                    
                <div class="col-sm-4" style={{"marginTop":"15px",textAlign: "left"}}>Acciones</div>
                </div>
            </div>
            <div class="container">
            {
                dataEspecialidades.map((element,index)=>(
                    <div class="row" key={index}>
                    <div class="col-sm-8" style={{"marginTop":"15px"}}>{element.nombreEsp}</div>                    
                    <div class="col-sm-2" style={{"marginTop":"15px"}}><button type="button" class="btn btn-primary">Editar</button></div>
                    <div class="col-sm-2" style={{"marginTop":"15px"}}><button type="button" class="btn btn-danger">Eliminar</button></div>
                    </div>
                ))

            }
            </div>
                
            
            <ModalExample show={showModal}
                setShow={setShowModal}
                message={data}
            />
        </LayoutBasic>
    )
}
