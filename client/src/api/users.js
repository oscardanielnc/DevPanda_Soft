import {API_VERSION, BASE_PATH, PANDA_KEY} from './config';

export function getCoordinatorsApi() {
    const url = `${BASE_PATH}/${API_VERSION}/coordinators`;
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
                    data: data.result,
                    success: true
                }
            }
            return {
                message: data.message,
                success: false
            }
        })
        .catch(errMsg => {
            return {
                message: errMsg.message,
                success: false
            }
    })
}
export function getSupervisorsApi(idSpecialty) {
    const url = `${BASE_PATH}/${API_VERSION}/supervisors/${idSpecialty}`;
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
                    data: data.result,
                    success: true
                }
            }
            return {
                message: data.message,
                success: false
            }
        })
        .catch(errMsg => {
            return {
                message: errMsg.message,
                success: false
            }
    })
}

export function getSupervisorByID(idSupervisor) {
    const url = `${BASE_PATH}/${API_VERSION}/supervisor/${idSupervisor}`;
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
        .then(result => {
            if(result.success) {
                const data = {
                    firstname: result.result[0].nombres,
                    lastname: result.result[0].apellidos,
                    email: result.result[0].correo,
                    code: result.result[0].idPersona
                }
                return {
                    data: data,
                    success: true
                }
            }
            return {
                message: result.message,
                success: false
            }
        })
        .catch(errMsg => {
            return {
                message: errMsg.message,
                success: false
            }
    })
}

export function createAdministrativeApi(personal) {
    const url = `${BASE_PATH}/${API_VERSION}/create-administrative`;
    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            //Authorization: PANDA_KEY
        },
        body: JSON.stringify(personal)
    }

    return fetch(url, params)
        .then(response => {
            return response.json()
        })
        .then(data => {
            return data
        })
        .catch(errMsg => {
            return {
                message: errMsg.message,
                success: false
            }
    })
}