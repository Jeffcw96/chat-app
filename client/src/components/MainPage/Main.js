import React from 'react'
import Google from './Google'
import './Main.css'
import Bubble from './Bubble'

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
            </div>
        </div>
    )
}
