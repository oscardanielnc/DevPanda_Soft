import {API_VERSION, BASE_PATH, PANDA_KEY} from './config';

export function getSupervisorScheduleApi(idSupervisor) {
    const url = `${BASE_PATH}/${API_VERSION}//schedule-supervisor/${idSupervisor}`;
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
        .then(schedule => {
            return {
                schedule,
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