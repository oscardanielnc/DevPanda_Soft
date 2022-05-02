import React, {useState}  from "react";
import { Button, Table,Form,InputGroup,FormControl } from 'react-bootstrap';
import DatePicker,{ registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './AboutDurationPSP.scss';
import es from 'date-fns/locale/es';


registerLocale('es', es);


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
                <div className="col-sm-6 subtitles" >
                    <div>Fecha de inicio</div>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        locale="es"
                        className="picker1"
                        dateFormat="dd-MM-yy"
                    />
                </div>
                <div className="col-sm-6 subtitles">
                    <div>Fecha de fin</div>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        locale="es"
                        className="picker2"
                        dateFormat="dd-MM-yy"
                    />
                </div>
            </div>
            <div className="row rows">
                <div className="col-sm-6 columnas">
                    <div className="row filas">
                         <div className="col-sm-8 subtitles">
                         <div  style={{"paddingLeft":"0px !important"}} >Horas Diarias Promedio</div>
                            <Form.Control placeholder="Ingrese número de horas diarias" 
                                onChange={inputValidation}
                                value={inputs.nombresAlumno}
                                name="nombresAlumno"/>
                         </div>
                         <div className="col-sm-1 subtitles">
                            <div className="row iconUp">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                                </svg>
                            </div>
                            <div className="row iconDown">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                </svg>
                            </div>
                         </div>
                    </div>
                </div>
                <div className="col-sm-6 horas columnas">
                <div className="row filas">
                         <div className="col-sm-8 subtitles">
                         <div  style={{"paddingLeft":"0px !important"}} >Horas Semanales Promedio</div>
                            <Form.Control placeholder="Ingrese número de horas semanales" 
                                onChange={inputValidation}
                                value={inputs.nombresAlumno}
                                name="nombresAlumno"/>
                         </div>
                         <div className="col-sm-1 subtitles">
                            <div className="row iconUp">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                                </svg>
                            </div>
                            <div className="row iconDown">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                </svg>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    )
}