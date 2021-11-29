import React from 'react'
import './index.css'
import * as FaIcons from 'react-icons/fa'
import { BrowserRouter as Router, Link } from 'react-router-dom'

function Navbar () {

    return(
        <Router>
            <div className='container'>
                <div className = "Home" style={{'background':'transparent'}}>
                    <Link to='/'>
                        <FaIcons.FaHome size={35} style={{'backgroundColor': 'transparent', 'height': '35px'}}/>      
                    </Link>
                </div>

                <div className = "Perfil" style={{'backgroundColor':'transparent', 'textDecoration':'none'}}>
                    <Link to='/register' style={{'textDecoration':'none'}}>
                           <h2>Perfil</h2> 
                    </Link>
                </div>

                <div className = "Tasks" style={{'backgroundColor':'transparent'}}>
                    <Link to='/register' style={{'textDecoration':'none'}}>
                           <h2>Tarefas</h2> 
                    </Link>
                </div>

                <div className = "Lists" style={{'backgroundColor':'transparent', 'textDecoration':'none'}}>
                    <Link to='/register' style={{'textDecoration':'none'}}>
                           <h2>Listas</h2> 
                    </Link>
                </div>

            </div>
        </Router>
        
    )
}

export default Navbar
