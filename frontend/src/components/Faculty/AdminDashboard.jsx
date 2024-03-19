import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Semester from './Semester';
import Students from './Students';
import Projects from './Projects';
import ProjectDetails from './ProjectDetails';
import image from '../../assets/circle-scatter-haikei.png';
import EventCreation from './EventCreation';
import Events from './Events';

export default function AdminDashboard() {

    const navigate = useNavigate();

    const eventBtnClickHandler = () => {
        navigate('/admindashboard/events')
    } 

    return (
        <div className=''>
            <nav className='flex justify-between border-b-2 p-4'>
                <h1 className='text-md'>Project Showcase</h1>
                <div className='flex gap-24'>
                    <h1 onClick={eventBtnClickHandler}>Event</h1>
                    <h1>Image</h1>
                </div>

            </nav>
            <div className="bg-no-repeat bg-cover " style={{ backgroundImage: `url(${image})` }}>




                <Routes >
                    <Route path='/students/:semester' element={<Students />}></Route>
                    <Route path='/projects/:id' element={<Projects />}></Route>
                    <Route path='/project/:projectId' element={<ProjectDetails />}></Route>
                    <Route path='/' element={<Semester />}></Route>
                    <Route path='/events/eventcreate' element={<EventCreation />}></Route>
                    <Route path='/events' element={<Events />}></Route>
                </Routes>

            </div>
        </div>
    )
}
