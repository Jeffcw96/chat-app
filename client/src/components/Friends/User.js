import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import userImg from './user.svg'

export default function User({ chatList }) {
    const { user, setUser } = useContext(UserContext);
    const { active, setActive } = useContext(UserContext)
    console.log("user", user)
    console.log("In user chat list", chatList)

    function activeChat(chat) {
        setActive(chat)
    }

    return (
        chatList.map((chat, ind) => (
            <div className='actions-container friends' onClick={() => activeChat(chat)} key={ind}>
                <div className="friends-picture">
                    <img src={chat.picture === "" || chat.picture === undefined ? userImg : chat.picture} alt="friend profile" />
                </div>
                <div className="friends-chatlist-info">
                    <p>{chat.name === "" || chat.name === undefined ? chat.email : chat.name}</p>
                    {/* <p>{lastUser} : {lastChat}</p>  */}
                </div>
            </div>
        ))
    )
}
