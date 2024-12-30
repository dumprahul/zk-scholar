import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Choice from './components/Choice';
import LandingPage from './components/LandingPage';
import ConnectWallet from './components/ConnectWallet';
import TestEnd from './components/TestEnd';
import Final from './components/Final';
import Check from './components/Check';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Choice" element={<Choice />} />
        <Route path="/ConnectWallet" element={<ConnectWallet />} />
        <Route path="/TestEnd" element={<TestEnd />} />
        <Route path="/Final" element={<Final />} />
      </Routes>
    </Router>
  );
}

export default App;
