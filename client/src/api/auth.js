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


export function signInApi (email) {
    const url = `${BASE_PATH}/${API_VERSION}/sign-in`

    const params = {
        method: "POST",
        body: JSON.stringify({email}),
        headers: {
            'Content-type': 'application/json'
        }
    }

    return fetch(url, params)
        .then(response => {
            console.log("response", response)
            return response.json()

        })
        .then(result => {
            console.log("result", result)

            return {
                success: true,
                accessToken: result.accessToken
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