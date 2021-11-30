import React, { useState, useEffect } from 'react'
import Wave from 'react-wavify';
import * as FaIcons from 'react-icons/fa'
import * as MdIcons from 'react-icons/md'
import api from '../../services/api';
import './index.css'

function Homepage() {

    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const [isSecondActive, setIsSecondActive] = useState(false)
    const [pause, setPause] = useState(false)
    const [wave, setWave] = useState(false)
    const [counter, setCounter] = useState(0)

    function toggle() {
        setIsActive(!isActive)
        setCounter(counter + 1)
        setWave(!wave)
    }

    function reset() {
        setMinutes(0)
        setSeconds(0)
        setIsActive(false)
        setIsSecondActive(false)
        setCounter(0)
        setPause(false)
        setWave(!wave)
    }

    function handlePause() {
        setPause(!pause)
    }
    
    useEffect(() => {
        let interval = null

        if (isActive && !isSecondActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1)
            }, 13) /* Aumentar em 30% o tempo de cada loop */
            if (seconds===60){
                setMinutes(minutes => minutes +1)
                setSeconds(0)
            }

            if (minutes === 25) {                
                setIsSecondActive(true)
                setIsActive(false)
                
                setMinutes(5)
            }
            
        } else if (!isActive && minutes >= 0 && isSecondActive) {
            clearInterval(interval)
            if (isSecondActive) {
                interval = setInterval(() => {
                    if (minutes >= 0 && seconds >=0) {
                        setSeconds(seconds => seconds - 1)
                    }
                }, 13)} /* Aumentar em 30% o tempo de cada loop */

                if (seconds === 0 && minutes !== 0) {
                    setMinutes(minutes => minutes - 1)
                    setSeconds(59)
                }


                if (seconds === 0 && minutes === 0 && isSecondActive) {
                    setIsSecondActive(false)
                    setIsActive(true)
                }
                
        }

        return () => clearInterval(interval)

    }, [isActive, isSecondActive, seconds, minutes])


    return (
        <div className='main'>
            
            <div className="menu" style={{ 'backgroundColor': 'transparent'}}>
                <h1 className='timer' style={{'fontSize':'8vw', 'marginTop':'32px', 'backgroundColor': 'transparent'}}>
                    {`${minutes < 10 ? `0${minutes}` : minutes}`} : {`${seconds < 10 ? `0${seconds}` : seconds}`}
                </h1>

                <div className='task' style={{'fontSize':'4vw', 'backgroundColor': 'transparent', 'marginTop':'3vh', 'marginBottom':'3vh'}}>
                    {}
                </div>

                <div className="buttons" style={{'backgroundColor': 'transparent'}}>
                    <div className="play-button" onClick={handlePause}>
                        { 
                        pause ?  
                        <FaIcons.FaPause onClick={toggle} style={{'backgroundColor': 'transparent', 'height': '18px' }}/> :
                        <FaIcons.FaPlay onClick={toggle} style={{'backgroundColor': 'transparent', 'height': '18px'}}/>
                        }
                    </div>
                    <div className="reload-button">
                        <MdIcons.MdRefresh onClick={reset} size={28} style={{'backgroundColor': 'transparent', 'height': '30px'}}/>
                    </div>
                </div>
            </div>

            <div 
            className={counter !== 0 ? 'waveMovement' : 'wave-default'}
            style={wave ?
                 {'animationPlayState':'running'} : 
                 {'animationPlayState':'paused'}
                }>
                <Wave
                 style={{ zIndex: 10 }} 
                 options={{ speed: 0.3 }} 
                 fill="#20c4fa" 
                 />
            </div>
        </div>
    );
}

export default Homepage
