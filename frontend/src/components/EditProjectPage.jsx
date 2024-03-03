import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation } from 'react-router-dom';

export default function EditProjectPage() {
    const location = useLocation();
    const projectDetails = location.state?.projectDetails || null;

    return (
        <div className='mt-14 w-full flex flex-col'>
            <Link to={'/dashboard/myprojects'} className='ml-5 text-lg'><ArrowBackIcon />Back</Link>

            {/* <div className='flex flex-col mt-10 ml-5 w-11/12'>

            <h1 className='text-xl'>Project Title</h1>
            {projectDetails.title}

            <p className='text-xl'>Description : </p>
            <input type="text" name='description' value={projectDetails.description} className='text-black rounded-md p-2' />

            <p className='text-xl'>Images : </p>
            <input type="text" name='description' value={projectDetails.description} className='text-black rounded-md p-2' />



            </div> */}

        </div>
    )
}
