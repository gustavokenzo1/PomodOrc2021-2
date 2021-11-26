import React, { useState, useEffect } from 'react'
import Wave from 'react-wavify';
import * as FaIcons from 'react-icons/fa'
import * as MdIcons from 'react-icons/md'
import './index.css'

function Homepage() {

    const [minutes, setMinutes] = useState(0)
    const[seconds,setSeconds] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const [isSecondActive, setIsSecondActive] = useState(false)
    

    function toggle() {
        setIsActive(!isActive)
    }

    function reset() {
        setMinutes(0)
        setSeconds(0)
        setIsActive(false)
    }

    useEffect(() => {
        let interval = null
        let counter = 0

        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1)
            }, 1000)
            if(seconds===60){
                setMinutes(minutes => minutes +1)
                setSeconds(0)
            }

            if (minutes === 25) {
                setMinutes(5)
                setSeconds(0)
                setIsSecondActive(true)
                setIsActive(false)
                counter++
            }
                
        } else if (!isActive && minutes !== 0 && counter % 4 !== 0 ) {
            clearInterval(interval)
        
            if (isSecondActive) {
                interval = setInterval(() => {
                    if (minutes > 0) {
                        setSeconds(seconds => seconds - 1)
                    }
                }, 1000)}

                if (seconds === 0 && minutes === 0 && !isSecondActive) {
                    setIsSecondActive(false)
                    setIsActive(true)
                }
                
        }else if (!isActive && minutes !== 0 && counter % 4 === 0){
            clearInterval(interval)
            setMinutes(15)

            if (isSecondActive) {
                interval = setInterval(() => {
                    if (minutes > 0) {
                        setSeconds(seconds => seconds - 1)
                    }
                }, 1000)}

                if (seconds === 0 && minutes === 0 && !isSecondActive) {
                    setIsSecondActive(false)
                    setIsActive(true)
                }
            }

        return () => clearInterval(interval)

    }, [isActive, isSecondActive, seconds, minutes])
    
    function waveDirection () {
        if (isActive === false && isSecondActive === false) {
            return 'wave-default'
        }

        else if (isActive === true && isSecondActive === false) {
            return 'wave-up'
        }

        else {
            return 'wave-down'
        }
    }

    return (
        <div className='main'>
            
            <div className="menu" style={{ 'background-color': 'transparent'}}>
                <h1 classname='timer' style={{'font-size':150, 'marginTop':'32px', 'background-color': 'transparent'}}>
                    {`${minutes < 10 ? `0${minutes}` : minutes}`} : {`${seconds < 10 ? `0${seconds}` : seconds}`}
                </h1>

                <div classname='task' style={{'font-size':50, 'background-color': 'transparent', 'marginTop':'3vh', 'marginBottom':'3vh'}}>
                    Tarefa
                </div>

                <div className="buttons" style={{'background-color': 'transparent'}}>
                    <div className="play-button">
                        { 
                        isActive || isSecondActive ?  
                        <FaIcons.FaPause onClick={toggle} style={{'background-color': 'transparent', 'height': '18px' }}/> :
                        <FaIcons.FaPlay onClick={toggle} style={{'background-color': 'transparent', 'height': '18px'}}/>
                        }
                    </div>
                    <div className="reload-button">
                        <MdIcons.MdRefresh onClick={reset} size={28} style={{'background-color': 'transparent', 'height': '30px'}}/>
                    </div>
                </div>
            </div>

            <div id="wave">
                <Wave
                 style={{ zIndex: 10 }} 
                 options={{ speed: 0.35 }} 
                 fill="#20c4fa" 
                 className={waveDirection}
                 />
            </div>
        </div>
    );
}

export default Homepage
