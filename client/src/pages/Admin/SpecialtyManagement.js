import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { specialtySelectAllApi } from "../../api/specialty";
import TableSpecialtyManagement from "../../components/Tables/TableSpecialtyManagement";
import LayoutAdministrative from "../../layouts/LayoutAdministrative";
import './scss/SpecialtyManagement.scss';
import useAuth from "../../hooks/useAuth";
import FilterData from "../../components/Filters/FilterData";


export default function SpecialtyManagement () {
    const [especialidades, setEspecialidades] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    //console.log(useAuth()); // el useAuth() nos permite acceder a la informacion del usuario desde cualquier lugar. Por ahora ese objeto esta hardcodeado.

    useEffect(() => {
        specialtySelectAllApi().then(response => {
            if(response.success) {
                setEspecialidades(response.specialties);
                setFilteredData(response.specialties)
            }
        })
    }, [setEspecialidades])

    return (
        <LayoutAdministrative>
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
                    <Link className="btn btn-primary" style={{"width":"100px"}} to="./agregarEspecialidad">Agregar</Link>
                </div>
                <div className="row rows">
                    <TableSpecialtyManagement rows={filteredData}/>
                </div>

            </div>
        </LayoutAdministrative>
    )
}

