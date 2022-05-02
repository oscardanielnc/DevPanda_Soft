import React, {useState}  from "react";
import { Button, Table,Form,InputGroup,FormControl } from 'react-bootstrap';

import './AboutCompany.scss';


export default function AboutCompany (props) {
    const {isNational,setIsNacional, inputs, setInputs} = props;

    const inputValidation = e => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }
    
    const changeNational = e=>{
        setIsNacional(true);
        console.log("Cambiamos el Nacional")
    }
    const changeForeigner = e=>{
        setIsNacional(false);
        console.log("Cambiamos el Extranjero")
    }
    return (
        <div className="container chartSobreEmpresa">
             <nav className="navbar navbar-fixed-top navbar-inverse bg-inverse "style={{ backgroundColor: "#E7E7E7"}}>
                <h3 style={{"marginLeft":"15px"}}>Sobre la empresa</h3>
             </nav>
            <div className="row rows" >
                <div className="col-sm-3 subtitles">
                    <div>Tipo de empresa:</div>
                </div>
                <div className="col-sm-6 subtitles">
                    <Form>
                        <div key={`inline-radio`} className="mb-3">
                        <Form.Check
                            inline
                            label="Nacional"
                            name="group1"
                            type="radio"
                            id={`inline-radio-1`}
                            checked={isNational}
                            onChange={changeNational}
                        />
                        <Form.Check
                            inline
                            label="Extranjera"
                            name="group1"
                            type="radio"
                            id={`inline-radio-2`}
                            checked={!isNational}
                            onChange={changeForeigner}
                        />
                        </div>
                        </Form>
                </div>
                <div className="col-sm-3 subtitles">
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
                        disabled = {!isNational}
                        value={inputs.codigoPUCP}
                        name="codigoPUCP"
                        style={{"marginBottom":"8px !important"}}/>
                </div>
                <div className="col-sm-4 subtitles">
                    <Button variant="primary" style={{"marginBottom":"4px"}} disabled={!isNational}>Buscar</Button>
                </div>
                <Form.Control className="Cuadro" style={{"marginLeft": "0px"}}
                    placeholder=" " 
                    onChange={inputValidation}
                    disabled = {!isNational}
                    value={inputs.codigoPUCP}
                    name="codigoPUCP"
                    as="textarea"
                    rows={6}
                    />
            </div>
            <div className="row rows" >
                <div style={{fontWeight: "700"}}>Nombre de Empresa Extranjera</div>
            </div>
            <div className="row rows" >
                <Form.Control placeholder="Escriba el nombre de la empresa" 
                        onChange={inputValidation}
                        disabled = {isNational}
                        value={inputs.codigoPUCP}
                        name="codigoPUCP"
                        style={{"marginBottom":"10px !important"}}/>
            </div>
        </div>
    )
}