import React, { useEffect } from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseIcon from '@mui/icons-material/Close';
import CasesRoundedIcon from '@mui/icons-material/CasesRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import imgPattern from '../assets/Oreti.png'
import mobilePattern from '../assets/mobilePattren.png'

function MyProjectsPage({ showMenu }) {

  const isMobileScreen = window.innerWidth <= 768;

  return (
    <>
      <div className='w-full flex justify-center lg:justify-start mt-8 sm:mt-0 lg:mt-8 xl:mt-0'>

        <div className={`flex flex-col lg:w-10/12 w-11/12 ${showMenu ? 'filter blur-sm' : ''}`}>
          <p className="text-slate-100 text-3xl sm:text-4xl mt-10">My Projects</p>
          <input type="text" className='rounded-md focus:outline-none mt-5 p-2 md:p-3 text-black' placeholder='Search Your Project' />

          <div className='w-full h-full relative transform hover:text-4xl duration-300'>

          <img src={isMobileScreen ? mobilePattern : imgPattern} className='w-full mt-10 rounded-lg' alt="" />
            <h2 className='text-3xl text-black absolute transform  translate-x-5 -translate-y-12 hover:text-4xl duration-300'>New Project</h2>
          </div>

          <div className='flex mt-6 bg-[#9290C3]  p-3 lg:p-4 rounded-md justify-between hover:bg-[#535C91] transform duration-200' >

            <div className='flex'><CasesRoundedIcon /> <p className=' text-md sm:text-lg ml-4 text-white'>Project 1</p></div>
            <div className='flex'><DeleteIcon className='mr-4' /><AddToPhotosOutlinedIcon /></div>

          </div>
        </div>
      </div>
    </>
  );
}

export default MyProjectsPage;