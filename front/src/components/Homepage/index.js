import React, { useState } from 'react'
import Wave from 'react-wavify';
import './index.css'

function Homepage() {

    const [time, setTime] = useState(0)

    return (
        <>
            
            <div className="menu">

                <div className="clock">
                    {time}
                </div>

                <div className="task">

                </div>

                <div className="buttons">

                </div>
                
            </div>

            <div id="wave">
                <Wave style={{ zIndex: 10 }} options={{ speed: 0.35 }} fill="#20c4fa" />
            </div>
        </>
    );
}

export default Homepage
