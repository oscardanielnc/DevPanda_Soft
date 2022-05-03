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