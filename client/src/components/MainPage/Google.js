import React from 'react'
import { GoogleLogin } from 'react-google-login'
import { setCookie } from '../Cookie/Cookie'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export default function Google({ label }) {
    const URL = 'http://localhost:5000/';
    const history = useHistory()
    async function googleSuccess(response) {
        try {
            console.log("success response", response);
            const { id_token } = response.tokenObj;
            const googleAcc = { id_token };

            const res = await axios.post(URL + 'auth/googleLogin', googleAcc);
            const token = res.data.token;

            setCookie("token", token, 3);
            console.log("response", res)
            history.push({
                pathname: '/chat'
            })

        } catch (error) {
            console.error(error)
        }
    }

    function googleFailed(res) {
        console.log("failed response", res);
    }
    return (
        <div className="google-btn">
            <GoogleLogin
                clientId="453452665261-o94lt4oeikt9mfscc3vqul28e8r6fut5.apps.googleusercontent.com"
                buttonText={label}
                onSuccess={googleSuccess}
                onFailure={googleFailed}
                cookiePolicy={'single_host_origin'}
                style={{ marginLeft: "200px" }}
            />
        </div>
    )
}
