import {API_VERSION, BASE_PATH, PANDA_KEY} from './config';

//code: idProceso-idEspecialidad-ETAPA-idAlumno
export function getAllDocsApi(code, isStudent) {
    const url = `${BASE_PATH}/${API_VERSION}/docs/${code}/${isStudent}`;
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
        .then(docs => {
            return {
                docs,
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

export function uploadDocsApi(files, code, isStudent) {
    const url = `${BASE_PATH}/${API_VERSION}/docs/${code}/${isStudent}`;
    const formData = new FormData(); // si queremos enviar archivo imagen

    for(const i in files) {
        formData.append(`file${i}`, files[i]);
    }
    
    const params = {
        method: "PUT",
        // headers: {
        //     // "Content-Type": "application/json",
        //     'Content-Type': 'multipart/form-data',
        //     //Authorization: token
        // },
        body: formData
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
            };
        })
}