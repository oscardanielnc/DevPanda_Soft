import {API_VERSION, BASE_PATH, PANDA_KEY} from './config';

export function createProcessApi(data) {
    const url = `${BASE_PATH}/${API_VERSION}/process-create`;
    const params = {
        method: "POST",
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
        .then(result => {
            return {
                message: result.message,
                success: result.success
            }
        })
        .catch(errMsg => {
            return {
                message: errMsg.message,
                success: false
            }
        })
}