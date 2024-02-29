import React, { useState } from 'react';
import SideBar from './SideBar';
import MyProjectsPage from './MyProjectsPage';
import AddProject from './AddProject';
import topPattern from '../assets/add_project_pattern.png';
import Explore from './Explore';
import EventsPage from './EventsPage'
import StudentProfilePage from './StudentProfilePage'

function Dashboard() {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState('myProject');

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'MyProjectsPage':
        return <MyProjectsPage />;
      case 'addProject':
        return <AddProject />;

      case 'Explore':
        return <Explore />

      case 'Events':
        return <EventsPage />

      case 'MyProfile' : 
      return <StudentProfilePage />

      default:
        return <MyProjectsPage />;
    }
  };

  return (
    <div className="flex w-full h-screen overflow-hidden">

      <SideBar showMenu={showMenu} toggleMenu={toggleMenu} setSelectedComponent={setSelectedComponent} />
      <div className={`lg:ml-16 w-full flex-1 overflow-y-auto`} style={{ backgroundImage: `url(${topPattern})` }}>
        {renderComponent()}
      </div>
    </div>
  );
}

export default Dashboard;
