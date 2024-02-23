import './App.css'
import Login from './components/Login';
import PageNotFound from './components/PageNotFound';
import Registration from './components/Registration';
import { Routes, Route } from 'react-router-dom';
import ProfilePage from './components/ProfilePage';
import Home from './components/Home';
import React,{useState, useEffect} from 'react' 
// import ProtectRoute from './ProtectRoute';

function App() {

  return (
    <>
      <Routes>

        <Route path='/' element={<Login />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/resetpassword' element={<PageNotFound />} />
        <Route path='/profile' element={<ProfilePage />} />
        {/* <Route path='/home/profile' element={<ProtectRoute Component={ProfilePage} />} /> */}
        <Route path='/home' element={<Home />} />
      </Routes>
        {/* <ProfilePage /> */}


    </>
  )
}

export default App
