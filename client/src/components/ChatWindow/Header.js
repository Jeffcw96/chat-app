import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
export default function Header() {
    const { active, setActive } = useContext(UserContext)
    return (
        <div className="chat-header">
            <p>{active.email}</p>
        </div>
    )
}
