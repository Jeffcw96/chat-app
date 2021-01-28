import React, { useContext, useState, useReducer, useEffect } from 'react'
import User from './User'
import { UserContext } from '../../context/UserContext'
import userImg from './user.svg'
import contact from './contact.svg'
import './FriendList.css'
import Modal from './Modal'
import axios from 'axios'

export default function FriendList() {
    const URL = 'http://localhost:5000/';
    const [chatList, dispatch] = useReducer(reducer, []);
    const { user, setUser } = useContext(UserContext);
    let [show, setShow] = useState(false)
    let [friends, setFriends] = useState(null)
    let imageSrc = user.image;

    if (imageSrc === "" || imageSrc === undefined) {
        imageSrc = userImg;
    }

    function reducer(chatList, action) {
        switch (action.type) {
            case "CREATE":
                let isChating = chatList.some(chatRecord => {
                    return chatRecord._id === action.payload._id
                })
                if (!isChating) {
                    return [...chatList, action.payload]
                }
            default:
                return chatList
        }
    }
    async function ShowFriendList() {
        try {
            let jsonFriend = {}
            jsonFriend.ids = user.friends;

            const response = await axios.post(URL + "social/list", jsonFriend, {
                headers: {
                    "Authorization": "Bearer " + user.token
                }
            })
            console.log(response.data.users)
            setFriends(response.data.users)
            setShow(true)
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <div style={{ width: '30%' }}>
            <div style={{ height: '8%' }}>
                <div className="actions-container">
                    <div className="avatar-container">
                        <img src={imageSrc} alt="profile avatar" style={{ maxWidth: '100%' }} />
                    </div>
                    <div className="avatar-container" onClick={() => ShowFriendList()}>
                        <img src={contact} alt="profile avatar" style={{ maxWidth: '100%' }} />
                    </div>
                </div>
            </div>
            <Modal show={show} setShow={setShow} friendslist={friends} dispatch={dispatch} />
            <User chatList={chatList} />
        </div>
    )
}
