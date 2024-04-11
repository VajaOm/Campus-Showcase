import './App.css'
import Login from './components/Login';
import PageNotFound from './components/PageNotFound';
import Registration from './components/Registration';
import { Routes, Route } from 'react-router-dom';
import StudentProfilePage from './components/StudentProfilePage';

import React, { useState, useEffect } from 'react'
import FacultyProfilePage from './components/Faculty/FacultyProfilePage';
// import StudentProfilePage from './StudentProfilePage'
import AddProject from './components/AddProject';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/Faculty/AdminDashboard';
import EmailVerification from './components/EmailVerification';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import MidPage from './components/MidPage';

function App() {
  

  return (
    <>
    
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/studentProfile' element={<StudentProfilePage /> } />
        <Route path='/facultyProfile' element={<FacultyProfilePage />} />
        <Route path='/dashboard/*' element={<Dashboard   />} />
        <Route path='/admindashboard/*' element={<AdminDashboard />} />
        <Route path='/emailVerification' element={<EmailVerification />} />
        <Route path='/emailVerification/:role/:id/:token' element={<EmailVerification />} />
        <Route path='/forgotPassword' element={<ForgotPassword />}/>
        <Route path='/verifyPasswordResetToken/:role/:id/:token' element={<MidPage />} />
        <Route path='/verifyPasswordResetToken' element={<MidPage />} />
        <Route path='/resetPassword/:role/:id' element={<ResetPassword />} />
      </Routes>


    </>
  )
}

export default App
