/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
// import { useState } from 'react'
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import routes from '../src/router/index.js'

// function App() {
//   return <>
//     <Routes>
//       {routes.map(route => <Route exact key = {route.path} 
//       path = {route.path} element = {<route.element />} />)}
//     </Routes>
//   </>
// }

// export default App

// App.jsx
import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import routes from '@/router'
import { ConfigProvider } from 'zarm'
import zhCN from 'zarm/lib/config-provider/locale/zh_CN'
// import 'zarm/dist/zarm.css'


function App() {
  return <>
      <ConfigProvider locale={zhCN}>
        <Router>
          <Routes>
          {routes.map(route => <Route exact key={route.path} path={route.path} element={<route.component />} />)}
          </Routes>
        </Router>
    </ConfigProvider>

   </>
}

export default App
