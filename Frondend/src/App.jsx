import { useState } from 'react'
import './App.css'
import Navigation from './Components/Navigation'
import {Routes,Route} from"react-router-dom"
import SignUp from './Components/SignUp'
import Login from './Components/Login'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route> 
      </Routes>
      
    </>
  )
}

export default App
