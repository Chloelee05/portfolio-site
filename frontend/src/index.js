// frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import ParticleBackground from './ParticleBackground';
import './index.css';  // CRA 기본 스타일

const container = document.getElementById('particles-root');
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <ParticleBackground />
  </React.StrictMode>
);
