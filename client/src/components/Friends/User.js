import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import userImg from './user.svg'

export default function User({ chatList }) {
    const { user, setUser } = useContext(UserContext)
    // const lastHistory = info.conversation[info.conversation.length - 1];
    // let lastUser = lastHistory.user;
    // const lastChat = lastHistory.chat;
    // if (user.email === lastUser) {
    //     lastUser = "You"
    // }
    console.log("user", user)
    console.log("In user chat list", chatList)


    return (

        chatList.map(test => (
            <p>{test.email}</p>
        ))


    )
}

{/* <div className="actions-container friends">
<div className="friends-picture">
<img src={info.picture === "" ? userImg : info.picture} alt="friend profile" /> 
</div>
<div>
   <p>{chat.name}</p>
   <p>{lastUser} : {lastChat}</p> 
</div> 
</div> */}