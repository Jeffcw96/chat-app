import { React, useState, useRef, useEffect, useReducer } from 'react'
import Google from './Google'
import './Main.css'
import Bubble from './Bubble'
import image from './logo.jpg'
import axios from 'axios'

export default function Main() {
    const URL = 'http://localhost:5000/';
    const ERR = {
        REGISTER: 'cPassword',
        EMAIL: 'email',
        PASSWORD: 'password'
    }

    const InitialState = {
        email: "",
        password: "",
        cPassword: ""
    }

    const [state, dispatch] = useReducer(reducer, InitialState);
    const email = useRef();
    const password = useRef();
    const cPassword = useRef();
    const successMsg = useRef();

    let [signIn, setSignIn] = useState(true)
    let [signUp, setSignUp] = useState(false)
    let [success, setSuccess] = useState("")

    useEffect(() => {
        ResetInputAndMsg()
        dispatch({ type: 'RESET' })
    }, [signUp])


    function reducer(state, action) {
        switch (action.type) {
            case ERR.REGISTER:
                return { ...state, cPassword: action.payload }
            case ERR.EMAIL:
                return { ...state, email: action.payload }
            case ERR.PASSWORD:
                return { ...state, password: action.payload }
            case 'RESET':
                return InitialState
            default:
                return state
        }
    }

    function ResetInputAndMsg() {
        email.current.value = ""
        password.current.value = ""
        password.current.classList.remove('err');
    }

    function swapTab(e) {
        if (e === 'signIn') {
            setSignIn(true);
            setSignUp(false);
        } else if (e === 'signUp') {
            setSignIn(false);
            setSignUp(true);
        }
    }

    function resetClass(e) {
        e.target.classList.remove('err');
    }

    async function Login() {
        let user = {}
        user.email = email.current.value;
        user.password = password.current.value;

        const response = await axios.post(URL + "auth/login", user);
        const result = response.data;
        console.log("result", result)
    }

    async function Register() {
        try {
            let user = {}
            user.email = email.current.value;

            if (password.current.value !== cPassword.current.value) {
                password.current.classList.add('err');
                cPassword.current.classList.add('err');
                dispatch({ type: ERR.REGISTER, payload: 'Please make sure the password is matched' })

                return
            }

            user.password = cPassword.current.value;
            const response = await axios.post(URL + "auth/register", user);
            console.log(response.data);
            if (response.status === 200) {
                ResetInputAndMsg();
                setSuccess(response.data);
                successMsg.current.classList.add('active');
                cPassword.current.classList.remove('err');
            }

        } catch (error) {
            console.log(error.response);
            const errorResult = error.response.data
            cPassword.current.classList.add('err');
            errorResult.error.forEach(result => {
                dispatch({ type: result.param, payload: result.msg })
            });
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
                                <input type="text" ref={email} onKeyDown={resetClass} />
                                <p className="err-message">{state.email}</p>
                            </div>
                            <div class="object">
                                <h3>Password:</h3>
                                <input type="password" ref={password} onKeyDown={resetClass} />
                                <p className="err-message">{state.password}</p>
                            </div>
                            {
                                signUp ?
                                    <>
                                        <div class="object">
                                            <h3>Confirm Password:</h3>
                                            <input type="password" ref={cPassword} onKeyDown={resetClass} />
                                            <p className="err-message"></p>
                                        </div>
                                        <button onClick={Register}>Sign Up</button>
                                        <p ref={successMsg} className="success-message">{success}</p>
                                    </>
                                    :
                                    <button onClick={Login}>Sign In</button>

                            }
                            <Google label={`${signIn ? "Sign In" : "Sign Up"} with Google`} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
