import {API_VERSION, BASE_PATH, PANDA_KEY} from './config';

export function getstudentInscriptionForm(idAlumno) {
    const url = `${BASE_PATH}/${API_VERSION}/studentInscriptionForm/${idAlumno}`;
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
        .then(infoFicha => {
            return {
                infoFicha,
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
 export function registrationUpdateApiStudent(data) {
     const url = `${BASE_PATH}/${API_VERSION}/studentDataInscriptionForm`;
     console.log("En la funcion registrationUpdateApiStudent: ",data);
     const params = {
         method: "PUT",
         headers: {
             "Content-Type": "application/json",
             authorization: PANDA_KEY
        },
         body: JSON.stringify(data)
     }
     console.log("Antes del fetch");
     return fetch(url, params)
         .then(response => {
             console.log("En el fetch");
             console.log("En el fecth eñ response: ",response);
             return response.json()
         })
         .then(result => {
            console.log("En el result");
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
 export function registrationUpdateApiStudentCamps(data) {
    const url = `${BASE_PATH}/${API_VERSION}/studentFieldsInscriptionForm`;
    console.log("En la funcion registrationUpdateApiStudentCamps: ",data);
    const params = {
        method: "PUT",
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