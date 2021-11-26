import React, { useState, useEffect } from 'react'
import Wave from 'react-wavify';
import './index.css'

function Homepage() {

    const [minutes, setMinutes] = useState(0)
    const [isActive, setIsActive] = useState(false)

    function toggle() {
        setIsActive(!isActive)
    }

    function reset() {
        setMinutes(0)
        setIsActive(false)
    }

    useEffect(() => {
        let interval = null
        if (isActive) {
            interval = setInterval(() => {
                setMinutes(minutes => minutes + 1)
            }, 1000)
        } else if (!isActive && minutes !== 0) {
            clearInterval(interval)
        }

        return () => clearInterval(interval)

    }, [isActive, minutes])

    return (
        <div className='main'>
            
            <div className="menu">
                <div classname='timer'>
                    {minutes}
                </div>

                <div classname='task'>
                    Tarefa
                </div>

                <div className="buttons">
                    <button className={`button-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
                        Iniciar
                    </button>
                    <button onClick={reset}>
                        Zerar
                    </button>
                </div>
            </div>

            <div id="wave">
                <Wave style={{ zIndex: 10 }} options={{ speed: 0.35 }} fill="#20c4fa" />
            </div>
        </div>
    );
}

export default Homepage
