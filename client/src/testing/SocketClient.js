import { React, useEffect, useRef, useState } from 'react'
import io from 'socket.io-client';
import axios from 'axios'

export default function SocketClient() {
    const chatValue = useRef();
    const sendChatBtn = useRef();
    const ENDPOINT = 'http://localhost:5000'
    let socket;
    let [message, setMessage] = useState("")

    const chatWindow = {
        width: '85%',
        height: '80vh',
        margin: '0 auto',
        background: '#dcdddd'
    }

    let query = (new URL(document.location)).searchParams;
    let username = query.get("user");
    let occupation = query.get("job");
    socket = io(ENDPOINT);
    useEffect(() => {



        socket.on('messageshaha', message => {
            console.log(message);
        })

        socket.emit('join', { username, occupation }, (e) => {
            console.log("e", e)
        })



        socket.on('userJoin', msg => {
            console.log(msg)
        })

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPOINT, username, occupation]);

    useEffect(() => {
        socket.on('message', msg => {
            console.log(msg);
            setMessage(msg);
        })
    }, [message])


    // async function Test() {
    //     let response = await axios.post(ENDPOINT + '/testing', {
    //         firstName: 'Fred',
    //         lastName: 'Flintstone'
    //     })

    //     console.log("response data", response.data);
    // }

    // useEffect(() => {
    //     Test()
    // }, []);

    function sendMessage() {
        const msg = chatValue.current.value;
        socket.emit('sendMessage', msg)
    }

    return (
        <div>
            <h1>CHATTT</h1>
            <p style={chatWindow}>{message}</p>
            <input type="text" ref={chatValue} />
            <button onClick={sendMessage} ref={sendChatBtn}>Enter</button>
        </div>
    )
}
