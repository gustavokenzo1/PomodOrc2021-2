import React, { useState } from 'react'
import Wave from 'react-wavify';
import './index.css'

function Homepage() {

    const [time, setTime] = useState(0)

    /* function handleTime() {

    } */

    return (
        <div className='main'>
            
            <div className="menu">
                    {time}

                    {/* <button onClick={handleTime}>
                        Botão
                    </button>    */}   
            </div>

            <div id="wave">
                <Wave style={{ zIndex: 10 }} options={{ speed: 0.35 }} fill="#20c4fa" />
            </div>
        </div>
    );
}

export default Homepage
