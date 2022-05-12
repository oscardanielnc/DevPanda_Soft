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
            return {
                data,
                success: true
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
                success: true
            }
        })
        .catch(errMsg => {
            return {
                msg: errMsg.message,
                success: false
            }
    })
}