import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Semester from './Semester';
import Students from './Students';
import Projects from './Projects';
import ProjectDetails from './ProjectDetails';
import EventCreation from './EventCreation';
import Events from './Events';
import EventDetails from './EventDetails';
import logo from '../../assets/logo.png';

export default function AdminDashboard() {

    const navigate = useNavigate();

    const eventBtnClickHandler = () => {
        navigate('/admindashboard/events')
    } 

    return (
        <div className=''>
            <nav className='flex justify-between border-b-2 p-2'>
                <div className='flex items-baseline'>
                <h1 className='text-md'> <img src={logo} alt="" className='w-10 inline-block ' /> Project Showcase</h1>
                </div>
                <div className='flex lg:gap-24 items-center'>
                    <h1 onClick={eventBtnClickHandler} className='lg:text-xl hover:bg-[#1B1A55] px-4 duration-300 p-2 rounded-md'>Event</h1>
                    <h1>Image</h1>
                </div>

            </nav>
            <div >

                <Routes >
                    <Route path='/students/:semester' element={<Students />}></Route>
                    <Route path='/projects/:semester/:id' element={<Projects />}></Route>
                    <Route path='/project/:semester/:projectId' element={<ProjectDetails />}></Route>
                    <Route path='/' element={<Semester />}></Route>
                    <Route path='/events/eventcreate' element={<EventCreation />}></Route>
                    <Route path='/events/:eventId' element={<EventDetails />}></Route>
                    <Route path='/events' element={<Events />}></Route>
                </Routes>

            </div>
        </div>
    )
}
