import {API_VERSION, BASE_PATH, PANDA_KEY} from './config';

export function selectDocumentsInfoByProcessOnlyStudent(fidAlumno) {
    const url = `${BASE_PATH}/${API_VERSION}/agreementLearningPlan-selectDocumentsInfoByProcessOnlyStudent/${fidAlumno}`;
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
        .then(files => {
            return {
                files: files.resultado,
                success: files.success
            }
        })
        .catch(errMsg => {
            return {
                errMsg,
                success: false
            }
        })
}