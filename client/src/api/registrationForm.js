import {API_VERSION, BASE_PATH, PANDA_KEY} from './config';

export function selectSubmittedInscriptionForm(idAlumno) {
    const url = `${BASE_PATH}/${API_VERSION}/inscriptionForm-selectSubmittedInscriptionForm/${idAlumno}`;
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
        .then(generalData => {
            return {
                generalData,
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
 export function registrationInsertApiStudent({data}) {
     const url = `${BASE_PATH}/${API_VERSION}/specialty`;
     const params = {
         method: "POST",
         headers: {
             "Content-Type": "application/json",
             authorization: PANDA_KEY
        },
         body: JSON.stringify(data)
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
         .catch(err => {
             return {
                 msg: err.message,
                 success: false
             }
         })
 }
 export function registrationUpdateApi({data}) {
    const url = `${BASE_PATH}/${API_VERSION}/specialty`;
    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: PANDA_KEY
       },
        body: JSON.stringify(data)
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
        .catch(err => {
            return {
                msg: err.message,
                success: false
            }
        })
}