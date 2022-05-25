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
            if(infoFicha.success) {
                return {
                    infoFicha,
                    success: true
                }
            }
            return {
                errMsg: infoFicha.message,
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
 export function registrationUpdateApiStudent(data) {
     const url = `${BASE_PATH}/${API_VERSION}/studentDataInscriptionForm`;
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
                 success: result.success
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
                success: result.success
            }
        })
        .catch(err => {
            return {
                msg: err.message,
                success: false
            }
        })
}

export function getListStudentsInscriptionForm(idEspecialidad){
    const url = `${BASE_PATH}/${API_VERSION}/studentListInscriptionForm/${idEspecialidad}`;
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


export function getListOfCountry(){
    const url = `${BASE_PATH}/${API_VERSION}/countryList`;
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            //Authorization: PANDA_KEY
        }
    }
    console.log("En la funcion getListOfCountry");
    return fetch(url, params)
        .then(response => {
            return response.json()
        })
        .then(data => {
            if(data.success) {
                console.log("En el success de la funcion");
                return {
                    data: data.result,
                    success: true
                }
            }
            console.log("En el failed de la funcion");
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


export function getLineBusinessList(){
    const url = `${BASE_PATH}/${API_VERSION}/lineBusinessList`;
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