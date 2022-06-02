import {API_VERSION, BASE_PATH, PANDA_KEY} from './config';

export function getDeliverableStudent(idAlumno,idEntregable) {
    const url = `${BASE_PATH}/${API_VERSION}/deliverableStudent/${idEntregable}/${idAlumno}`;
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            //Authorization: PANDA_KEY
        }
    }

    return fetch(url, params)
        .then(response => {
            return response.json()
        })
        .then(data => {
            if(data.success) {
                return {
                    data,
                    success: true
                }
            }
            return {
                errMsg: data.message,
                success: false
            }
        })
        .catch(errMsg => {
            return {
                errMsg,
                success: false
            }
    })
}

export function setDeliverableStudent(data) {
    const url = `${BASE_PATH}/${API_VERSION}/deliverableStudent/`;
    const params = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            //Authorization: PANDA_KEY
        }
    }

    return fetch(url, params)
        .then(response => {
            return response.json()
        })
        .then(result => {
            return {
                msg: result.message,
                success: result.success
            }
        })
        .catch(errMsg => {
            return {
                msg: errMsg.message,
                success: false
            }
    })
}

export function getfieldsDeliverables(idEntregable,idRespuestaEntregable) {
    const url = `${BASE_PATH}/${API_VERSION}/fieldsDeliverables/${idEntregable}/${idRespuestaEntregable}`;
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            //Authorization: PANDA_KEY
        }
    }

    return fetch(url, params)
        .then(response => {
            return response.json()
        })
        .then(data => {
            if(data.success) {
                return {
                    data,
                    success: true
                }
            }
            return {
                errMsg: data.message,
                success: false
            }
        })
        .catch(errMsg => {
            return {
                errMsg,
                success: false
            }
    })
}

export function updatefieldsDeliverables(data) {
    const url = `${BASE_PATH}/${API_VERSION}/fieldsDeliverables/`;
    const params = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            //Authorization: PANDA_KEY
        }
    }

    return fetch(url, params)
        .then(response => {
            return response.json()
        })
        .then(result => {
            return {
                msg: result.message,
                success: result.success
            }
        })
        .catch(errMsg => {
            return {
                msg: errMsg.message,
                success: false
            }
    })
}

export function getDeliverableByStudentSpecialty(idEspecialidad,idAlumno) {
    const url = `${BASE_PATH}/${API_VERSION}/getDeliverableByStudentSpecialty/${idEspecialidad}/${idAlumno}`;
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            //Authorization: PANDA_KEY
        }
    }

    return fetch(url, params)
        .then(response => {
            return response.json()
        })
        .then(data => {
            if(data.success) {
                return {
                    data,
                    success: true
                }
            }
            return {
                errMsg: data.message,
                success: false
            }
        })
        .catch(errMsg => {
            return {
                errMsg,
                success: false
            }
    })
}