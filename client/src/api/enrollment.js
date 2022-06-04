import {API_VERSION, BASE_PATH} from './config';

export function selectStudentsByProcessSpecialtyApi(idProceso) {
    const url = `${BASE_PATH}/${API_VERSION}/enrollment-students/${idProceso}`;
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
                    matr: data.matr,
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
                errMsg: errMsg.message,
                success: false
            }
    })
}
export function updateEnrollmentStudentsApi(data) {
    const url = `${BASE_PATH}/${API_VERSION}/enrollment-students-ids`;
    const params = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            //Authorization: PANDA_KEY
        },
        body: JSON.stringify(data)
    }

    return fetch(url, params)
        .then(response => {
            return response.json()
        })
        .then(data => {
            return {
                message: data.message,
                success: data.success
            }
        })
        .catch(errMsg => {
            return {
                message: errMsg.message,
                success: false
            }
    })
}