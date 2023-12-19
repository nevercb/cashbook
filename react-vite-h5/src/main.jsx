// import React from 'react'
import {createRoot} from 'react-dom/client'
import 'amfe-flexible/index.js'
import './index.css'
import App from './App.jsx'
import {
  BrowserRouter as Router,
} from "react-router-dom"
const root = createRoot(document.getElementById("root"));
root.render(
    <Router>
      <App />
    </Router>
)