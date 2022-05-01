import React, {useState}  from "react";
import { Button, Table,Form,InputGroup,FormControl } from 'react-bootstrap';

import './AboutCompany.scss';


export default function AboutCompany ({data}) {
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
    return (
        <div className="container chartSobreEmpresa">
             <nav className="navbar navbar-fixed-top navbar-inverse bg-inverse "style={{ backgroundColor: "#E7E7E7"}}>
                <h3 style={{"marginLeft":"15px"}}>Sobre la empresa</h3>
             </nav>
            <div className="row rows" >
                <div className="col-sm-4 subtitles">
                    <div>Tipo de empresa:</div>
                </div>
                {/* <div className="col-sm-3 subtitles">
                    <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked/>
                    <label className="form-check-label" > Nacional </label>
                    </div>
                </div>
                <div className="col-sm-3 subtitles">
                    <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"/>
                    <label className="form-check-label" > Extranjera </label>
                    </div>
                </div> */}
                <div className="col-sm-2 subtitles">
                </div>
            </div>
            <div className="row rows" >
                <div style={{"marginTop":"5px",fontWeight: "700"}}>Empresa Nacional</div>
            </div>
            <div className="row rows" >
                <div className="col-sm-1 subtitles">
                <div style={{"marginTop":"5px","marginBottom":"8px"}}>RUC</div>
                </div>
                <div className="col-sm-7 subtitles">
                    <Form.Control placeholder="Ingrese RUC de la empresa" 
                        onChange={inputValidation}
                        value={inputs.codigoPUCP}
                        name="codigoPUCP"
                        style={{"marginBottom":"8px !important"}}/>
                </div>
                <div className="col-sm-4 subtitles">
                    <Button variant="primary" style={{"marginBottom":"8px"}}>Editar</Button>

                </div>
            </div>
            <div className="row rows" >
                <div style={{fontWeight: "700"}}>Nombre de Empresa Extranjera</div>
            </div>
            <div className="row rows" >
                <Form.Control placeholder="Escriba el nombre de la empresa" 
                        onChange={inputValidation}
                        value={inputs.codigoPUCP}
                        name="codigoPUCP"
                        style={{"marginBottom":"10px !important"}}/>
            </div>
        </div>
    )
}