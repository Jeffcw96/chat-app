import { React, useEffect, useRef, useState } from 'react'
import io from 'socket.io-client';

export default function Message() {
    return (
        <div className="chat-msg-container">
            <div className="chat-msg">
                <input type="text" />
                <button>Enter</button>
            </div>
        </div>
    )
}
