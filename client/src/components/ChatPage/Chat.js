import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import ChatWindow from '../ChatWindow/ChatWindow'
import FriendList from '../Friends/FriendList'
import { UserContext } from '../../context/UserContext'
import { getCookie, deleteCookie } from '../Cookie/Cookie'
import axios from 'axios'
import './Chat.css'
import io from 'socket.io-client';



export default function Chat() {
    let socket;
    let [user, setUser] = useState({});
    let [active, setActive] = useState({});
    let [chat, setChat] = useState([])
    let [auth, setAuth] = useState(false);
    let [isChat, setIsChat] = useState();

    const lastMsgRef = useRef();
    const history = useHistory()
    const token = getCookie('token');
    const URL = 'http://localhost:5000/';
    socket = io(URL);

    function objectIsEmpty(obj) {
        for (let i in obj) return false;
        return true
    }

    async function getUserInfo() {
        console.log("??")
        try {
            const response = await axios.get(URL + "user/profile", {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            response.data.token = token
            setUser(response.data)
            setAuth(true)

        } catch (error) {
            console.error("Failed verify user")
            setAuth(false)
            deleteCookie("token")
            history.push({
                pathname: "/"
            })
        }
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    useEffect(async () => {
        if (objectIsEmpty(active)) {
            return
        }

        console.log("active user", active);
        console.log("chat ticket", active.chatTicket[0].ticket);
        const chatTicket = active.chatTicket[0].ticket;
        const host = user._id;
        const receiver = active._id

        socket.emit('join', { chatTicket, host, receiver }, (e) => {
            console.log("e", e)
        })



        return () => {
            socket.emit('disconnect');
            socket.off();
        }

    }, [active])




    useEffect(() => {
        socket.on('userJoin', msg => {
            // setChat([...chat, msg])
            console.log("msg", msg)

        })

        socket.on('message', (msgData) => {
            console.log("message", msgData);
            setChat((prevChat) => {
                return [...prevChat, msgData]
            });
        })
    })

    useEffect(() => {
        if (lastMsgRef.current) {
            lastMsgRef.current.scrollIntoView({ smooth: true })
        }

    }, [lastMsgRef.current])


    // function sendMessage() {
    //     const msg = chatValue.current.value;
    //     const chatTicket = active.chatTicket[0].ticket;
    //     socket.emit('sendMessage', ({ msg, room }))
    // }


    return (
        <div className="main-container">
            {
                auth ? (
                    <div className="chat-container">
                        < UserContext.Provider value={{ user: user, active: active, chat: chat, isChat: isChat, setIsChat, setUser, setActive, setChat, lastMsgRef }}>
                            <FriendList />
                            <ChatWindow />
                        </UserContext.Provider >
                    </div>
                )
                    :
                    <div>forbidden access </div>
            }
        </div>
    )

}