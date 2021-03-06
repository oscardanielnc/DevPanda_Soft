import {API_VERSION, BASE_PATH, PANDA_KEY} from './config';

export function specialtySelectAllApi() {
    const url = `${BASE_PATH}/${API_VERSION}/specialty-all`;
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
        .then(specialties => {
            if(specialties.success) {
                return {
                    specialties: specialties.result,
                    success: true
                }
            }
            return {
                specialties,
                errMsg: specialties.message
            }
        })
        .catch(errMsg => {
            return {
                errMsg,
                success: false
            }
        })
}
export function specialtyInsertApi(specialty) {
    const url = `${BASE_PATH}/${API_VERSION}/specialty`;
    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: PANDA_KEY
        },
        body: JSON.stringify(specialty)
    }

    return fetch(url, params)
        .then(response => {
            return response.json()
        })
        .then(result => {
            if(result.success) {
                return {
                    specialty: result.specialty,
                    success: result.success
                }
            }
            return {
                message: result.message,
                success: result.success
            }
        })
        .catch(err => {
            return {
                message: err.message,
                success: false
            }
        })
}