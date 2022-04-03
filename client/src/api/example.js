import {API_VERSION, BASE_PATH} from './config';

export function sayHelloApi(name) {
    const url = `${BASE_PATH}/${API_VERSION}/example`;
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }

    return fetch(url, params)
        .then(response => {
            return response.json()
        })
        .then(result => {
            return result.message
        })
        .catch(err => {
            console.log(err)
            return err.message
        })
}