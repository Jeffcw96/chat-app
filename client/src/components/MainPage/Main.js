import { React, useState, useRef, useEffect, useReducer } from 'react'
import { useHistory } from 'react-router-dom'
import Google from './Google'
import './Main.css'
import Bubble from './Bubble'
import image from './logo.jpg'
import axios from 'axios'
import { setCookie, getCookie } from '../Cookie/Cookie'

export default function Main() {
    const history = useHistory()
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

    useEffect(() => {
        const verifyToken = getCookie("token");

        if (verifyToken !== "") {
            proceedToChat()
        }
    }, [])

    function proceedToChat() {
        history.push({
            pathname: '/chat'
        })
    }

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
        dispatch({ type: 'RESET' })
    }

    async function Login() {
        console.log("login")
        try {
            if (password.current.value === "") {
                password.current.classList.add('err');
                dispatch({ type: ERR.PASSWORD, payload: 'Please Fill in your Password' });
                return
            }

            if (email.current.value === "") {
                email.current.classList.add('err');
                dispatch({ type: ERR.EMAIL, payload: 'Please Fill in your Email' });
                return
            }

            let user = {}
            user.email = email.current.value;
            user.password = password.current.value;

            const response = await axios.post(URL + "auth/login", user);
            console.log("response", response)
            const token = response.data.token;

            setCookie("token", token, 0.8);

            proceedToChat()

        } catch (error) {
            console.log(error.response);
            const errorResult = error.response.data
            password.current.classList.add('err');
            errorResult.error.forEach(result => {
                dispatch({ type: result.param, payload: result.msg })
            });
        }
    }

    async function Register() {
        try {
            if (password.current.value !== cPassword.current.value) {
                password.current.classList.add('err');
                cPassword.current.classList.add('err');
                dispatch({ type: ERR.REGISTER, payload: 'Please make sure the password is matched' })
                return
            }

            if (email.current.value === "") {
                email.current.classList.add('err');
                dispatch({ type: ERR.EMAIL, payload: 'Please Fill in your Email' })
                return
            }

            let user = {}
            user.email = email.current.value;
            user.password = cPassword.current.value;
            const response = await axios.post(URL + "auth/register", user);

            if (response.status === 200) {
                ResetInputAndMsg();
                cPassword.current.value = ""
                setSuccess(response.data.status);
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
                    {Array(5).fill(5).map((size, index) => (
                        <Bubble size={size} top="0" left="0" key={index} />
                    ))}
                </div>
                <h1>CONNECT YOU & ME</h1>
                <div className="flex align-top hori-between">
                    <div className="logo-container">
                        <img src={image} alt="logo image" />
                    </div>
                    <div className="sign-up-in-form">
                        <div className="flex hori-center">
                            <h2 className={signIn ? "active" : ""} onClick={() => swapTab('signIn')}>SIGN IN</h2>
                            <h2 className={signUp ? "active" : ""} onClick={() => swapTab('signUp')}>SIGN UP</h2>
                        </div>
                        <div className="action-container">
                            <div className="object">
                                <h3>Email:</h3>
                                <input type="text" ref={email} onKeyDown={resetClass} />
                                <p className="err-message">{state.email}</p>
                            </div>
                            <div className="object">
                                <h3>Password:</h3>
                                <input type="password" ref={password} onKeyDown={resetClass} />
                                <p className="err-message">{state.password}</p>
                            </div>
                            {
                                signUp ?
                                    <>
                                        <div className="object">
                                            <h3>Confirm Password:</h3>
                                            <input type="password" ref={cPassword} onKeyDown={resetClass} />
                                            <p className="err-message">{state.cPassword}</p>
                                            <p ref={successMsg} className="success-message">{success}</p>
                                        </div>
                                        <div className="sign-btn-container">
                                            <button onClick={Register} className="sign-btn">Sign Up</button>
                                        </div>
                                    </>
                                    :
                                    <div className="sign-btn-container">
                                        <button onClick={Login} className="sign-btn" >Sign In</button>
                                    </div>
                            }
                            <Google label={`${signIn ? "Sign In" : "Sign Up"} with Google`} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
