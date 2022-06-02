import React from "react";
import LayoutBasic from "../../layouts/LayoutBasic";
import { Row } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import StateViewer, {StatesViewType} from "../../components/StateViewer/StateViewer";

export default function EnrollmentStudent () {
    const {user} = useAuth();

    const typeApprovalState = (user.estadoMatriculado===1)? "success": "warning";
    const textApprovalState = (user.estadoMatriculado===1)? "Matriculado": "Pendiente de validación";

    return (
        <LayoutBasic>
            <div className="container">
                <Row className="rows">
                    <h1>Validación de Matrícula</h1>
                </Row>
                <Row className="rows">
                    <p>Completó satisfactoriamente la etapa de envío de Convenio y Plan de Aprendizaje. Para seguir el proceso de convalidación de PSP el coordinador de su especialidad debe validar su correcta matrícula en el curso.</p>
                    <p>Actualmente su estado de matrícula es el siguiente:</p>
                </Row>
                <Row className="rows">
                <StateViewer states={[
                        StatesViewType[typeApprovalState](textApprovalState, '')]}/>
                </Row>
                <Row className="rows">
                    {
                        user.estadoMatriculado===1 && <h6>Ya puede avanzar a la siguiente etapa.</h6>
                    }
                </Row>
            </div>
        </LayoutBasic>
    )
}