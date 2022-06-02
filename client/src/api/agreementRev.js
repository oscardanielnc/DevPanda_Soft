import {API_VERSION, BASE_PATH, PANDA_KEY} from './config';

export function getAgreement(fidAlumno){

    const url = `${BASE_PATH}/${API_VERSION}/agreementLearningPlan-selectDocumentsInfoByProcess/${fidAlumno}`;
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
                agreement: agreement.result,
                success: agreement.success
            }
        })
        .catch(errMsg => {
            return {
                errMsg,
                success: false
            }
        })

}
export function agreementReviewUpdateApi(data) {
    const url = `${BASE_PATH}/${API_VERSION}/agreementLearningPlan-updateInfoByStudent`;
    const params = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            //authorization: PANDA_KEY
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