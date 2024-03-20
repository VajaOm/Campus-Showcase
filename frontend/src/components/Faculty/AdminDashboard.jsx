import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Semester from './Semester';
import Students from './Students';
import Projects from './Projects';
import ProjectDetails from './ProjectDetails';
import EventCreation from './EventCreation';
import Events from './Events';
import EventDetails from './EventDetails';
import logo from '../../assets/logo.png';
import axios from 'axios';
import FacultyProfilePage from './FacultyProfilePage';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [avatar, setAvatar] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const eventBtnClickHandler = () => {
        navigate('/admindashboard/events');
    };

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("http://localhost:5000/user/profile", {
                    withCredentials: true,
                });
                setAvatar(response.data.data.avatar);
            } catch (error) {
                console.log("Error in profile page:", error);
            }
        })();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const profileImgClickHandler = () => {
        setDropdownOpen(!dropdownOpen); // Toggle dropdown state
    };

    const logoutHandler = async () => {
        const response = await axios.get('http://localhost:5000/user/logout', { withCredentials: true });

        if (response.status === 200) {
            navigate('/');
        }
    };

    const updateHandler = () => {
        navigate('/admindashboard/profile');
    };

    return (
        <div className=''>
            <nav className='flex justify-between border-b-2 items-baseline'>
                <div className='flex items-baseline'>
                    <h1 className='text-md'> <img src={logo} alt="" className='w-10 inline-block ' /> Project Showcase</h1>
                </div>
                <div className='flex lg:gap-24 gap-3 items-center'>
                    <h1 onClick={eventBtnClickHandler} className='lg:text-xl hover:bg-[#1B1A55] px-4 duration-300 p-2 rounded-md'>Event</h1>
                    <div className="relative" ref={dropdownRef}>
                        <img src={avatar} alt="profile image" className='cursor-pointer mr-5' style={{ clipPath: 'circle()', width: '50px' }} onClick={profileImgClickHandler} />
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
                                <button className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-200" onClick={updateHandler}>Update</button>
                                <button className="block w-full px-4 py-2 text-left text-red-500 font-semibold hover:bg-gray-200" onClick={logoutHandler}>Logout</button>
                            </div>
                        )}
                    </div>
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
                    <Route path='/profile' element={<FacultyProfilePage avatar={avatar} />}></Route>
                    <Route path='/events' element={<Events />}></Route>
                </Routes>
            </div>
        </div>
    )
}
