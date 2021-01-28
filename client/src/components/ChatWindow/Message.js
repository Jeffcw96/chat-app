import { React, useEffect, useRef, useState, useContext } from 'react'
import io from 'socket.io-client';
import { UserContext } from '../../context/UserContext'

export default function Message() {
    const { active, setChat, isChat, setIsChat, user } = useContext(UserContext);
    const chatValue = useRef()
    let [typing, setTyping] = useState(false);
    let socket;
    const URL = 'http://localhost:5000/';
    socket = io(URL);

    useEffect(() => {
        if (typing) {
            window.addEventListener('keydown', (event) => {
                if (event.key === "Enter") {
                    sendMessage();
                }
            });

        }
    }, [typing])

    function sendMessage() {
        const userId = user._id
        const chatTicket = active.chatTicket[0].ticket;
        const msg = chatValue.current.value;
        chatValue.current.value = "";
        socket.emit('sendMessage', ({ msg, chatTicket, userId }))
        console.log(user._id)
    }

    return (
        <div className="chat-msg-container">
            <div className="chat-msg">
                <input type="text" ref={chatValue} onFocus={() => setTyping(true)} onBlur={() => setTyping(false)} />
                <button onClick={() => sendMessage()}>Enter</button>
            </div>
        </div>
    )
}
