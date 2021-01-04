import { React, useEffect, useRef, useState } from 'react'
import io from 'socket.io-client';
import axios from 'axios'

export default function SocketClient() {
    const chatValue = useRef();
    const sendChatBtn = useRef();
    const ENDPOINT = 'http://localhost:5000'
    let socket;
    let [message, setMessage] = useState([""])

    const chatWindow = {
        width: '85%',
        height: '80vh',
        margin: '0 auto',
        background: '#dcdddd'
    }

    let query = (new URL(document.location)).searchParams;
    let username = query.get("user");
    let occupation = query.get("job");
    let room = query.get("room");
    socket = io(ENDPOINT);
    useEffect(() => {
        socket.on('messageshaha', message => {
            console.log(message);
        })

        socket.emit('join', { username, occupation, room }, (e) => {
            console.log("e", e)
        })

        socket.on('userJoin', msg => {
            setMessage([...msg, msg]);
        })

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPOINT, username, occupation, room]);

    useEffect(() => {
        socket.on('message', msg => {
            console.log(msg);
            setMessage([...msg, msg]);
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
        let room = query.get("room");
        socket.emit('sendMessage', ({ msg, room }))
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
