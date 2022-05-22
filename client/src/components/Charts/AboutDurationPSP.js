import React, {useState}  from "react";
import { Button, Table,Form,InputGroup,FormControl } from 'react-bootstrap';
import DatePicker,{ registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './AboutDurationPSP.scss';
import es from 'date-fns/locale/es';


registerLocale('es', es);


export default function AboutDurationPSP ({data, setData, notgrabado}) {
    const {aboutPSP} = data;

    const handleChangeText = (e) => {
        if(e.target.name==="dailyHours"){
            if(e.target.valueAsNumber>=0){
                e.target.classList.add("success");
                setData({
                    ...data,
                    aboutPSP: {
                        ...data.aboutPSP,
                        [e.target.name]: e.target.valueAsNumber
                    }
                })
            }else{
                e.target.value=data.aboutPSP.dailyHours;
                e.target.valueAsNumber=Number(data.aboutPSP.dailyHours);
                if(e.target.valueAsNumber>=0){
                    e.target.classList.add("success");
                }else{
                    e.target.classList.add("error");
                }
            }
        }else{
            if(e.target.name==="weekHours"){
                if(e.target.valueAsNumber>=0){
                    e.target.classList.add("success");
                    setData({
                        ...data,
                        aboutPSP: {
                            ...data.aboutPSP,
                            [e.target.name]: e.target.valueAsNumber
                        }
                    })
                }else{
                    e.target.value=data.aboutPSP.weekHours;
                    e.target.valueAsNumber=Number(data.aboutPSP.weekHours);
                    if(e.target.valueAsNumber>=0){
                        e.target.classList.add("success");
                    }else{
                        e.target.classList.add("error");
                    }
                }
            }else{
                setData({
                    ...data,
                    aboutPSP: {
                        ...data.aboutPSP,
                        [e.target.name]: e.target.value
                    }
                })
            }
        }
    }

    const handleChangeDate = (e, name) => {
        const day = (e.getDate()<10)? `0${e.getDate()}`: `${e.getDate()}`;
        const month = (e.getMonth()<10)? `0${e.getMonth()}`: `${e.getMonth()}`;
        const year = (e.getFullYear());
        const date = `${day}-${month}-${year}`;
        if(name==="dateEnd"){
            const fechasIni = data.aboutPSP.dateStart.split('-');
            const fechasFin = date.split('-');
            const dayIni=Number(fechasIni[0]);
            const monthIni=Number(fechasIni[1]);
            const yearIni=Number(fechasIni[2]);
            const dayFin=Number(fechasFin[0]);
            const monthFin=Number(fechasFin[1]);
            const yearFin=Number(fechasFin[2]);
            const fechaFinNumber=yearFin*10000+monthFin*100+dayFin;
            const fechaIniNumber=yearIni*10000+monthIni*100+dayIni;
            if(fechaIniNumber < fechaFinNumber){
                setData({
                    ...data,
                    aboutPSP: {
                        ...data.aboutPSP,
                        [name]: date
                    }
                })
            }
        }else{
            setData({
                ...data,
                aboutPSP: {
                    ...data.aboutPSP,
                    [name]: date
                }
            })
        }
    }

    const handleChangeOthers = (e) => {
        const newOthers = data.others.map(elem => {
            if(elem.nombreCampo === e.target.name)
                return {
                    idCampoProceso:elem.idCampoProceso,
                    idCampoLlenado:elem.idCampoLlenado,
                    nombreCampo: e.target.name,
                    seccion: "Sobre la PSP",
                    flag: elem.flag,
                    valorAlumno: e.target.value   
                }
            return elem;
        })
        setData({
            ...data,
            others: newOthers
        })
    }

    return (
        aboutPSP && <div className="container chartAboutDurationPSP">
             <nav className="navbar navbar-fixed-top navbar-inverse bg-inverse "style={{ backgroundColor: "#E7E7E7"}}>
                <h3 style={{"marginLeft":"15px"}}>Sobre la duración del PSP</h3>
             </nav>
            <div className="row rows">
                <div className="col-sm-6 subtitles" >
                    <div>Fecha de inicio</div>
                    <DatePicker
                        onChange={(e)=> handleChangeDate(e, "dateStart")}
                        locale="es"
                        disabled={notgrabado}
                        className="picker1"
                        dateFormat="dd-MM-yyyy"
                        name="dateStart"
                        value={aboutPSP.dateStart}
                    />
                </div>
                <div className="col-sm-6 subtitles">
                    <div>Fecha de fin</div>
                    <DatePicker
                        onChange={(e)=> handleChangeDate(e, "dateEnd")}
                        locale="es"
                        disabled={notgrabado}
                        className="picker2"
                        dateFormat="dd-MM-yyyy"
                        name="dateEnd"
                        value={aboutPSP.dateEnd}
                    />
                </div>
            </div>
            <div className="row rows">
                <div className="col-sm-6 columnas">
                    <div className="row filas">
                         <div className="col-sm-8 subtitles">
                         <div  className="horas">Horas Diarias Promedio</div>
                            <Form.Control placeholder="Ingrese número de horas diarias" 
                                onChange={handleChangeText}
                                value={aboutPSP.dailyHours}
                                disabled={notgrabado}
                                name="dailyHours"
                                type="number"/>
                         </div>
                         <div className="col-sm-1 subtitles">
                            
                         </div>
                    </div>
                </div>
                <div className="col-sm-6 horas columnas">
                <div className="row filas">
                         <div className="col-sm-8 subtitles">
                         <div  className="horas">Horas Semanales Promedio</div>
                            <Form.Control placeholder="Ingrese número de horas semanales" 
                                onChange={handleChangeText}
                                value={aboutPSP.weekHours}
                                disabled={notgrabado}
                                name="weekHours"
                                type="number"/>
                         </div>
                         <div className="col-sm-1 subtitles">
                            
                         </div>
                    </div>
                </div>
            </div>
            {
                data.others && data.others.map((e,index) => {
                    if(e.seccion === "Sobre la PSP"){
                        var one = 'Ingrese el ';
                        var two = e.nombreCampo;
                        var texto = one + two;
                        return (
                            <div key={index}>
                                <div className="rowsOthers">{texto}</div>
                                <div className="row rows" style={{"paddingTop":"10px !important"}}>
                                    <Form.Control placeholder={texto}
                                    onChange={handleChangeOthers}
                                    value={e.valorAlumno}
                                    disabled = {notgrabado}
                                    name={e.nombreCampo}/>
                                </div>
                            </div>
                        )
                    }
                })
            }
        </div>
    )
}