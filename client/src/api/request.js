import {API_VERSION, BASE_PATH, PANDA_KEY} from './config';

export function getListStudentsRequests(idEspecialidad){
    const url = `${BASE_PATH}/${API_VERSION}/requestList/${idEspecialidad}`;
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