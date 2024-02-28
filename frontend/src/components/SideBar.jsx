import React from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseIcon from '@mui/icons-material/Close';

function Navbar({ showMenu, toggleMenu }) {



    return (
        <div className="flex w-1/2 absolute sm:relative sm:w-1/5 md:w-3/12 lg:w-1/5 h-100vh overflow-y-hidden" >
            <nav className={`bg-[#070F2B] sm:flex flex-col item-center w-full h-screen shadow-md border-[#c8c8cb] border-r-2 fi  ${showMenu ? '' : 'hidden'}`} style={{ top: '0', left: '0', zIndex: '1' }}>
                <div className='flex border-b-[1px] border-stone-400 hover:text-[#1B1A55] sm:hover:bg-[#9290C3]'>
                    <p className="w-full text-slate-100 sm:text-xl font-bold p-4">Project Showcase</p>
                    <a className='text-indigo-200 sm:hidden' href="#" onClick={toggleMenu}><CloseIcon fontSize='medium' /></a>
                </div>
                <p className="text-slate-100 text-sm sm:text-lg border-t-[1px] border-b-[1px] text-center border-stone-400 p-4 lg:p-2 mt-10 lg:mt-6  hover:bg-[#9290C3] hover:text-[#1B1A55] hover:font-bold"><AccountCircleOutlinedIcon sx={{ fontSize: 40 }} />User_123</p>
                <p className="text-slate-100 text-sm sm:text-lg border-t-[1px]  border-b-[1px] text-center border-stone-400 p-4 lg:p-2 mt-10 lg:mt-6 hover:bg-[#9290C3] hover:text-[#1B1A55] hover:font-bold">My project</p>
                <p className="text-slate-100 text-sm sm:text-lg border-t-[1px]  border-b-[1px] text-center border-stone-400 p-4 lg:p-2 mt-10 lg:mt-6 hover:bg-[#9290C3] hover:text-[#1B1A55] hover:font-bold">Add project</p>
                <p className="text-slate-100 text-sm sm:text-lg border-t-[1px]  border-b-[1px] text-center border-stone-400 p-4 lg:p-2 mt-10 lg:mt-6 hover:bg-[#9290C3] hover:text-[#1B1A55] hover:font-bold">Explore</p>
                <p className="text-slate-100 text-sm sm:text-lg border-t-[1px]  border-b-[1px] text-center border-stone-400 p-4 lg:p-2 mt-10 lg:mt-6 hover:bg-[#9290C3] hover:text-[#1B1A55] hover:font-bold">Events</p>
                <p className="text-slate-100 text-sm sm:text-lg border-t-[1px]  border-b-[1px] text-center border-stone-400 p-4 lg:p-2 mt-10 lg:mt-6 hover:bg-[#9290C3] hover:text-[#1B1A55] hover:font-bold">My Profile</p>
                <p className="text-slate-100 text-sm sm:text-lg m-8 mt-12"><button className="text-pink-600">Log Out</button></p>
            </nav>
            <div className='sm:hidden mt-2'>
                {showMenu ? (
                    // <a className='text-4xl text-teal-300 rounded-xl sm:hidden' href="#" onClick={toggleMenu}><CloseIcon /></a>
                    null
                ) : (
                    <a className='text-xl ml-4 text-indigo-200 rounded-xl' href="#" onClick={toggleMenu}><MenuRoundedIcon fontSize='large' /></a>
                )}
            </div>
        </div>
    );
}

export default Navbar;
