import {API_VERSION, BASE_PATH, PANDA_KEY} from './config';
import jwtDecode from "jwt-decode";

export function getAccessTokenApi() {
    const accessToken = localStorage.getItem("ACCESS_TOKEN");

    if(!accessToken || accessToken==="null") return null;

    return willExpireToken(accessToken)? null : accessToken;
}

function willExpireToken(accessToken) {
    const seconds = 60;
    const metaToken = jwtDecode(accessToken);
    //const metaToken = accessToken; //
    const { expire } = metaToken;
    const now = (Date.now() + seconds)/1000;

    return now > expire;
}

export function logout() {
    localStorage.removeItem("ACCESS_TOKEN")
}

export function signInApi (email, photo) {
    const url = `${BASE_PATH}/${API_VERSION}/sign-in`
    const data = {email,photo}

    const params = {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    return fetch(url, params)
        .then(response => {
            console.log("response", response)
            return response.json()
        })
        .then(result => {
            console.log("result", result)
            if(result.accessToken) {
                return {
                    success: true,
                    accessToken: result.accessToken
                }
            } else {
                return {
                    success: false,
                    message: result.message
                }
            }
        })
        .catch(err => {
            console.log("err", err)
            return {
                success: false,
                message: err.message
            }
        })
}
export function signUpApi (data) {
    const url = `${BASE_PATH}/${API_VERSION}/sign-up`

    const params = {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    return fetch(url, params)
        .then(response => {
            console.log("response", response)
            return response.json()
        })
        .then(result => {
            console.log("result", result)
            if(result.accessToken) {
                return {
                    success: true,
                    accessToken: result.accessToken
                }
            } else {
                return {
                    success: false,
                    message: result.message
                }
            }
        })
        .catch(err => {
            console.log("err", err)
            return {
                success: false,
                message: err.message
            }
        })
}