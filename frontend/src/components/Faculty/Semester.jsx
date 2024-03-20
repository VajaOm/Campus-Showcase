import React from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../../assets/add_project_pattern.png';

export default function Semester() {
    const navigate = useNavigate();


    const semesters = [1, 2, 3, 4, 5, 6, 7, 8]

    const BtnClickHandler = (index) => {
        navigate(`/admindashboard/students/${index}`)
    }

    return (
        <div className='flex justify-center h-screen bg-repeat' style={{ backgroundImage: `url(${image})` }}>

            <div className='w-11/12 flex flex-col gap-4 mt-5'>

                <h1 className='text-xl mt-5 md:text-2xl lg:text-3xl'>Semester</h1>

                <div className=' flex lg:justify-end'>

                    <div className='w-full lg:w-10/12  flex flex-col gap-5 items-center lg:grid lg:grid-cols-2 mt-5 lg:gap-10'>
                        {
                            semesters.map((semester, index) => (
                                <>
                                    <div className='w-full lg:w-1/2 bg-[#9290C3] p-5 rounded-md hover:bg-[#535C91] duration-500 md:text-md lg:text-lg text-black font-semibold' key={index} onClick={() => BtnClickHandler(semester)} >Semester {semester}</div>
                                </>
                            ))
                        }
                    </div>


                </div>


            </div>
        </div>


    )
}
