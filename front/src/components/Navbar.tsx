import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom'
import { SidebarData } from './SidebarData';
import { IconContext } from 'react-icons';
import './Navbar.css'

function Navbar() {

  const [sidebar, setSidebar] = useState(false)

  const showSidebar = () => {
    setSidebar(!sidebar)
    console.log(sidebar)
  }


  return (
    <>
      <IconContext.Provider value={{ color: '#000' }}>
        <div className="navbar">
          <Link to="#" className='menu-bars'>
            <div className='SidebarIcon' onClick={showSidebar} >
              <FaIcons.FaBars/>
            </div>
          </Link>
          <nav className={sidebar ? 'nav-menu active' :'nav-menu'}>
            <ul className='nav-menu-items' onClick={showSidebar}>
              <li className='navbar-toggle'>
                <Link to='#' className='menu-bars'>
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>
              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;