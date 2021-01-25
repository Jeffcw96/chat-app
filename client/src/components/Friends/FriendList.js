import React, { useContext, useState } from 'react'
import User from './User'
import { UserContext } from '../../context/UserContext'
import userImg from './user.svg'
import contact from './contact.svg'
import './FriendList.css'
import Modal from './Modal'
import { CHATS } from './Dummy'
import axios from 'axios'

export default function FriendList() {
    const URL = 'http://localhost:5000/';
    const { user, setUser } = useContext(UserContext)
    let [show, setShow] = useState(false)
    let [friends, setFriends] = useState(null)
    console.log("user", user)
    let imageSrc = user.image;

    if (imageSrc === "" || imageSrc === undefined) {
        imageSrc = userImg;
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
                <div className="actions-container ">
                    <div className="avatar-container">
                        <img src={imageSrc} alt="profile avatar" style={{ maxWidth: '100%' }} />
                    </div>
                    <div className="avatar-container" onClick={() => ShowFriendList()}>
                        <img src={contact} alt="profile avatar" style={{ maxWidth: '100%' }} />
                    </div>
                </div>
            </div>
            <Modal show={show} setShow={setShow} friendslist={friends} />
            {  CHATS.map(chat => (
                <User info={chat} key={chat.id} />
            ))}

        </div>
    )
}
