import React, { useState } from 'react';
import SideBar from './SideBar';
import MyProjectsPage from './MyProjectsPage';
import AddProject from './AddProject';
import topPattern from '../assets/add_project_pattern.png';
import Explore from './Explore';
import EventsPage from './EventsPage';
import StudentProfilePage from './StudentProfilePage';
import { Routes, Route } from 'react-router-dom'
import EditProjectPage from './EditProjectPage';

function Dashboard() {
  const [showMenu, setShowMenu] = useState(false);
  

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };


  return (
    <div className="flex w-full h-screen overflow-hidden">
      <SideBar showMenu={showMenu} toggleMenu={toggleMenu}  />
      <div className={`lg:ml-16 w-full flex-1 overflow-y-auto`} style={{ backgroundImage: `url(${topPattern})` }}>
       
        <Routes>
          <Route path='myprojects' element={<MyProjectsPage />}></Route>
          <Route path='addproject' element={<AddProject />}></Route>
          <Route path='explore' element={<Explore />}></Route>
          <Route path='explore' element={<Explore />}></Route>
          <Route path='events' element={<EventsPage />}></Route>
          <Route path='myprofile' element={<StudentProfilePage />}></Route>
          <Route path='myprojects/editproject/:projectId' element={<EditProjectPage />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
