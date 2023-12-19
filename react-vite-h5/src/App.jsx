/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// App.jsx
import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import routes from '@/router'
import { ConfigProvider } from 'zarm'
import zhCN from 'zarm/lib/config-provider/locale/zh_CN'
import NavBar from '@/container/NavBar'
// import 'zarm/dist/zarm.css'
import {useLocation} from 'react-router-dom'

function App() {
  const location = useLocation()
  const { pathname } = location
  const needNav = ['/', '/data', '/user']
  const [showNav, setShowNav] = useState(location.pathname)
  useEffect(() => {
    setShowNav(needNav.includes(pathname))
  }, [pathname]) 
  return <>
      <ConfigProvider primaryColor={'#007fff'} locale={zhCN}>
          <Routes>
          {routes.map(route => <Route exact key={route.path} path={route.path} element={<route.component />} />)}
          </Routes>
    </ConfigProvider>
    <NavBar showNav={showNav} />
   </>
}

export default App
