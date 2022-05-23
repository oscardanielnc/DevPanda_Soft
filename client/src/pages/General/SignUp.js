import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { specialtySelectAllApi } from "../../api/specialty";
import PicLogoPucp from "../../assets/svg/PicLogoPucpJunto.svg";
import { ToastContainer, toast } from 'react-toastify';
import GoogleLogin from 'react-google-login';
import './scss/SignUp.scss';

const dataDummy = {
    firstName: "Campo autocompletado",
    lastName: "Campo autocompletado",
    email: "Campo autocompletado",
    specialty: -1,
    code: "",
}

export default function SignUp (){
    const [data, setData] = useState(dataDummy);
    const [specialties, setSpecialties] = useState([]);
    useEffect(()=> {
        const fetchData = async () => {
            const result = await specialtySelectAllApi();
            if(result.success) {
                setSpecialties(result.specialties)
            }
        }
        fetchData()
    }, [setSpecialties])
    console.log(data)

    const handleCode = e => {
        setData({
            ...data,
            code: e.target.value
        })
    }
    const handleSelect = e => {
        setData({
            ...data,
            specialty: Number(e.target.value)
        })
    }
    const responseGoogle = async (response) => {
        const basicData = response.profileObj.email;

        console.log(basicData)
    }

    return(       
        <div className="signUp">
            <div className="container signUp-container">
                <Col className="col-sm-6">
                    <Row>
                        <img src={PicLogoPucp} alt="Logo PUCP" className="signUp__logo"/>
                    </Row>
                    <div className="signUp__title">
                        <Row><h1>Registrar</h1></Row>
                        <Row><h6>Inicia el registro con tu correo PUCP</h6></Row>
                    </div>
                    <GoogleLogin
                        clientId="217315516782-dimqetb06qceps0d7su07rtlmr4s1bli.apps.googleusercontent.com"
                        buttonText="Iniciar sesión"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                    <ToastContainer /> 
                    <Form>
                        <InputLabel name="Nombres" value={data.firstName} />
                        <InputLabel name="Apellidos" value={data.lastName} />
                        <InputLabel name="Correo" value={data.email} />

                        <Form.Group className="signUp__formGroup" controlId="formBasicName">
                            <Form.Label className="signUp__formGroup-label">
                                Código PUCP
                                <strong>  *</strong>
                            </Form.Label>
                            <Form.Control type="text" value={data.code} 
                                onChange={handleCode} placeholder="Ingrese su código PUCP"/>
                        </Form.Group>

                        <Form.Group className="signUp__formGroup" controlId="formBasicName">
                            <Form.Label className="signUp__formGroup-label">
                                Especialidad
                                <strong>  *</strong>
                            </Form.Label>
                            <Form.Select className="select" defaultValue={data.specialty} onChange={handleSelect} style={{margin: 0}}>
                                <option value={-1}>Seleccionar especialidad</option>
                                {
                                    specialties.map(element => (
                                        <option value={element.idEspecialidad} 
                                            key={element.idEspecialidad}>{element.nombreEsp}
                                        </option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Col>
            </div>
        </div>
    );
}

function InputLabel({name, value}) {
    return (
        <Form.Group className="signUp__formGroup" controlId="formBasicName">
            <Form.Label className="signUp__formGroup-label">
                {name}
                <strong>  *</strong>
            </Form.Label>
            <Form.Control type="text" value={value} disabled/>
        </Form.Group> 
    )
}


            {/* <Row className="row align-items-center mx-auto mt-3">                
                <img src={PicLogoPucp} alt= "Logo" width="110" height="55"/>
            </Row>
            
            <div className="row mt-3">
                <div>
                    <h1 className="text-center">Registrar</h1>
                </div>
            </div>

            <div className="row">
                <div>
                    <p className="text-center">Ingresa tus datos para crear una cuenta</p>
                </div>
            </div>

            <Row className="row mt-3">                
                <Form>
                    <Row className="col-sm-8 offset-2 ">
                        
                        <Col className="col-sm-6 offset-3">
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Nombres</Form.Label>
                                <Form.Control type="text" placeholder="Juan Roberto" />
                                <Form.Text className="text-muted">
                                Ingresa tus nombres completos
                                </Form.Text>
                            </Form.Group>                        
                        </Col>
                        
                        <div className="col-sm-6 offset-3">
                            <Form.Group className="mb-3" controlId="formBasicLastNameF">
                                <Form.Label>Apellido Paterno</Form.Label>
                                <Form.Control type="text" placeholder="García" />
                            </Form.Group>                            
                        </div>    
                        <div className="col-sm-6 offset-3">
                            <Form.Group className="mb-3" controlId="formBasicLastNameM">
                                <Form.Label>Apellido Materno</Form.Label>
                                <Form.Control type="text" placeholder="Pérez" />
                            </Form.Group>
                        </div>

                        <div className="col-sm-6 offset-3">
                            <Form.Group className="mb-3" controlId="formBasicCodePucp">
                                <Form.Label>Código PUCP</Form.Label>
                                <Form.Control type="text" placeholder="20174562" />
                            </Form.Group>
                        </div>
                        <div className="col-sm-6 offset-3 d-grid">
                            <Form.Group className="mb-3" controlId="formDropDownEsp" >
                                <Form.Label>Especialidad</Form.Label>
                                <DropdownButton id="dropdown-basic-button" title="Seleccionar Especialidad">
                                    <Dropdown.Item href="#/action-1">Seleccionar Especialidad</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Ing. Informática</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Ing. Industrial</Dropdown.Item>
                                    <Dropdown.Item href="#/action-4">Ing. de Telecomunicaciones</Dropdown.Item>
                                </DropdownButton>
                            </Form.Group>
                        </div>
                        <div className="col-sm-6 offset-3">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Correo</Form.Label>
                                <Form.Control type="email" placeholder="Ingresa tu correo" />
                                <Form.Text className="text-muted">
                                Ingresar usando tu correo PUCP
                                </Form.Text>
                            </Form.Group>
                        </div>
                        <div className="col-sm-6 offset-3">
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password" placeholder="Ingresa tu contraseña" />
                            </Form.Group>
                        </div>
                        
                        <Row className="col-sm-6 offset-4">
                            <Form.Label className="mb-3" >¿Ya tienes una cuenta? <a href="/signin" className="registrate">Inicia Sesión</a></Form.Label>
                        </Row>                                                                            
                        
                        <div className="row col-sm-6 offset-3 mb-5">                            
                            <Button href="/" variant="primary" type="submit">
                                Empieza ya
                            </Button>                                                             
                        </div>                        
                    </Row>
                </Form>
            </Row> */}