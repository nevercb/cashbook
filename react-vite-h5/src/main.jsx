// import React from 'react'
import ReactDOM from 'react-dom';
import 'amfe-flexible/index.js'
import './index.css'
import App from './App.jsx'
import {
  BrowserRouter as Router,
} from "react-router-dom"


// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
    <Router>
      <App />
    </Router>,
      document.getElementById('root')
)