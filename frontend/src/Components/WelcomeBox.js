import React from 'react'
import '../css/WelcomeBox.css'

function WelcomeBox() {
    return (
        <div className='welcome-box'>
            <p className='welcome-title'>WELCOME TO OUR LIBRARY !</p>
            <p className='welcome-message'>Nourish Your Mind, Ignite Your Imagination<br/>
            <span className='welcome-submessage'>Grab A Book To Read</span></p>
        </div>
    )
}

export default WelcomeBox
