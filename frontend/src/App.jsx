import './App.css'
import Login from './components/Login';
import PageNotFound from './components/PageNotFound';
import Registration from './components/Registration';
import { Routes, Route } from 'react-router-dom';
import StudentProfilePage from './components/StudentProfilePage';
import Home from './components/Home';
import React,{useState, useEffect} from 'react' 
import FacultyProfilePage from './components/FacultyProfilePage';
// import ProtectRoute from './ProtectRoute';

function App() {

  return (
    <>
       <Routes>

        <Route path='/' element={<Login />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/resetpassword' element={<PageNotFound />} />
        <Route path='/studentProfile' element={<StudentProfilePage />} />
        <Route path='/facultyProfile' element={<FacultyProfilePage />}/>
         <Route path='/home' element={<Home /> } />
      </Routes>  
       
 

    </>
  )
}

export default App
