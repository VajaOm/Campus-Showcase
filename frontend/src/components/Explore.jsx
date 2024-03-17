import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import image from '../assets/b.png';
import Lgimage from '../assets/d.png';
import axios from 'axios'

const Explore = () => {
    const isMobileScreen = window.innerWidth <= 768;
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/project/getAllProjects`, {
                    withCredentials: true,
                    headers: {
                        'Accept': 'application/json',
                    }
                });
                console.log(response);
                setProjects(response.data.data)

            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [])

    const viewBtnClickHandler = (projectId) => {
        navigate(`/dashboard/myprojects/projectdetails/${projectId}`);
    };


    return (
        <div className=' flex justify-center lg:justify-start'>
            <div className='w-11/12 flex flex-col items-start'>
                <h1 className='text-2xl md:text-3xl mt-14 mb-8'>Explore</h1>

                <div className='relative'>
                    <div className='w-full h-full relative transform duration-300'>
                        <img src={isMobileScreen ? image : Lgimage} className='w-full rounded-xl' alt="pattern" />
                        {
                            projects.map((project, index) => (
                                <>
                                    <div className='flex p-3 lg:px-6 bg-[#1B1A55] mt-10 rounded-lg text-sm gap-4 md:gap-8'>
                                        <div className='w-2/12 '>
                                            <img src={project?.images[0].fileUrl} alt="" />
                                        </div>
                                        <div className='flex flex-col md:gap-2 lg:gap-4 justify-center'>
                                            <div>
                                                <h1 className='text-lg md:text-xl'>{project?.title}</h1>
                                            </div>
                                            <div>
                                                <h1 className='md:text-md lg:text-lg'>{project?.category}</h1>
                                            </div>
                                            <div>
                                                <h1 className='md:text-md lg:text-lg'>Created By : {projects[0]?.ownerName}</h1>
                                            </div>
                                        </div>
                                        <div className='flex justify-end items-center ml-auto'>
                                            <button className='p-2 px-3 md:px-4 rounded-md bg-[#9290C3] text-black hover:bg-[#535C91] text-md md:text-lg lg:text-xl' onClick={() => viewBtnClickHandler(project._id)}>View</button>
                                        </div>
                                    </div>
                                </>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Explore;
