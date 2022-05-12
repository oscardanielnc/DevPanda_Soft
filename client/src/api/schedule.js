import {API_VERSION, BASE_PATH, PANDA_KEY} from './config';

export function getSupervisorScheduleApi(idSupervisor) {
    const url = `${BASE_PATH}/${API_VERSION}/schedule-supervisor/${idSupervisor}`;
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
export function searchAssessorsBySpecialty(idEspecialidad) {
    const url = `${BASE_PATH}/${API_VERSION}/schedule-supervisors-specialty/${idEspecialidad}`;
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            //Authorization: PANDA_KEY
        },
    }

    return fetch(url, params)
        .then(response => {
            return response.json()
        })
        .then(supervisors => {
            return {
                supervisors,
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
export function changeOneHourSchedule(hour) {
            const url = `${BASE_PATH}/${API_VERSION}/schedule-changeOneHour`;
            const params = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    //Authorization: PANDA_KEY
                },
                body:JSON.stringify(hour)
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