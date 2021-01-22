import React, { useRef, useContext } from 'react'
import chat from './chat.svg'
import axios from 'axios'
import { UserContext } from '../../context/UserContext'

export default function Modal({ show, setShow, friendslist }) {
    const URL = 'http://localhost:5000/';
    const closeModal = useRef();
    const modal = useRef();
    const searchFriend = useRef();
    const { user, setUser } = useContext(UserContext)

    async function addFriend() {
        try {
            console.log("add friedn")
            let jsonFriend = {}
            jsonFriend.searchParam = searchFriend.current.value;

            const response = await axios.post(URL + "social/request", jsonFriend, {
                headers: {
                    "Authorization": "Bearer " + user.token
                }
            })
            console.log("response", response)
        } catch (error) {
            console.error(error.message)
        }
    }
    console.log("friend list", friendslist)
    return (
        <div>
            <div ref={modal} className="modal" style={show ? { display: 'block' } : { display: 'none' }}>
                <div className="modal-content">
                    <div className="modal-header">
                        <span className="close" ref={closeModal} onClick={() => setShow(false)}>&times;</span>
                        <h2>Friends List</h2>
                    </div>
                    <div className="modal-body">
                        <div>
                            <input type="text" ref={searchFriend} />
                            <button onClick={() => addFriend()}>Add</button>
                        </div>
                        {friendslist.map(friend => (
                            <div className="contact-list" key={friend.id}>
                                <div className="photo">
                                    <img src={friend.picture} alt="contact profile pic" />
                                </div>
                                <div className="info">
                                    {friend.name === null || friend.name === "" ?
                                        <p>{friend.email}</p> :
                                        <p>{friend.bio}</p>
                                    }
                                </div>
                                <div className="action">
                                    <img src={chat} alt="let's chat" />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="modal-footer">
                        <h3>Modal Footer</h3>
                    </div>
                </div>
            </div>
        </div >
    )
}
