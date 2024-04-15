import axios from 'axios';
import { useEffect } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import image from '../../assets/add_project_pattern.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useNavigate } from 'react-router-dom';
import { Triangle } from 'react-loader-spinner';

export default function EventCreation() {

    const [event, setEvent] = useState({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        eligibilityCriteria: '',
        judgingCriteria: '',
        image: null
    })

    const [imgSelected, setImgSelected] = useState(false);
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you can handle form submission, like sending data to the server or any other action
        const formData = new FormData();

        for (const key in event) {
            formData.append(key, event[key]);
        }

        try {
            setLoader(true);
            const response = await axios.post("http://localhost:5000/event/eventcreate", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Accept': 'application/json',
                },
                withCredentials: true
            });

            if (response.status === 200) {
                setLoader(false);
                navigate('/admindashboard');
            }

        } catch (error) {
            console.log("Error in creating event: ", error);
        }


    };

    const onDataChange = (name, value) => {
        setEvent((prev) => ({
            ...prev,
            [name]: value
        }
        ));
    }

    useEffect(() => {
        if (event?.image?.name) {

            setImgSelected(true);
        }
    }, [event.image]);

    const deleteBtnClickHandler = () => {
        setImgSelected(false);
        event.image = null;
    }


    return (
        <div className=" container mx-auto relative" style={loader ? {} : { backgroundImage: `url(${image})` }}>

            <div className={`w-full flex justify-center items-center absolute  translate-y-1/6 translate-x-1/6 h-screen ${loader ? 'block' : 'hidden'}`} >
                <Triangle
                    visible={true}
                    height="100"
                    width="100"
                    color="#9290C3"
                    ariaLabel="triangle-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>

            <form action="" onSubmit={handleSubmit} className={`${loader ? 'blur-lg' : ''}`}>
                <div className='mt-8 lg:ml-12 text-white'>
                    <Link to={`/admindashboard/events`} className='ml-5 lg:ml-0 text-lg p-2 hover:bg-[#1B1A55] rounded-md duration-300'><ArrowBackIcon />Back</Link>
                </div>
                <h1 className="text-xl lg:text-3xl text-center text-white lg:mb-8 mt-5">Create Event</h1>
                <div className='flex flex-col items-center'>
                    <div className="md:w-11/12 lg:w-7/12 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-white md:text-xl text-md mb-2" htmlFor="eventName">
                                Event Name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black"
                                id="eventName"
                                type="text"
                                placeholder="Enter Event Name"
                                onChange={(e) => onDataChange('name', e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-white text-md md:text-xl mb-2" htmlFor="description">
                                Event Description
                            </label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                                id="eventDescription"
                                placeholder="Enter Event Description or Problem Statement"
                                onChange={(e) => onDataChange('description', e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4 grid grid-cols-2 gap-4">
                            <div>
                                <label className="block md:text-xl text-white text-md  mb-2" htmlFor="startDate">
                                    Start Date
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                                    id="startDate"
                                    type="date"
                                    onChange={(e) => onDataChange('startDate', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block md:text-xl text-white text-md  mb-2" htmlFor="endDate">
                                    End Date
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                                    id="endDate"
                                    type="date"
                                    onChange={(e) => onDataChange('endDate', e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-white text-md md:text-xl  mb-2" htmlFor="eligibilityCriteria">
                                Eligibility Criteria
                            </label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                                id="eligibilityCriteria"
                                placeholder="Enter Eligibility Criteria"
                                onChange={(e) => onDataChange('eligibilityCriteria', e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-white text-md md:text-xl  mb-2" htmlFor="judgingCriteria">
                                Judging Criteria
                            </label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                                id="judgingCriteria"
                                placeholder="Enter Judging Criteria"
                                onChange={(e) => onDataChange('judgingCriteria', e.target.value)}
                                required
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <div className={` border-2 border-dotted rounded-md p-4 ${imgSelected && 'flex justify-between'} `}>
                                <h1 className={`${imgSelected || 'text-center'} `}>

                                    {imgSelected ? event?.image?.name : "No file yet"}
                                </h1>
                                {imgSelected && <HighlightOffIcon onClick={deleteBtnClickHandler} />}
                            </div>

                            <div className='flex justify-end'>
                                <label htmlFor="image" className='w-fit border-2 p-2 rounded-md hover:bg-[#535C91] duration-200'>Select Image</label>
                                <input type="file" accept='image/*' className='hidden' name='image' id='image' onChange={(e) => onDataChange('image', e.target.files[0])} />
                            </div>


                        </div>

                        <div className="flex justify-center mt-10">
                            <button
                                className="bg-[#9290C3] hover:bg-[#535C91] text-black hover:font-bold duration-300 py-2 px-4 rounded "
                                type="submit"
                            >
                                Create Event
                            </button>
                        </div>

                    </div>
                </div>
            </form>
        </div>
    )
}
import React, { useState } from 'react';
