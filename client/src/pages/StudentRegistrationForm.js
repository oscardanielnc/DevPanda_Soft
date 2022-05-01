import React, {useState} from "react";
import LayoutBasic from "../layouts/LayoutBasic";
import {Form,Button,Row,Col,Alert} from 'react-bootstrap';
import { specialtyInsertApi } from "../api/specialty";
import GeneralData from "../components/Charts/GeneralData";
import AboutCompany from "../components/Charts/AboutCompany";
import './StudentRegistrationForm.scss';
import toastr from 'toastr';
import AboutJob from "../components/Charts/AboutJob";

function Example() {
    const [show, setShow] = useState(false);
  
    return (
      <Row>
        <Col xs={6}>
          {/* <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Bootstrap</strong>
              <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
          </Toast> */}
        </Col>
        <Col xs={6}>
          <Button onClick={() => setShow(true)}>Show Toast</Button>
        </Col>
      </Row>
    );
}

export default function StudentRegistrationForm () {
    var result=false;
    var botonPresionado=false;
    var tipo=null;
    const [datos, setDatos] = useState([]);
    const insert = async e => {
        e.preventDefault()
        
        //const result= await registrationFormInsertApi(inputs)
        // botonPresionado=true;
        // console.log("Valor de botonPresionado: "+botonPresionado);
        // if(!result){
        //     tipo="danger";
        // }else{
        //     tipo="success";
        // }
        // console.log("Valor de result: "+result);
        //new Toast('info', 'toast-top-full-width', 'toast full width')
        toastr.success('We do have the Kapua suite available.', 'Turtle Bay Resort', {timeOut: 5000})
        console.log(toastr)
        debugger

        // toastr["success"]("Jeison", "Hola")
        // toastr.options = {
        //     "close": false,
        //     "debug": false,
        //     "newestOnTop": false,
        //     "progressBar": false,
        //     "positionClass": "toast-top-right",
        //     "preventDuplicates": false,
        //     "onclick": null,
        //     "showDuration": "300",
        //     "hideDuration": "1000",
        //     "timeOut": "5000",
        //     "extendedTimeOut": "1000",
        //     "showEasing": "swing",
        //     "hideEasing": "linear",
        //     "showMethod": "fadeIn",
        //     "hideMethod": "fadeOut"
        // }
    }
    return (
        <LayoutBasic>
            <div className="container principal" style={{"padding":"1px"}}>
                <div className="row rows" style={{textAlign: "left"}}>
                    <h1>Ficha de Inscripción</h1>
                </div>
                <div className="row rows" style={{textAlign: "left"}}>
                    <p>
                    Aquí deberá de rellenar la información solicitada más abajo para poder continuar con el proceso. Una vez que la complete, esta será revisada para su aprobación.
                    </p>
                </div>
                <div className="row rows">
                    <p>Aqui va el componente de entrega</p>
                </div>
                <div className="row rows" style={{textAlign: "left",marginBottom:"0px"}}>
                    <h2 style={{marginBottom:"0px"}}>Datos por rellenar</h2>
                </div>
                <div className="row rows">
                <GeneralData data={datos}/>   
                    {/*<TableSpecialtyManagement rows={especialidades}/>*/}
                </div>
                <div className="row rows">
                    <AboutCompany data={datos}/>
                    {/*<TableSpecialtyManagement rows={especialidades}/>*/}
                </div>
                <div className="row rows">
                    <AboutJob data={datos}/>
                    {/*<TableSpecialtyManagement rows={especialidades}/>*/}
                </div>
                <div className="row rows">
                    <p>Acá va el componente de Sobre duracion de la PSP</p>
                    {/*<TableSpecialtyManagement rows={especialidades}/>*/}
                </div>
                <div className="row rows">
                    <p>Acá va el componente de Sobre el Jefe Directo</p>
                    {/*<TableSpecialtyManagement rows={especialidades}/>*/}
                </div>
                <div className="row rows">
                    <p>Acá va el componente de Sobre el Jefe Directo</p>
                    {/*<TableSpecialtyManagement rows={especialidades}/>*/}
                </div>
                <div className="row rows">
                    <div className="col-sm-4">
                        <Button className="btn btn-primary" onClick={insert}>Enviar</Button>
                        {
                            botonPresionado?<Alert key={tipo} variant={tipo}>
                                 This is a tipo alert—check it out!
                                </Alert>:
                            <p></p>
                        }
                    </div>
                    <div className="col-sm-8">

                    </div>
                    
                </div>
            </div>
        </LayoutBasic>
    )

}
