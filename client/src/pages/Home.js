import React, { useState } from "react";
import LayoutBasic from "../layouts/LayoutBasic";
import {sayHelloApi} from '../api/example'
import ModalExample from "../components/Modals/ModalExample";

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
            <div>
                <h1>We're in Home</h1>
                <button onClick={sayHello}>Tócame!</button>
                {data && <h3>{`Mensaje: ${data}`}</h3>}
            </div>
            
            <ModalExample show={showModal}
                setShow={setShowModal}
                message={data}
            />
        </LayoutBasic>
    )
}
