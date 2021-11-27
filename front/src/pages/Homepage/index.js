import React, { useState, useEffect, useRef } from 'react'
import Wave from 'react-wavify';
import * as FaIcons from 'react-icons/fa'
import * as MdIcons from 'react-icons/md'
import './index.css'

function Homepage() {

    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const [isSecondActive, setIsSecondActive] = useState(false)
    const [isFirstWave, setIsFirstWave] = useState(true)
    const counter = useRef(0)

    function toggle() {
        setIsFirstWave(false)
        setIsActive(!isActive)
    }

    function reset() {
        setMinutes(0)
        setSeconds(0)
        setIsActive(false)
    }

    
    useEffect(() => {
        let interval = null

        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1)
            }, 10)
            if (seconds===60){
                setMinutes(minutes => minutes +1)
                setSeconds(0)
            }

            if (minutes === 25) {
                
                setSeconds(0)
                setIsSecondActive(true)
                setIsActive(false)
                counter.current++
                console.log(counter)

                if (counter % 4 === 0) {
                    console.log('entrei')
                    console.log(minutes)
                    setMinutes(15)
                    console.log(minutes)
                }
                else {
                    console.log("Entrei no else")
                    setMinutes(5)
                }
            }
                
        } else if (!isActive && minutes >= 0 && counter % 4 !== 0 ) {
            clearInterval(interval)
        
            if (isSecondActive) {
                interval = setInterval(() => {
                    if (minutes > 0) {
                        setSeconds(seconds => seconds - 1)
                    }
                }, 10)}

                if (seconds < 0) {
                    setMinutes(minutes => minutes - 1)
                }


                if (seconds === 0 && minutes === 0 && isSecondActive) {
                    setIsSecondActive(false)
                    setIsActive(true)
                }
                
        } else if (!isActive && minutes >= 0 && counter % 4 === 0){
            clearInterval(interval)
            
            if (isSecondActive) {
                interval = setInterval(() => {
                    if (minutes >= 0 && seconds >= 0) {
                        setSeconds(seconds => seconds - 1)
                    }
                }, 10)}

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

    }, [isActive, isSecondActive, seconds, minutes, counter])

    return (
        <div className='main'>
            
            <div className="menu" style={{ 'backgroundColor': 'transparent'}}>
                <h1 className='timer' style={{'fontSize':'8vw', 'marginTop':'32px', 'backgroundColor': 'transparent'}}>
                    {`${minutes < 10 ? `0${minutes}` : minutes}`} : {`${seconds < 10 ? `0${seconds}` : seconds}`}
                </h1>

                <div className='task' style={{'fontSize':'4vw', 'backgroundColor': 'transparent', 'marginTop':'3vh', 'marginBottom':'3vh'}}>
                    Tarefa
                </div>

                <div className="buttons" style={{'backgroundColor': 'transparent'}}>
                    <div className="play-button">
                        { 
                        (isActive && !isSecondActive) || (isSecondActive && !isActive) ?  
                        <FaIcons.FaPause onClick={toggle} style={{'backgroundColor': 'transparent', 'height': '18px' }}/> :
                        <FaIcons.FaPlay onClick={toggle} style={{'backgroundColor': 'transparent', 'height': '18px'}}/>
                        }
                    </div>
                    <div className="reload-button">
                        <MdIcons.MdRefresh onClick={reset} size={28} style={{'backgroundColor': 'transparent', 'height': '30px'}}/>
                    </div>
                </div>
            </div>

            <div className={
                isFirstWave ? 'wave-default' : 
                isActive === true && isSecondActive === false && !isFirstWave ? 'wave-up' : 
                isActive === false && isSecondActive === true && !isFirstWave ? 'wave-down' : 'foda-se'
            }
            >
                <Wave
                 style={{ zIndex: 10 }} 
                 options={{ speed: 0.35 }} 
                 fill="#20c4fa" 
                 />
            </div>
        </div>
    );
}

export default Homepage
