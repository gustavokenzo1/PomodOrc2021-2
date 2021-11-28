import React, { useState } from 'react'
import './index.css'
import * as FaIcons from 'react-icons/fa'
import { BrowserRouter as Router, Link } from 'react-router-dom'




function Navbar () {
    return(
        <Router>
            <div className='container'>
                <div className = "Home" style={{'background':'transparent','display':'flex', 'flexDirection':'row'}}>
                    <Link to='/'>
                        <FaIcons.FaHome size={30} style={{'backgroundColor': 'transparent', 'height': '30px' }}/>      
                    </Link>
                </div>
                <div className = "Tasks" style={{'fontSize':"20px", 'backgroundColor':'black', 'display':'flex', 'flexDirection':'row'}}>
                    <Link to='/'>
                           <h2>Tasks</h2> 
                    </Link>
                </div>
            </div>
        </Router>
        
    )
}

export default Navbar
