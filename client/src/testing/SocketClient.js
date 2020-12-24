import { React, useEffect } from 'react'
import io from 'socket.io-client';
import axios from 'axios'

export default function SocketClient() {
    const ENDPOINT = 'http://localhost:5000'
    let socket;
    useEffect(() => {
        socket = io(ENDPOINT);

        socket.on('messageshaha', message => {
            console.log(message);
        })
    }, [ENDPOINT]);

    async function Test() {
        let response = await axios.post(ENDPOINT + '/testing', {
            firstName: 'Fred',
            lastName: 'Flintstone'
        })

        console.log("response data", response.data);
    }

    useEffect(() => {
        Test()
    }, []);
    return (
        <div>

        </div>
    )
}
