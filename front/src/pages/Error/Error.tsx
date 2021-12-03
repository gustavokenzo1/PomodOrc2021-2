import React from 'react'
import YouTube from 'react-youtube'
import './Error.css'

function Error() {
    const opts = {
        height: '100%',
        width: '100%',
    }

    function onReady(event) {
        event.target.playVideo()
    }
    
    return (
        <div className='rickContainer'>
            <div className='rickRoll'>
                <YouTube 
                    videoId={'xvFZjo5PgG0'}
                    opts={opts}
                    onReady={onReady}
                />
                <h1 className='errou'>A página que você está procurando não existe!</h1>
            </div>
        </div>
    )
}

export default Error
