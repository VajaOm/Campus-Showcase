import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import topPattern from '../assets/add_project_pattern.png';
import CheckIcon from '@mui/icons-material/Check';

export default function EventsPage() {

    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [participatedEvents, setParticipatedEvents] = useState([]);
    const [isParticipant, setIsParticipant] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/event/getevents', { withCredentials: true });
                setEvents(response.data.data);

                const response2 = await axios.get('http://localhost:5000/user/participatedEvents', { withCredentials: true });

                setParticipatedEvents(response2.data.data);

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

    const filteredEvents = events.filter(event =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const participateBtnClickHandler = async (id) => {

        try {

            const response = await axios.patch(`http://localhost:5000/event/${id}/addParticipate`, {}, {
                withCredentials: true
            });

            const response2 = await axios.get('http://localhost:5000/user/participatedEvents', { withCredentials: true });

            setParticipatedEvents(response2.data.data);

            console.log(response)

            if (response.status === 200) {
                setIsParticipant(true)
            }


        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div className='mt-10 min-h-screen' style={{ backgroundImage: `url(${topPattern})` }} >
                <h1 className='text-xl lg:text-4xl'>Events</h1>

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
                                {
                                    participatedEvents.includes(event._id) && isParticipant ?
                                        <button className='bg-[#] border-2 border-dotted hover:bg-[#535C91] duration-300 text-sm  sm:text-md rounded-md text-white font-semibold p-1 py-2' onClick={() => participateBtnClickHandler(event._id)}><CheckIcon /> Participated</button>
                                        :
                                        <button className='bg-[#9290C3] hover:bg-[#535C91] duration-300 text-sm  sm:text-md rounded-md text-black font-semibold p-2' onClick={() => participateBtnClickHandler(event._id)}><EventSeatIcon /> Participate</button>
                                }

                                <Link className='p-2 px-3 md:px-4 rounded-md bg-[#1B1A55] border-2 text-white hover:bg-[#535C91] text-md md:text-lg lg:text-md duration-300' to={`/dashboard/events/${event._id}`}>View</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
