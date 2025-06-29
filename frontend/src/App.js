// frontend/src/App.js
import React from 'react';
import './App.css';
import ParticleBackground from './ParticleBackground';
import GalaxyBackground from './GalaxyBackground';

function App() {
  return (
    <div className="App">
      <GalaxyBackground />
      {/* <ParticleBackground /> */}
      <header className="App-header">
        <h1>Lee Chloe’s Portfolio</h1>
        <p>React + Flask Dynamic Background Demo</p>
      </header>
    </div>
  );
}

export default App;
