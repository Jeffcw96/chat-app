import { React, useEffect, useRef, useState, useContext } from 'react'
import io from 'socket.io-client';
import { UserContext } from '../../context/UserContext'

function useEventListener(eventType, handler) {
    const handlerRef = useRef(handler);

    useEffect(() => {
        handlerRef.current = handler;
    })

    useEffect(() => {
        console.log("effect ran");
        function internalHandler(e) {
            return handlerRef.current(e);
        }

        document.addEventListener(eventType, internalHandler);

        return () => document.removeEventListener(eventType, internalHandler);
    }, [eventType])

}



export default function Message() {
    const { active, setChat, isChat, setIsChat, user } = useContext(UserContext);
    let [msg, setMsg] = useState("");
    let socket;
    const URL = 'http://localhost:5000/';
    socket = io(URL);
    const final = useRef();

    useEventListener('keypress', (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    })


    function sendMessage() {
        const userId = user._id

        if (active.chatTicket === undefined) {
            console.log(active);
            console.log("check your ticket")
            return
        }


        const chatTicket = active.chatTicket[0].ticket;

        if (msg.length !== 0) {

            socket.emit('sendMessage', ({ msg, chatTicket, userId }))
            setMsg("")
        }

        console.log(user._id)
    }

    return (
        <div className="chat-msg-container">
            <div className="chat-msg">
                <input type="text" value={msg} onChange={e => setMsg(e.target.value)} ref={final} />
                <button onClick={() => sendMessage()}>Enter</button>
            </div>
        </div>
    )
}
