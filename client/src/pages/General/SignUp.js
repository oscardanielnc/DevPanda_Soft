import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { specialtySelectAllApi } from "../../api/specialty";
import PicLogoPucp from "../../assets/svg/PicLogoPucpJunto.svg";
import { ToastContainer, toast } from 'react-toastify';
import GoogleLogin from 'react-google-login';
import './scss/SignUp.scss';
import { Link } from "react-router-dom";
import { isNumber } from "../../utils/objects";
import { signUpApi } from "../../api/auth";

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
        const basicData = response.profileObj;

        const emailDomain = basicData.email.split("@")[1];

        if(emailDomain /*emailDomain === "pucp.edu.pe"*/) {
            setData({
                ...data,
                email: basicData.email,
                firstName: basicData.givenName,
                lastName: basicData.familyName
            })
        } else {
            toast.warning("Tiene que registarse con un correo PUCP", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    }

    const register = async () => {
        const strNoLogged = "Campo autocompletado";
        if(data.email===strNoLogged || data.firstName===strNoLogged || data.lastName===strNoLogged) {
            toast.warning("Es necesario hacer un pre-registro para combrobar su correo PUCP", {
                position: "top-right",
                autoClose: 3000,
            });
        } else {
            if(data.code!=="" && data.code.length===8 && isNumber(data.code)) {
                if(data.specialty === -1) {
                    toast.warning("Debe seleccionar su especialidad", {
                        position: "top-right",
                        autoClose: 3000,
                    });
                } else {
                    const result = await signUpApi(data);
                    if(result.success) {
                        const {accessToken} = result;
                        localStorage.setItem("ACCESS_TOKEN", accessToken);
                        window.location.href = "/redirect";
                    } else {
                        toast.error(result.message, {
                            position: "top-right",
                            autoClose: 3000,
                        });
                    }
                }
            } else {
                toast.warning("Debe ingresar un código PUCP válido", {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        }
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
                    <Row>
                        <GoogleLogin
                            className="signUp__google"
                            clientId="217315516782-dimqetb06qceps0d7su07rtlmr4s1bli.apps.googleusercontent.com"
                            buttonText="Iniciar registro"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </Row>
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
                            <div className="signUp__return">
                                <span>¿Ya tienes una cuenta? Regresa al Landing Page para iniciar sesión.</span>
                                <Link to="/">Regresar</Link>
                            </div>                                                                            
                            
                            <div className="row col-sm-6 offset-3 mb-5">                            
                                <Button variant="primary" onClick={register}>
                                    Registar
                                </Button>                                                             
                            </div> 
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