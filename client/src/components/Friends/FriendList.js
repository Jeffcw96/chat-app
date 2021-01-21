import React, { useContext, useState } from 'react'
import User from './User'
import { UserContext } from '../../context/UserContext'
import userImg from './user.svg'
import contact from './contact.svg'
import './FriendList.css'
import Modal from './Modal'
import { CHATS } from './Dummy'

export default function FriendList() {
    const { user, setUser } = useContext(UserContext)
    let [show, setShow] = useState(false)
    console.log("user", user)
    let imageSrc = user.image;

    if (imageSrc === "" || imageSrc === undefined) {
        imageSrc = userImg;
    }


    return (
        <div style={{ width: '30%' }}>
            <div style={{ height: '8%' }}>
                <div className="actions-container ">
                    <div className="avatar-container">
                        <img src={imageSrc} alt="profile avatar" style={{ maxWidth: '100%' }} />
                    </div>
                    <div className="avatar-container" onClick={() => setShow(true)}>
                        <img src={contact} alt="profile avatar" style={{ maxWidth: '100%' }} />
                    </div>
                </div>
            </div>
            <Modal show={show} setShow={setShow} friendslist={user.friends} />
            {  CHATS.map(chat => (
                <User info={chat} key={chat.id} />
            ))}

        </div>
    )
}
