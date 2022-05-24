import {API_VERSION, BASE_PATH} from './config';

export function selectStudentsByProcessSpecialtyApi(idSpecialty, fidProceso) {
    const url = `${BASE_PATH}/${API_VERSION}/enrollment-students/${idSpecialty}/${fidProceso}`;
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
                    students: data.students,
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