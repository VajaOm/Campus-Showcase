import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Semester from './Semester';
import Students from './Students';
import Projects from './Projects';
import ProjectDetails from './ProjectDetails';
import image from '../../assets/circle-scatter-haikei.png';
import EventCreation from './EventCreation';

export default function AdminDashboard() {
    return (
        <div className=''>
            <nav className='flex justify-between border-b-2 p-4'>
                <h1 className='text-md'>Project Showcase</h1>
                <h1>Image</h1>
                
            </nav>
            <div className="bg-no-repeat bg-cover " style={{ backgroundImage: `url(${image})` }}>




            <Routes >
                <Route path='/students/:semester' element={<Students />}></Route>
                <Route path='/projects/:id' element={<Projects />}></Route>
                <Route path='/project/:projectId' element={<ProjectDetails />}></Route>
                <Route path='/' element={<Semester /> }></Route>
                <Route path='/eventcreate' element={<EventCreation />}></Route>
            </Routes>

</div>
        </div>
    )
}
