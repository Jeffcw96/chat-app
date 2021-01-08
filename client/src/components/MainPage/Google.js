import React from 'react'
import { GoogleLogin } from 'react-google-login'
import axios from 'axios'

export default function Google({ label }) {
    async function googleSuccess(response) {
        try {
            console.log("success response", response);
            const { id_token } = response.tokenObj;
            const googleAcc = { id_token };

            const res = await axios.post('auth/googleLogin', googleAcc);
            console.log("response", res)
        } catch (error) {
            console.error(error)
        }
    }

    function googleFailed(res) {
        console.log("failed response", res);
    }
    return (
        <div>
            <GoogleLogin
                clientId="453452665261-o94lt4oeikt9mfscc3vqul28e8r6fut5.apps.googleusercontent.com"
                buttonText={label}
                onSuccess={googleSuccess}
                onFailure={googleFailed}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}
