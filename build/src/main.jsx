
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AnonAadhaarProvider } from "@anon-aadhaar/react";
// import Landing from './components/Landing.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AnonAadhaarProvider >
    <App/>
    </AnonAadhaarProvider>
  </StrictMode>,
)
