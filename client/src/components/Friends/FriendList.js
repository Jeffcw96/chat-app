import React, { useContext } from 'react'
import User from './User'
import { UserContext } from '../../context/UserContext'
import userImg from './user.svg'
import contact from './contact.svg'
import './FriendList.css'
import { CHATS } from './Dummy'

export default function FriendList() {
    const { user, setUser } = useContext(UserContext)
    console.log("user", user)
    let imageSrc = user.image;
    console.log("image src", imageSrc)
    if (imageSrc === "" || imageSrc === undefined) {
        imageSrc = userImg;
    }


    return (
        <div style={{ width: '30%' }}>
            <div style={{ height: '60px' }}>
                <div className="actions-container ">
                    <div className="avatar-container">
                        <img src={imageSrc} alt="profile avatar" style={{ maxWidth: '100%' }} />
                    </div>
                    <div className="avatar-container">
                        <img src={contact} alt="profile avatar" style={{ maxWidth: '100%' }} />
                    </div>
                </div>
            </div>
            {  CHATS.map(chat => (
                <User info={chat} key={chat.id} />
            ))}

        </div>
    )
}
