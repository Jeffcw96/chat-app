import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import userImg from './user.svg'

export default function User({ info }) {
    const { user, setUser } = useContext(UserContext)
    const lastHistory = info.conversation[info.conversation.length - 1];
    let lastUser = lastHistory.user;
    const lastChat = lastHistory.chat;
    if (user.email === lastUser) {
        lastUser = "You"
    }


    return (
        <div className="actions-container friends">
            <div className="friends-picture">
                <img src={info.picture === "" ? userImg : info.picture} alt="friend profile" />
            </div>
            <div>
                <p>{info.name}</p>
                <p>{lastUser} : {lastChat}</p>
            </div>
        </div>
    )
}
