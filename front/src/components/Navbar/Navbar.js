import React, { useState, useEffect } from 'react'
import './Navbar.css'
import * as FaIcons from 'react-icons/fa'

function Navbar () {

    const [isLogged, setIsLogged] = useState(false)

    
    useEffect(() => {
        if (localStorage.getItem('user')) {
            setIsLogged(true)
        } else {
            setIsLogged(false)
        }
    }, [isLogged])

    function reloadPage() {
        window.location.reload()
    }

    function handleLogout() {
        localStorage.removeItem('user')
        window.location.reload()
    }

    return(
        <div className='container'>
            <div className='containerLeft'>
                
            </div>
            <div>   
                    { isLogged ? 
                    <>
                    <div className="containerRight">
                        <div className = "Perfil" style={{'backgroundColor':'transparent', 'textDecoration':'none'}}>
                            <a href='/profile' style={{'textDecoration':'none'}}>
                                   <h2>Perfil</h2> 
                            </a>
                        </div>
                        <h2 className='Perfil' onClick={handleLogout} href='/'>Logout</h2>
                    </div>
                    <div className='containerLeft'>
                        <div className = "Home" style={{'background':'transparent'}}>
                        <a href='/'>
                            <FaIcons.FaHome onClick={reloadPage} size={35} style={{'backgroundColor': 'transparent', 'height': '35px', 'cursor':'pointer'}}/>      
                        </a>
                        </div>
                            
                        <div className = "Tasks" style={{'backgroundColor':'transparent'}}>
                            <a href='/register' style={{'textDecoration':'none'}}>
                                   <h2>Tarefas</h2> 
                            </a>
                        </div>
                            
                        <div className = "Lists" style={{'backgroundColor':'transparent', 'textDecoration':'none'}}>
                        <a href='/register' style={{'textDecoration':'none'}}>
                               <h2>Listas</h2> 
                        </a>
                </div>
                    </div>
                    </>
                    :
                    <>
                        <div className='containerLeft'>
                            <div className = "Home" style={{'background':'transparent'}}>
                                <a href='/'>
                                    <FaIcons.FaHome onClick={reloadPage} size={35} style={{'backgroundColor': 'transparent', 'height': '35px', 'cursor':'pointer'}}/>      
                                </a>
                            </div>
                        </div>
                        <div className='containerRight'>
                            <a href='/login' className='Perfil'>
                                <h2>Login</h2> 
                            </a>
                            <a href='/register' className='Perfil'>
                                <h2>Registrar</h2> 
                            </a>
                        </div>
                    </>
                    }
                </div>
        </div>
        
    )
}

export default Navbar
