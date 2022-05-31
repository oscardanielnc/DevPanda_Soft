import React, { useState, useEffect } from "react";
import { specialtySelectAllApi } from "../../api/specialty";
import TableSpecialtyManagement from "../../components/Tables/TableSpecialtyManagement";
import LayoutAdministrative from "../../layouts/LayoutAdministrative";
import './scss/SpecialtyManagement.scss';
import FilterData from "../../components/Filters/FilterData";
import { Button } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import ModalSpecialty from "../../components/Modals/ModalSpecialty";

const empty = {
    idEspecialidad: null,
    nombreEsp: "",
    codigo: "",
    fidCoordVigente: null,
    activo: 1
}

export default function SpecialtyManagement () {
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState("update");
    const [newData, setNewData] = useState(empty);
    const [especialidades, setEspecialidades] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        specialtySelectAllApi().then(response => {
            if(response.success) {
                setEspecialidades(response.specialties);
                setFilteredData(response.specialties)
            }
        })
    }, [setEspecialidades])

    const handleClickAdd = () => {
        setMode("insert");
        setNewData(empty);
        setShow(true);
    }

    return (
        <LayoutAdministrative>
            <ToastContainer />  
            <div className="container principal">
                <div className="row rows specialtiesManegement__title">
                    <h1>Gestión de especialidades</h1>
                </div>
                <div className="row rows specialtiesManegement__actions">
                    <FilterData placeholder="Filtar especilidades" 
                        originalData={especialidades} 
                        setFilteredData={setFilteredData}
                        fnGetvalue={obj => obj.nombreEsp}
                    />
                    <Button style={{width: "20%"}}
                        variant="primary" onClick={handleClickAdd}>
                        Agregar
                    </Button>
                </div>
                <div className="row rows">
                    <TableSpecialtyManagement rows={filteredData} setShow={setShow} setNewData={setNewData} 
                        setMode={setMode}/>
                </div>
                <ModalSpecialty show={show} setShow={setShow} mode={mode} setFilteredData={setFilteredData} setEspecialidades={setEspecialidades}
                    newData={newData} setNewData={setNewData} especialidades={especialidades}/>
            </div>
        </LayoutAdministrative>
    )
}

