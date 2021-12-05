import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Error from './pages/Error/Error';
import Profile from './pages/Profile/profile';
import List from './pages/List/List'
import TaskForm from './components/Tasks/TaskForm';


function App() {
  return (
    <div className='principalzona'>
      <Router>
          <Navbar />
        <Routes>
          <Route  path='/' element={<Homepage />} />
          <Route  path='/register' element={<Register />} />
          <Route  path='/login' element={<Login />} />
          <Route  path='/profile' element={<Profile />} />
          <Route  path='/lists' element={<List />} />
          <Route path='/tasks' element={<TaskForm />} />
          <Route path='*' element={<Error /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
