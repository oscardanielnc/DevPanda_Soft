import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import LayoutSignIn from "../layouts/LayoutSignIn";

import { Form, Button, Row, Col } from "react-bootstrap";

import LogoPucp from "../asserts/img/svg/LogoPUCP.svg";
import PicPucp from "../asserts/img/svg/PicLogoPucpColorInvertido.svg";
import PicLogoPucp from "../asserts/img/svg/PicLogoPucpJunto.svg";

import './SignIn.scss';


export default function SignIn (){
    return(
        <LayoutSignIn>
            <div className="container mt-5">
                <div className="row align-items-center mx-auto mt-3">
                    <img src={PicLogoPucp} alt= "Logo" width="110" height="55"/>
                </div>

                <div className="row mt-3">
                    <div className="col-sm">
                        <h1 className="text-center">Iniciar Sesión</h1>
                    </div>
                </div>
                <div claclassNamess="row">
                    <div className="col-sm">
                        <p className="text-center">¡Bienvenido! Ingrese sus credenciales</p>
                    </div>
                </div>

                <div className="row">
                    <Form>
                        <Row className="align-items-center col-sm-8 offset-2">
                            <Row className="align-items-center col-sm-6 offset-3">
                                <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
                                    <Form.Label>Correo</Form.Label>
                                    <Form.Control type="email" placeholder="Ingresa tu correo" />
                                    <Form.Text className="text-muted">
                                    Ingresar usando tu correo PUCP
                                    </Form.Text>
                                </Form.Group>
                            </Row>
                            <Row className="align-items-center col-sm-6 offset-3">
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type="password" placeholder="Ingresa tu contraseña" />
                                </Form.Group>
                            </Row>
                            <Row className="align-items-center col-sm-6 offset-3">
                                <Col sm={6}>
                                    <Form.Check className="mb-3" type="checkbox" id="checkbox" label="Recuérdame" inline=""/>                                   
                                </Col>
                                <Col sm={6}>
                                    <Form.Label className="mb-3 ms-4" ><a href="" className="linkurl">Olvidé mi contraseña</a></Form.Label>                                
                                </Col>
                            </Row>
                            <Row className="align-items-center col-sm-6 offset-3">
                                <Button href="/" className="mb-3" variant="primary" type="submit">
                                Ingresar
                                </Button>
                            </Row>
                            <Row className="align-items-center col-sm-6 offset-4 mt-3 mb-3">                                
                                    <Form.Label className="mb-3" >No tienes una cuenta <a href="/signup" className="linkurl">Regístrate</a></Form.Label>                                
                            </Row>
                        </Row>
                    </Form>
                </div>
            </div>
        </LayoutSignIn>
    );
}