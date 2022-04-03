import React, { useState } from "react";
import LayoutBasic from "../layouts/LayoutBasic";
import {sayHelloApi} from '../api/example'

export default function Home () {
    const [data, setData] = useState(null);

    const sayHello = async () => {
        const message = await sayHelloApi();
        console.log("🥵")
        setData(message)
    }

    return (
        <LayoutBasic>
            <div>
                <h1>We're in Home</h1>
                <button onClick={sayHello}>Tócame!</button>
                {data && <h3>{`Mensaje: ${data}`}</h3>}
            </div>
        </LayoutBasic>
    )
}