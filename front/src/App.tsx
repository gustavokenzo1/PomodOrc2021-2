import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import Register from './pages/Register';
import Login from './pages/Login';


function App() {
  return (
    <div>
      <div className='navbar'>
        <Navbar />
      </div>
      <Router>
        <Routes>
          <Route  path='/' element={<Homepage />} />
          <Route  path='/register' element={<Register />} />
          <Route  path='/login' element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
