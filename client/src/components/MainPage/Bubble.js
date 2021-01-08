import React from 'react'
import './Main.css'
export default function Bubble({ size, top, left }) {
    return (
        <div className="bubble" style={{ width: size + 'px', height: size + 'px', top: top + 'px', left: left + 'px' }}>

        </div>
    )
}
