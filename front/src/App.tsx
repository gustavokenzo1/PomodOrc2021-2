import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';

function App() {
  return (
    <>
      <Router>
        <div className='homepage'>
          <Homepage />
        </div>
        <div className='navbar' style={{ 'backgroundColor':'red' }}>
        <Navbar />
          <Routes>
            <Route path='/' />
          </Routes>
        </div> 
      </Router>
    </>
  );
}

export default App;
