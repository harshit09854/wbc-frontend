import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Example in src/main.jsx or src/index.js
import 'bootstrap/dist/css/bootstrap.min.css';
// ... rest of your code
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
