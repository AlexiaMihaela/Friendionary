import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './Register';
import Login from './Login';
import Start from './Start';
import Game from './Game';
import ModifyWord from './ModifyWord';


function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/start" element={<Start />} />
          <Route path="/game" element={<Game />} />
          <Route path="/modifyWord" element={<ModifyWord />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
 
  

  return (
    <>
      <h1>Welcome to Friendionary</h1>
      <div className="button-container">
        <a href="/register" className="Registerbutton">Register</a>
        <a href="/login" className="Loginbutton">Login</a>
      </div>

     
    </>
  );
}


export default App;
