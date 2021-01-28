import React, { useContext } from 'react'
import './ChatWindow.css'
import { UserContext } from '../../context/UserContext'

export default function Content() {
    const { user, chat, setChat } = useContext(UserContext)
    console.log("chat", chat);
    console.log("user -d", user._id);

    chat.forEach(element => {
        if (element.userId === user._id) {
            console.log("hello world");
        }
    });



    return (
        <div className="chat-content">
            { chat.map((msg, ind) => (
                <div key={ind} className={`chat-box-container ${msg.user === user._id ? "sender" : "receiver"}`}>
                    <p className="chat-box">
                        {msg.message}
                        <small className={`chat-time ${msg.user === user._id ? "sender" : "receiver"}`}>{msg.time}</small>
                    </p>

                </div>
            ))}
        </div>
    )
}
