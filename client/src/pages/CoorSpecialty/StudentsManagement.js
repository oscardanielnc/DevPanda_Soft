import React, {useState, useEffect} from "react";
import LayoutAdministrative from "../../layouts/LayoutAdministrative";
import { Row, FormControl, Form, Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import TableEnrollment from "../../components/Tables/TableEnrollment";
import "./scss/StudentsManagement.scss";
import { selectStudentsByProcessSpecialtyApi } from "../../api/enrollment";
import ModalStudentManagement from "../../components/Modals/ModalStudentManagement";
import ModalExcel from "../../components/Modals/ModalExcel";
import { toast, ToastContainer } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const states = [
    {
        name: "Matriculado",
        value: 1
    },
    {
        name: "No Matriculado",
        value: 0
    }
]
// const dataDummy = [
//     {
//         idPersona: 1,
//         nombres: "Oscar",
//         apellidos: "Navarro",
//         correo: "algo@pucp.edu.pe",
//         estadoMatriculado: 0,
//         codigo: "20186008",
//         grupoAsignado: null,
//         estado: 'C'
//     },
//     {
//         idPersona: 2,
//         nombres: "Gianfranco",
//         apellidos: "Montoya",
//         correo: "algo@pucp.edu.pe",
//         estadoMatriculado: 1,
//         codigo: "20183899",
//         grupoAsignado: null,
//         estado: 'C'
//     },
//     {
//         idPersona: 3, ///
//         nombres: "Carlos",
//         apellidos: "Lescano",
//         correo: "algo@pucp.edu.pe",
//         estadoMatriculado: 0, ///
//         codigo: "98292002", ///
//         grupoAsignado: null, //
//         estado: 'C' //
//     },
//     {
//         idPersona: 4,
//         nombres: "Christian",
//         apellidos: "Ramirez",
//         correo: "algo@pucp.edu.pe",
//         estadoMatriculado: 1,
//         codigo: "28272929",
//         grupoAsignado: 2,
//         estado: 'C'
//     },
//     {
//         idPersona: 5,
//         nombres: "Jeison",
//         apellidos: "Romero",
//         correo: "algo@pucp.edu.pe",
//         estadoMatriculado: 0,
//         codigo: "92929291",
//         grupoAsignado: 1,
//         estado: 'C'
//     },
//     {
//         idPersona: 6,
//         nombres: "Marcelo",
//         apellidos: "Hurtado",
//         correo: "algo@pucp.edu.pe",
//         estadoMatriculado: 0,
//         codigo: "81929920",
//         grupoAsignado: 1,
//         estado: 'C'
//     }
// ]
let textFilter = ""
let textSelect = "-1"

export default function StudentsManagement () {
    const {user} = useAuth();
    const idProcess = user.fidProceso;
    const [show, setShow] = useState(false);
    const [showExcel, setShowExcel] = useState(false);
    const [alumnos, setAlumnos] = useState([]);
    const [excel, setExcel] = useState([]);
    const [newDataStudent, setNewDataStudent] = useState({
        idPersona: 0,
        nombres: "",
        apellidos: "",
        correo: "",
        estadoMatriculado: 0,
        codigo: "",
        grupoAsignado: null,
        estado: 'C'
    });
    const [filteredData, setFilteredData] = useState([]);

    useEffect(()=> {
        selectStudentsByProcessSpecialtyApi(idProcess).then(response => {
            if(response.success) {
                setAlumnos(response.students);
                setFilteredData(response.students);
            }
        })
    }, [setAlumnos])

    const filter = e => {
        console.log(e)
        const text = e.target.value.toUpperCase();
        
        if(e.target.name === "select") textSelect = text
        else {
            textFilter = text
        }
        
        setFilteredData(alumnos.filter(obj => {
            const nombreAlumno = `${obj.nombres} ${obj.apellidos}`
            if(textSelect === "-1") {
                return  nombreAlumno.toUpperCase().includes(textFilter)
            }
            return `${obj.estadoMatriculado}` === textSelect && nombreAlumno.toUpperCase().includes(textFilter)
       }))
    }

    const updateStudent = () => {
        setShow(false);
    }
    const uploadExcel = input => {
        const files = input.target.files;
        if(files.length == 0) return;
        const file = files[0];
        const reader = new FileReader();

        reader.onload= function() {
            const text = this.result; //texto
            const emails = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
            if(!emails) {
                toast.warning("Necesita subir un archivo de texto que contenga los correos de los estudiantes.", {
                    position: "top-right",
                    autoClose: 3000,
                });
            } else setExcel(emails);
        };
        reader.onerror = (e) => alert(e.target.error.name);
        reader.readAsText(file);
    }
    const matchExcel = () => {
        setShowExcel(true);
    }
    const trashCan = () => {
        document.getElementById("studentsManagement_excel").value = "";
        setExcel([]);
    }

    return (
        <LayoutAdministrative>
            <ToastContainer />
            <div className="container">
                <Row className="rows studentsManagement">
                    <h1>Gestión de alumnos</h1>
                </Row>
                <Row className="rows studentsManagement__excel">
                    <Form.Group  className="mb-3 studentsManagement__excel-title">
                        <Form.Label>Subir excel de matriculados</Form.Label>
                        <div className="studentsManagement__excel-input">
                            <Form.Control type="file" size="sm" onChange={uploadExcel} id="studentsManagement_excel"/>
                            <OverlayTrigger overlay={<Tooltip>Limpiar documento subido</Tooltip>}>
                                <Button className="studentsManagement__excel-input-trash" onClick={trashCan}
                                    variant="primary"><i className="bi bi-trash"></i>
                                </Button>
                            </OverlayTrigger>
                        </div>
                    </Form.Group>
                    <Button className="studentsManagement__excel-btn" onClick={matchExcel}
                        variant="primary" disabled={excel.length===0}>Comprobar
                    </Button>
                </Row>

                <div className="row rows studentManagement__actions">
                    <h3>Alumnos del proceso actual</h3>
                    <FormControl
                        placeholder={"Filtrar alumnos"}
                        onChange={filter}
                        name="filter"
                        style={{width: "80%"}}
                    />
                        
                    <Form.Select className="studentManagement__select form-select" style={{width: "20%"}} onChange={filter} name="select">
                        <option value={"-1"}>Todos</option>
                        {
                            states.map((element, index) => (
                                <option value={`${element.value}`} 
                                    key={index}>{element.name}
                                </option>
                            ))
                        }
                    </Form.Select>
                </div>

                <Row className="rows">
                    <TableEnrollment rows={filteredData} setShow={setShow} setNewDataStudent={setNewDataStudent}/>
                </Row>
                
                <ModalStudentManagement show={show} setShow={setShow} updateStudent={updateStudent}
                    newDataStudent={newDataStudent} setNewDataStudent={setNewDataStudent}/>
                <ModalExcel show={showExcel} setShow={setShowExcel} students={alumnos} excel={excel} idProcess={idProcess}/>
            </div>
        </LayoutAdministrative>
    )
}