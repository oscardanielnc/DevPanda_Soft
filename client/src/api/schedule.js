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
            if(schedule.success) {
                return {
                    schedule: schedule.data,
                    success: true
                }
            }
            return {
                errMsg: schedule.message,
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
            console.log(supervisors)
            if(supervisors.success) {
                return {
                    supervisors: supervisors.data,
                    success: true
                }
            }
            return {
                errMsg: supervisors.message,
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
export function changeOneHourSchedule(arrHours) {
            const url = `${BASE_PATH}/${API_VERSION}/schedule-changeHours`;
            const params = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    //Authorization: PANDA_KEY
                },
                body:JSON.stringify(arrHours)
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

export function updateMeetingLink(data) {
    const url = `${BASE_PATH}/${API_VERSION}/schedule-update-meeting-link`;
    const params = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            //Authorization: PANDA_KEY
        },
        body:JSON.stringify(data)
    }

    return fetch(url, params)
    .then(response => {
        return response.json()
    })
    .then(result => {
        console.log(result)
        return {
            msg: result.message,
            success: result.success
        }
    })
    .catch(err => {
        console.log(err)
        return {
            msg: err.message,
            success: false
        }
    })
}

export function getStudentDate(idStudent) {
    const url = `${BASE_PATH}/${API_VERSION}/schedule-studentDate/${idStudent}`;
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
        .then(student => {
            console.log(student)
            if(student.success) {
                return {
                    student: student.data,
                    success: true
                }
            }
            return {
                errMsg: student.message,
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