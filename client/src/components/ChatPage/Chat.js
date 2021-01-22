import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ChatWindow from '../ChatWindow/ChatWindow'
import FriendList from '../Friends/FriendList'
import { UserContext } from '../../context/UserContext'
import { getCookie } from '../Cookie/Cookie'
import axios from 'axios'
import './Chat.css'


export default function Chat() {
    let [user, setUser] = useState({})
    let [auth, setAuth] = useState(false)
    const location = useLocation();
    const token = getCookie('token');
    const URL = 'http://localhost:5000/';

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
        }
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    return (
        <div className="main-container">
            {
                auth ? (
                    <div className="chat-container">
                        < UserContext.Provider value={{ user, setUser }}>
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