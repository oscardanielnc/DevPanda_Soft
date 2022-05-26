import {API_VERSION, BASE_PATH, PANDA_KEY} from './config';

export function registerRequestApi (data) {
    const url = `${BASE_PATH}/${API_VERSION}/request`

    const params = {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
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