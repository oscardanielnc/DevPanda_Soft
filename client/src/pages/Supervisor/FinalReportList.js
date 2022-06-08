import React, { useState, useEffect } from "react";
import LayoutAdministrative from '../../layouts/LayoutAdministrative';
import useAuth from "../../hooks/useAuth";
import {Form, FormControl} from 'react-bootstrap';
import useWindowDimensions from "../../hooks/useWindowResize";
import TableFinalReport from "../../components/Tables/TableFinalReport";
import "./scss/FinalReportList.scss"
let textFilter = ""
let textSelect = "-1"
const dataDummy = [    
    {
        idAlumno : "1",
        nombreAlumno: "Carlos Lescano",
        especialidad: "Ing. Informática",
        estado: "Aprobado"
    },
    {
        idAlumno : "2",
        nombreAlumno: "Gianfranco Montoya",
        especialidad: "Ing. Industrial",
        estado: "Aprobado"
    },
    {
        idAlumno : "3",
        nombreAlumno: "Oscar Navarro",
        especialidad: "Ing. Telecomunicaciones",
        estado: "Sin Calificar"
    }    
]
export default function FinalRepprtList() {
    const {user} = useAuth();
    const [alumnos, setAlumnos] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    
    // useEffect(()=> {
    //     const fetchData = async () => {
    //         getListStudentFinalReport(user.fidEspecialidad).then(response => {
    //             console.log(response)            
    //             if(response.success===true) {
    //                 console.log("En el success el response es: ",response);
    //                 setAlumnos(response.data);
    //                 setFilteredData(response.data);
    //             }

    //         })
    //     }
    //     fetchData()
    // }, [setAlumnos])

    // const filter = e => {
    //     const text = e.target.value.toUpperCase();
        
    //     if(e.target.name === "select") textSelect = text
    //     else textFilter = text
        
    //     setFilteredData(alumnos.filter(obj => {
    //         //console.log('textFilter', textFilter)
    //         //console.log('textSelect', textSelect)
    //         if(textSelect === "-1") {
    //             return  obj.nombreAlumno.toUpperCase().includes(textFilter)
    //         }
    //         return obj.estado.toUpperCase() === textSelect && obj.nombreAlumno.toUpperCase().includes(textFilter)
    //    }))
    //}

    // const Component = () =>{
    //     const {height,width} = useWindowDimensions();
    // }

    const states = [
        {
            name: "Aprobado",
            value: "Aprobado"
        },
        {
            name: "Rechazado",
            value: "Rechazado"
        },
        {
            name: "Sin revisar",
            value: "Sin revisar"
        }
    ]
    return(
        <LayoutAdministrative>
            
            <div className="container principalFinalReport">
                <div className="row titulo">
                    <h1>Lista de Informes Finales</h1>
                </div>
                <div className="row normalrow">
                    Buscar por Nombre, Apellidos o Estado
                </div>
                {/* <div className="row rows studentManagement__actions">
                    <FormControl
                        placeholder={"Filtrar alumnos"}
                        onChange={filter}
                        name="filter"
                        style={{width: "80%"}}
                    />
                        
                    <Form.Select className="studentManagement__select form-select" style={{width: "20%"}} onChange={filter} name="select">
                        <option value="-1">Estado</option>
                        {
                            states.map((element, index) => (
                                <option value={element.value} 
                                    key={index}>{element.name}
                                </option>
                            ))
                        }
                    </Form.Select>
                    
                </div> */}
                <div className="row rows">
                    <TableFinalReport rows={dataDummy}/>
                </div> 

            </div>
        </LayoutAdministrative>
    )
    
}