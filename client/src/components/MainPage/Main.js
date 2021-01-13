import { React, useState, useRef, useEffect } from 'react'
import Google from './Google'
import './Main.css'
import Bubble from './Bubble'
import image from './logo.jpg'

export default function Main() {
    const email = useRef();
    const password = useRef();
    const cPassword = useRef();

    let [signIn, setSignIn] = useState(true)
    let [signUp, setSignUp] = useState(false)

    function swapTab(e) {
        if (e === 'signIn') {
            setSignIn(true);
            setSignUp(false);
        } else if (e === 'signUp') {
            setSignIn(false);
            setSignUp(true);
        }
    }


    return (
        <div className="main">
            <div className="form-container">
                <Bubble size="20" top="-15" left="150" />
                <Bubble size="40" top="-65" left="110" />
                <div className="bubble-container">
                    {Array(5).fill(5).map((size) => (
                        <Bubble size={size} top="0" left="0" />
                    ))}
                </div>
                <h1>CONNECT YOU & ME</h1>
                <div className="flex align-top hori-between">
                    <div style={{ width: '65%' }}>
                        <img src={image} alt="logo image" style={{ maxWidth: '75%' }} />
                    </div>
                    <div className="sign-up-in-form">
                        <div className="flex hori-center">
                            <h2 className={signIn ? "active" : ""} onClick={() => swapTab('signIn')}>SIGN IN</h2>
                            <h2 className={signUp ? "active" : ""} onClick={() => swapTab('signUp')}>SIGN UP</h2>
                        </div>
                        <div class="action-container">
                            <div class="object">
                                <h3>Email:</h3>
                                <input type="text" ref={email} />
                            </div>
                            <div class="object">
                                <h3>Password:</h3>
                                <input type="password" ref={password} />
                            </div>
                            {
                                signUp ?
                                    <div class="object">
                                        <h3>Confirm Password:</h3>
                                        <input type="password" ref={cPassword} />
                                    </div>
                                    : null

                            }

                            <Google label={`${signIn ? "Sign In" : "Sign Up"} with Google`} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
