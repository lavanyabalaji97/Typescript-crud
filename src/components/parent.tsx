import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './Signup'
import LoginPage from './LoginForm'

function parent() {
  return (
    <div>
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Signup/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/login' element={<LoginPage/>} />
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default parent