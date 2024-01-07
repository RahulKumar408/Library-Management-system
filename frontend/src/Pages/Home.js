import React from 'react'

import About from '../Components/About'
import Footer from '../Components/Footer'
import WelcomeBox from '../Components/WelcomeBox'

function Home() {
    return (
        <div id='home'>
            <WelcomeBox/>
            <About/>
            <Footer/>
        </div>
    )
}

export default Home
