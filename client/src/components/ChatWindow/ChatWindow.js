import React from 'react'
import Content from './Content'
import Header from './Header'
import Message from './Message'
import './ChatWindow.css'

export default function Chat() {
    return (
        <div>
            <Header />
            <Content />
            <Message />
        </div>
    )
}
