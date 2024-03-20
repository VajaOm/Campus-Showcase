import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import image from '../../assets/circle-scatter-haikei.png';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Events() {
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/event/getevents', { withCredentials: true });
                setEvents(response.data.data);
            } catch (error) {
                console.log('Error in fetching the events:', error);
            }
        };

        fetchData();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const deleteBtnHandler = async (eventId) => {
        try {
            const response = await axios.get(`http://localhost:5000/event/eventdelete/${eventId}`, { withCredentials: true });
            console.log(response);
            // Remove the deleted event from the state
            setEvents(events.filter(event => event._id !== eventId));
        } catch (error) {
            console.log("Error in deleting the event", error);
        }
    };

    // Filter events based on the search term
    const filteredEvents = events.filter(event =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className='mt-10 ' style={{ backgroundImage: `url(${image})` }}>
                <div className='mt-14 lg:ml-12 text-white'>
                    <Link to={`/admindashboard`} className='ml-5 lg:ml-0 text-lg p-2 hover:bg-[#1B1A55] rounded-md duration-300'><ArrowBackIcon />Back</Link>
                </div>
                <div className='flex justify-center'>
                    <Link className='lg:text-xl bg-[#9290C3] hover:bg-[#535C91]  p-2 rounded-md text-black font-semibold duration-300' to={'/admindashboard/events/eventcreate'}>Create Event</Link>
                </div>
                <div className='mt-10 flex justify-center'>
                    <input
                        type="text"
                        className='w-11/12 rounded-md focus:outline-none mb-5 p-2 md:p-2 text-black'
                        placeholder='Search event'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className='flex flex-col items-center '>
                    {filteredEvents.map((event, index) => (
                        <div key={index} className='md:w-11/12 flex p-3 lg:px-6 bg-[#1B1A55] mt-10 rounded-xl text-sm gap-4 md:gap-8'>
                            <div className='w-2/12'>
                                <img src={event?.image} alt="event image" />
                            </div>
                            <div className='flex flex-col md:gap-2 lg:gap-4 justify-center'>
                                <div>
                                    <h1 className='text-lg md:text-xl'>{event?.name}</h1>
                                </div>
                                <div>
                                    <h1 className='md:text-md lg:text-lg'>Start Date : {formatDate(event?.startDate)}</h1>
                                </div>
                                <div>
                                    <h1 className='md:text-md lg:text-lg'>End Date : {formatDate(event?.endDate)}</h1>
                                </div>
                            </div>
                            <div className='w-1/2 flex justify-end items-center ml-auto gap-2 sm:gap-10'>
                                <button className='bg-red-500 hover:bg-red-900 duration-300 text-sm  sm:text-md rounded-md text-white p-2' onClick={() => deleteBtnHandler(event._id)}><DeleteForeverIcon /> Delete</button>
                                <Link className='p-2 px-3 md:px-4 rounded-md bg-[#1B1A55] border-2 text-white hover:bg-[#535C91] text-md md:text-lg lg:text-md duration-300' to={`/admindashboard/events/${event._id}`}>View</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
