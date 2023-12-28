import { useState } from 'react'
import './App.css'
import Navigation from './Components/Navigation'
import {Routes,Route} from"react-router-dom"
import SignUp from './Components/SignUp'
import Login from './Components/Login'
import Home from './Components/Home'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='/home' element={<Home/>} />
        </Route> 
      </Routes>
      
    </>
  )
}

export default App
