import React, {useState}  from "react";
import { Button, Table,Form,InputGroup,FormControl } from 'react-bootstrap';
import DatePicker,{ registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './AboutDurationPSP.scss';
import es from 'date-fns/locale/es';


registerLocale('es', es);


export default function AboutDurationPSP (props) {
    const {isNational,setIsNacional, inputs, setInputs} = props;

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
                         <div  className="horas">Horas Diarias Promedio</div>
                            <Form.Control placeholder="Ingrese número de horas diarias" 
                                onChange={inputValidation}
                                value={inputs.horasDiarias}
                                name="nombresAlumno"
                                type="number"/>
                         </div>
                         <div className="col-sm-1 subtitles">
                            
                         </div>
                    </div>
                </div>
                <div className="col-sm-6 horas columnas">
                <div className="row filas">
                         <div className="col-sm-8 subtitles">
                         <div  className="horas">Horas Semanales Promedio</div>
                            <Form.Control placeholder="Ingrese número de horas semanales" 
                                type="number"
                                onChange={inputValidation}
                                value={inputs.horasSemanales}
                                name="nombresAlumno1"
                                />
                         </div>
                         <div className="col-sm-1 subtitles">
                            
                         </div>
                    </div>
                </div>
            </div>
        </div>
    )
}