import {API_VERSION, BASE_PATH, PANDA_KEY} from './config';

export function getFinalReport(fidAlumno) {
    const url = `${BASE_PATH}/${API_VERSION}/finalReport/${fidAlumno}`;
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
                files: files.result,
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