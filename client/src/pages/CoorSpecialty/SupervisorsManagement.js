import React, {useState, useEffect} from "react";
import LayoutAdministrative from "../../layouts/LayoutAdministrative";
import { Row, FormControl, Form, Button } from "react-bootstrap";
import TableCoordSups from "../../components/Tables/TableCoordSups";
import { getSupervisorsApi } from "../../api/users";
import FilterData from "../../components/Filters/FilterData";
import ModalSupervisor from "../../components/Modals/ModalSupervisor";
import useAuth from "../../hooks/useAuth";


const emptySup = {
    idPersona: -1,
    nombres: "",
    apellidos: "",
    correo: "",
    activo: 1,
    estado: '1'
}

export default function SupervisorsManagement () {
    const idSpecialty = useAuth().user.fidEspecialidad;
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState("update");
    const [supervisors, setSupervisors] = useState([]);
    const [newDataSup, setNewDataSup] = useState(emptySup);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(()=> {
        getSupervisorsApi(idSpecialty).then(response => {
            if(response.success) {
                setSupervisors(response.data);
                setFilteredData(response.data);
                }
            })
    }, [setSupervisors])


    const handleClickAdd = () => {
        setMode("insert");
        setNewDataSup(emptySup);
        setShow(true);
    }

    return (
        <LayoutAdministrative>
            <div className="container">
                <Row className="rows studentsManagement__title">
                    <h1 className="studentsManagement__title-h1">Gestión de Supervisores</h1>
                    <Button className="studentsManagement__title-excel"
                        variant="primary" onClick={handleClickAdd}>
                        Agregar
                    </Button>
                </Row>

                <FilterData originalData={supervisors} setFilteredData={setFilteredData}
                    placeholder="Filtar supervisores" fnGetvalue={obj => `${obj.nombres} ${obj.apellidos}`}/>

                <Row className="rows">
                    <TableCoordSups rows={filteredData} setShow={setShow} setNewData={setNewDataSup} 
                        setMode={setMode} showTo="supervisores"/>
                </Row>
                
                <ModalSupervisor show={show} setShow={setShow} mode={mode} setSupervisors={setSupervisors} supervisors={supervisors}
                    newData={newDataSup} setNewData={setNewDataSup} setFilteredData={setFilteredData} idSpecialty={idSpecialty}/>
            </div>
        </LayoutAdministrative>
    )
}