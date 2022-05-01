import React, {useState}  from "react";
import { Button, Table,Form,InputGroup,FormControl } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './AboutDurationPSP.scss';


export default function AboutDurationPSP ({data}) {
    const [inputs, setInputs] = useState({
        nombresAlumno: "",
        apellidosAlumno: "",
        codigoPUCP:"",
        correoPUCP:"",
        flagConvenio: false
    })
    const inputValidation = e => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }
    const [startDate, setStartDate] = useState(new Date());

    return (
        <div className="container chartAboutDurationPSP">
             <nav className="navbar navbar-fixed-top navbar-inverse bg-inverse "style={{ backgroundColor: "#E7E7E7"}}>
                <h3 style={{"marginLeft":"15px"}}>Sobre la duración del PSP</h3>
             </nav>
            <div className="row rows">
                <div className="col-sm-6 subtitles">
                    <div>Fecha de inicio</div>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                    />
                </div>
                <div className="col-sm-6 subtitles">
                    <div>Fecha de fin</div>
                    <Form.Control placeholder="Escriba el puesto a desempeñar" 
                        onChange={inputValidation}
                        value={inputs.apellidosAlumno}
                        name="apellidosAlumno"/>
                </div>
            </div>
            <div className="row rows">
                <div className="col-sm-6 subtitles">
                    <div>Horas Diarias Promedio</div>
                    <Form.Control placeholder="Escriba el nombre del área" 
                        onChange={inputValidation}
                        value={inputs.nombresAlumno}
                        name="nombresAlumno"/>
                </div>
                <div className="col-sm-6 subtitles">
                    <div>Horas Semanales Promedio</div>
                    <Form.Control placeholder="Escriba el puesto a desempeñar" 
                        onChange={inputValidation}
                        value={inputs.apellidosAlumno}
                        name="apellidosAlumno"/>
                </div>
            </div>
        </div>
    )
}