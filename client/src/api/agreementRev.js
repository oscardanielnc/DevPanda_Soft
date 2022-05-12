import {API_VERSION, BASE_PATH, PANDA_KEY} from './config';

export function getAgreement(data){

    const url = `${BASE_PATH}/${API_VERSION}/get-agreement`;
    //http://localhost:3977/api/v1/agreementLearningPlan-selectDocumentsInfoByProcess/:fidAlumno/:fidAsesor
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
        .then(agreement => {
            return {
                agreement,
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