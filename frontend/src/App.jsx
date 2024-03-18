import './App.css'
import Login from './components/Login';
import PageNotFound from './components/PageNotFound';
import Registration from './components/Registration';
import { Routes, Route } from 'react-router-dom';
import StudentProfilePage from './components/StudentProfilePage';

import React, { useState, useEffect } from 'react'
import FacultyProfilePage from './components/FacultyProfilePage';
import AddProject from './components/AddProject';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/Faculty/AdminDashboard';
// import ProtectRoute from './ProtectRoute';

function App() {

  return (
    <>
      <Routes>

        <Route path='/' element={<Login />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/resetpassword' element={<PageNotFound />} />
        <Route path='/studentProfile' element={<StudentProfilePage />} />
        <Route path='/facultyProfile' element={<FacultyProfilePage />} />
        <Route path='/dashboard/*' element={<Dashboard />} />
        <Route path='/admindashboard/*' element={<AdminDashboard />} />
      </Routes>


    </>
  )
}

export default App
