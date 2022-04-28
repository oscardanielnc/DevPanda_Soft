import React, { useState } from "react";
import LayoutBasic from "../layouts/LayoutBasic";
import {sayHelloApi} from '../api/example'
import ModalExample from "../components/Modals/ModalExample";


const especialidades = [
    {
        "idEspecialidad": 1,
        "nombreEsp": "ing. prueba asies",
        "flagMatricula": 1,
        "flagConvenio": 0
    },
    {
        "idEspecialidad": 2,
        "nombreEsp": null,
        "flagMatricula": 1,
        "flagConvenio": 0
    },
    {
        "idEspecialidad": 3,
        "nombreEsp": "Ing. de pandas",
        "flagMatricula": 1,
        "flagConvenio": 0
    },
    {
        "idEspecialidad": 4,
        "nombreEsp": "Ing. de pandas",
        "flagMatricula": 1,
        "flagConvenio": 0
    }
]


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

    

    return (
        <LayoutBasic>
            <div className="Home">
                <h1 className="Home-h1">We're in Home</h1>
                <button onClick={sayHello}>Tócame!</button>

                <div className="Home__especialdades">
                {
                    especialidades.map((elemnt, index) => (
                        <div style={{"background": "red"}} className="Home__especialdades-esp">
                            <strong key={index}>{elemnt.idEspecialidad}</strong>
                            <p>{elemnt.nombreEsp}</p>
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