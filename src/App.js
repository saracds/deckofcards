import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


import PlayerProvider from './context/PlayerProvider';
import Home from './pages/Home';
import Play from './pages/Play';


const App = () => {
  return (
    <PlayerProvider>
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/play" element={<Play/>} />
        </Routes>
      </BrowserRouter>
    </PlayerProvider>
  )
}

export default App
