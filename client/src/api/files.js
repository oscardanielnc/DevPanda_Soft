import {API_VERSION, BASE_PATH, PANDA_KEY} from './config';

export function getAllDocs(code, isStudent) {
    //code: idAlumno-idEspecialidad-ETAPA-idProceso
    const url = `${BASE_PATH}/${API_VERSION}/docs/${code}/${isStudent}`;
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            //Authorization: PANDA_KEY
        }
    }
//getAllOwnDocs
    return fetch(url, params)
        .then(response => {
            return response.json()
        })
        .then(docs => {
            return {
                docs,
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

// export function getDocApi(path, name) {
//     console.log(path)
//     const url = `${BASE_PATH}/${API_VERSION}/doc/${path}/${name}`;
//     const params = {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             //Authorization: PANDA_KEY
//         }
//     }

//     fetch(url, params)
//         // .then(response => {
//         //     console.log("response", response)
//         //     // return response.json()
//         //     return response
//         // })
//         // // // .then(result => {
//         // // //     console.log("result", result)
//         // // //     return {
//         // // //         msg: result,
//         // // //         success: true
//         // // //     }
//         // // // })
//         // .catch(errMsg => {
//         //     return {
//         //         msg: errMsg,
//         //         success: false
//         //     }
//         // })
// }