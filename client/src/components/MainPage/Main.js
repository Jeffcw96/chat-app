import React from 'react'
import Google from './Google'
import './Main.css'
import Bubble from './Bubble'
import image from './logo.jpg'

export default function Main() {
    return (
        <div className="main">
            <div className="form-container">
                <Bubble size="20" top="-15" left="150" />
                <Bubble size="40" top="-65" left="110" />
                <div className="bubble-container">
                    <Bubble size="5" top="0" left="0" />
                    <Bubble size="5" top="0" left="0" />
                    <Bubble size="5" top="0" left="0" />
                    <Bubble size="5" top="0" left="0" />
                    <Bubble size="5" top="0" left="0" />
                </div>
                <h1>CONNECT YOU & ME</h1>
                <div className="flex align-top hori-between">
                    <div style={{ width: '65%' }}>
                        <img src={image} alt="logo image" style={{ maxWidth: '75%' }} />
                    </div>
                    <div className="sign-up-in-form">
                        <div className="flex hori-center">
                            <h2>Sign In</h2>
                            <h2>Sign Up</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
