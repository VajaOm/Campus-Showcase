import React, { useState } from 'react';
import Sidebar from './SideBar';
import AddProject from './AddProject';

function Dashboard() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    console.log(showMenu)
    setShowMenu(!showMenu);
  };

  return (
    <div className="flex w-full h-screen overflow-hidden ">
      <Sidebar showMenu={showMenu} toggleMenu={toggleMenu}  />
      <AddProject showMenu={showMenu} />
    </div>
  );
}

export default Dashboard;
