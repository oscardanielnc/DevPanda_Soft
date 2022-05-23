import {API_VERSION, BASE_PATH, PANDA_KEY} from './config';

export function searchAssessorsBySpecialty(alumno) {
    const url = `${BASE_PATH}/${API_VERSION}/administratives-searchAssessorsBySpecialty`;
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            //Authorization: PANDA_KEY
        },
        body:JSON.stringify(alumno)
    }

    return fetch(url, params)
        .then(response => {
            return response.json()
        })
        .then(supervisors => {
            return {
                supervisors: supervisors.result,
                success: supervisors.success
            }
        })
        .catch(errMsg => {
            return {
                errMsg,
                success: false
            }
        })
}