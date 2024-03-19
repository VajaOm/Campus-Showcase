import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function EventDetails() {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [isImg, setIsImg] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/event/eventdetails/${eventId}`, { withCredentials: true });
                const eventData = response.data.data;

                if (eventData?.image) {
                    setIsImg(true);
                }

                // Format start date
                const startDate = new Date(eventData.startDate);
                const formattedStartDate = `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`;

                // Format end date
                const endDate = new Date(eventData.endDate);
                const formattedEndDate = `${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}`;

                setEvent({ ...eventData, startDate: formattedStartDate, endDate: formattedEndDate });
            } catch (error) {
                console.log('Error in fetching the events:', error);
            }
        };

        fetchData();
    }, [eventId]);

    return (
        <div className='flex justify-center mt-10'>
            <div className='w-11/12 lg:w-8/12 flex flex-col gap-5 text-justify '>

                <div className='flex flex-col items-center gap-4'>
                    <h1 className='text-center text-xl md:tex-2xl lg:text-3xl font-bold'>{event?.name}</h1>
                    {isImg && <img src={event?.image} alt="event Image" className='w-1/2' />}
                </div>
                <div>
                    <h1 className='text-lg font-semibold'>Description :</h1>
                    <div className='flex justify-center'>
                        <ul className='list-disc w-11/12 mt-3'>
                            <li>{event?.description}</li>
                        </ul>
                    </div>
                </div>
                <div className='flex flex-col items-center'>
                    <h1 className='text-lg font-semibold' >Start Date : {event?.startDate}</h1>
                    <h1 className='text-lg font-semibold'>End Date : {event?.endDate}</h1>
                </div>
                <div className='w-full'>
                    <h1 className='text-lg font-semibold'>Eligibility Criteria :</h1>
                    <div className='flex justify-center'>
                        <ul className='list-disc w-11/12 mt-3'>
                            <li>{event?.eligibilityCriteria}</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <h1 className='text-lg font-semibold'>Judging Criteria :</h1>
                    <div className='flex justify-center'>
                        <ul className='list-disc w-11/12 mt-3'>
                            <li>{event?.judgingCriteria}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
