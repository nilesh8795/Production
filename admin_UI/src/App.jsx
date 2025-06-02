import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Navbar from './components/Navbar'
import CreateTournamentForm from './components/CreateTournamentForm'
import History from './components/History'

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path='/admin/createTournament' element={<CreateTournamentForm/>}/>
        <Route path='tournament/History' element={<History/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
