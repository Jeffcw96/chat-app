import React, { useContext } from 'react'
import User from './User'
import { UserContext } from '../../context/UserContext'

export default function FriendList() {
    const { user, setUser } = useContext(UserContext)
    return (
        <div>
            <p>ok</p>
            <pre>{JSON.stringify(user)}</pre>
            <User />
        </div>
    )
}
