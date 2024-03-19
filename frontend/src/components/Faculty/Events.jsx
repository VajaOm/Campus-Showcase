import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Events() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/event/getevents', { withCredentials: true });
                setEvents(response.data.data);
                console.log(response.data.data)
            } catch (error) {
                console.log('Error in fetching the events:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <div>
                <Link className='bg-[#9290C3] text-white hover-bg[#535C91] duration-300 p-2 rounded-md' to={'/admindashboard/events/eventcreate'}>Create Event</Link>

                <div className='flex flex-col'>
                    {events.map((event, index) => (
                        <div key={index} className='flex p-3 lg:px-6 bg-[#1B1A55] mt-10 rounded-lg text-sm gap-4 md:gap-8'>
                            <div className='w-2/12'>
                                <img src={event?.image} alt="event image"/>
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
                            <div className='flex justify-end items-center ml-auto'>
                                <Link className='p-2 px-3 md:px-4 rounded-md bg-[#9290C3] text-black hover:bg-[#535C91] text-md md:text-lg lg:text-xl ' to={`/admindashboard/events/${event._id}`}>View</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Function to format date in "dd/mm/yyyy" format
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};
