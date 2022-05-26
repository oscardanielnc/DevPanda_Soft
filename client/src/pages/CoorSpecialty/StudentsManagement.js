import React, {useState, useEffect} from "react";
import LayoutCoor from "../../layouts/LayoutCoordFACI";
import { Row, FormControl, Form, Button } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import TableEnrollment from "../../components/Tables/TableEnrollment";
import "./scss/StudentsManagement.scss";
import { selectStudentsByProcessSpecialtyApi } from "../../api/enrollment";
import ModalStudentManagement from "../../components/Modals/ModalStudentManagement";

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
    const [show, setShow] = useState(false);
    const [alumnos, setAlumnos] = useState([]);
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
        selectStudentsByProcessSpecialtyApi(user.fidEspecialidad, user.fidProceso).then(response => {
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

    return (
        <LayoutCoor>
            <div className="container">
                <Row className="rows studentsManagement__title">
                    <h1 className="studentsManagement__title-h1">Gestión de alumnos</h1>
                    <Button className="studentsManagement__title-excel"
                        variant="primary" disabled>Subir excel de matriculados
                    </Button>
                </Row>

                <div className="row rows studentManagement__actions">
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
                
                <ModalStudentManagement student={alumnos[0]} show={show} setShow={setShow} updateStudent={updateStudent}
                    newDataStudent={newDataStudent} setNewDataStudent={setNewDataStudent}/>
            </div>
        </LayoutCoor>
    )
}