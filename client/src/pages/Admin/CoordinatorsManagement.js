import React, {useState, useEffect} from "react";
import LayoutAdministrative from "../../layouts/LayoutAdministrative";
import { Row, FormControl, Form, Button } from "react-bootstrap";
import ModalCoordinators from "../../components/Modals/ModalCoordinators";
import TableCoordSups from "../../components/Tables/TableCoordSups";
import { specialtySelectAllApi } from "../../api/specialty";
import { getCoordinatorsApi } from "../../api/users";

let textFilter = ""
let textSelect = "-1";

const emptyCoord = {
    idPersona: -1,
    fidEspecialidad: -1,
    nombreEsp: "",
    nombres: "",
    apellidos: "",
    correo: "",
    activo: 1,
    estado: '1'
}

export default function CoordinatorsManagement () {
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState("update");
    const [coordinators, setCoordinators] = useState([]);
    const [specialties, setSpecialties] = useState([]);
    const [newDataCoord, setNewDataCoord] = useState(emptyCoord);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(()=> {
        const fetchData = async () => {
            const result = await specialtySelectAllApi();
            if(result.success) {
                setSpecialties(result.specialties)
            }
        }
        fetchData();
    }, [setSpecialties])

    useEffect(()=> {
        getCoordinatorsApi().then(response => {
            if(response.success) {
                setCoordinators(response.data);
                setFilteredData(response.data);
                }
            })
    }, [setCoordinators])

    const filter = e => {
        const text = e.target.value.toUpperCase();
        
        if(e.target.name === "select") textSelect = text
        else {
            textFilter = text
        }
        
        setFilteredData(coordinators.filter(obj => {
            const nombre = `${obj.nombres} ${obj.apellidos}`
            if(textSelect === "-1") {
                return  nombre.toUpperCase().includes(textFilter)
            }
            return `${obj.fidEspecialidad}` === textSelect && nombre.toUpperCase().includes(textFilter)
       }))
    }

    const handleClickAdd = () => {
        setMode("insert");
        setNewDataCoord(emptyCoord);
        setShow(true);
    }

    return (
        <LayoutAdministrative>
            <div className="container">
                <Row className="rows studentsManagement__title">
                    <h1 className="studentsManagement__title-h1">Gestión de Coordinadores</h1>
                    <Button className="studentsManagement__title-excel"
                        variant="primary" onClick={handleClickAdd}>
                        Agregar
                    </Button>
                </Row>

                <div className="row rows studentManagement__actions">
                    <FormControl
                        placeholder={"Filtrar coordinators"}
                        onChange={filter}
                        name="filter"
                        style={{width: "80%"}}
                    />
                        
                    <Form.Select className="studentManagement__select form-select" style={{width: "20%"}} onChange={filter} name="select">
                        <option value={"-1"}>Todos</option>
                        {specialties.length > 0 &&
                            specialties.map((element, index) => (
                                <option value={`${element.idEspecialidad}`} 
                                    key={index}>{element.nombreEsp}
                                </option>
                            ))
                        }
                    </Form.Select>
                </div>

                <Row className="rows">
                    <TableCoordSups rows={filteredData} setShow={setShow} setNewData={setNewDataCoord} 
                        setMode={setMode} showTo="coordinadores"/>
                </Row>
                
                <ModalCoordinators show={show} setShow={setShow} mode={mode} setCoordinators={setCoordinators} coordinators={coordinators}
                    newData={newDataCoord} setNewData={setNewDataCoord} specialties={specialties} setFilteredData={setFilteredData}/>
            </div>
        </LayoutAdministrative>
    )
}