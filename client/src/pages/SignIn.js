import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GoogleLogin from 'react-google-login';
import LayoutSignIn from "../layouts/LayoutSignIn";
import { Form, Button, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import LogoPucp from "../asserts/img/svg/LogoPUCP.svg";
import PicPucp from "../asserts/img/svg/PicLogoPucpColorInvertido.svg";
import PicLogoPucp from "../asserts/img/svg/PicLogoPucpJunto.svg";

import './SignIn.scss';
import { signInApi } from "../api/auth";


export default function SignIn (){
    
    const responseGoogle = async (response) => {
        console.log(response)
        const result = await signInApi(response.profileObj.email)

        if(result.success) {
            const {accessToken} = result;
            localStorage.setItem("ACCESS_TOKEN", accessToken)
            window.location.href = "/"
        } else {
            toast.error('Fallo de autenticación!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }


    return(
        <LayoutSignIn>
            <ToastContainer />
            <div className="container main-sing">
                <div className="sign-in">
                    <div className="row align-items-center">
                        <img src={PicLogoPucp} alt= "Logo" width="110" height="55"/>
                    </div>

                    <div className="row">
                        <h1 className="text-center">Iniciar Sesión</h1>
                        <p className="text-center">¡Bienvenido! Ingrese sus credenciales</p>
                    </div>

                    <Form>
                        <Row className="align-items-center">
                            <Row className="rows align-items-center">
                                <Form.Group className="" controlId="formBasicEmail">
                                    <Form.Label>Correo</Form.Label>
                                    <Form.Control type="email" placeholder="Ingresa tu correo" />
                                    <Form.Text className="text-muted">
                                    Ingresar usando tu correo PUCP
                                    </Form.Text>
                                </Form.Group>
                            </Row>
                            <Row className="rows align-items-center">
                                <Form.Group className="" controlId="formBasicPassword">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type="password" placeholder="Ingresa tu contraseña" />
                                </Form.Group>
                            </Row>
                            <Row className="rows align-items-center">
                                <Col sm={6}>
                                    <Form.Check className="" type="checkbox" id="checkbox" label="Recuérdame" inline=""/>                                   
                                </Col>
                                <Col sm={6}>
                                    <Form.Label className="" ><a href="" className="linkurl">Olvidé mi contraseña</a></Form.Label>                                
                                </Col>
                            </Row>
                            <Row className="rows align-items-center">
                                <Link className="btn btn-primary" to = "/">
                                    Ingresar
                                </Link>
                            </Row>
                            <Row className="rows align-items-center">
                            <GoogleLogin
                                clientId="217315516782-dimqetb06qceps0d7su07rtlmr4s1bli.apps.googleusercontent.com"
                                buttonText="Iniciar con Google"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                            </Row>
                            <Row className="rows align-items-center offset-4 ">                                
                                    <Form.Label className="" >No tienes una cuenta <a href="/signup" className="linkurl">Regístrate</a></Form.Label>                                
                            </Row>
                        </Row>
                    </Form>
                </div>
            </div>
        </LayoutSignIn>
    );
}