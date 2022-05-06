import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import LayoutSignIn from "../layouts/LayoutSignIn";

import { Form, Button, Row, Col,DropdownButton,Dropdown } from "react-bootstrap";

import PicLogoPucp from "../asserts/img/svg/PicLogoPucpJunto.svg";

import './SignUp.scss';

export default function SignUp (){
    return(       
        <div className="container">
            <Row className="row align-items-center mx-auto mt-3">                
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
            </Row>
        </div>
    );
}