import React from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';

function SideBar({ showMenu, toggleMenu }) {

    const location = useLocation();
    const navigate = useNavigate();


    const isLinkActive = (pathname) => {

        if ((location.pathname).includes(pathname)) {
            return true;
        }

        return location.pathname === `/dashboard${pathname}`;
    };

    const logoutBtnClickHandler = async () => {
        const response = await axios.get('http://localhost:5000/user/logout', { withCredentials: true });

        if (response.status === 200) {
            navigate('/');
        }
    }

    return (
        <div className="flex  w-1/2 absolute sm:relative sm:w-1/5 md:w-3/12 lg:w-1/5 h-100vh overflow-y-hidden ">
            <nav
                className={`bg-[#070F2B] flex flex-col item-center w-full h-screen shadow-md border-[#c8c8cb] border-r-2  ${showMenu ? '' : 'hidden sm:flex'
                    }`}
                style={{ top: '0', left: '0', zIndex: '1' }}
            >
                <div className='flex border-b-[1px] border-stone-400 hover:text-[#1B1A55] sm:hover:bg-[#9290C3]'>
                    <p className="w-full text-slate-100 sm:text-xl font-bold p-4"> <img src={logo} alt="" className='w-2/12 inline-block' /> Project Showcase</p>
                    <Link to="#" className='text-indigo-200 sm:hidden'>
                        <CloseIcon fontSize='medium' onClick={toggleMenu} />
                    </Link>
                </div>
                <Link
                    to="myprojects"
                    className={`text-slate-100 text-sm sm:text-lg border-t-[1px] border-b-[1px] text-center border-stone-400 p-4 lg:p-2 mt-10 lg:mt-6  ${isLinkActive('/myprojects') ? 'bg-[#9290C3] text-[#1B1A55] font-bold' : 'hover:bg-[#9290C3] hover:text-[#1B1A55] hover:font-bold'
                        }`}
                >
                    My project
                </Link>
                <Link
                    to="addproject"
                    className={`text-slate-100 text-sm sm:text-lg border-t-[1px] border-b-[1px] text-center border-stone-400 p-4 lg:p-2 mt-10 lg:mt-6 ${isLinkActive('/addproject') ? 'bg-[#9290C3] text-[#1B1A55] font-bold' : 'hover:bg-[#9290C3] hover:text-[#1B1A55] hover:font-bold'
                        }`}
                >
                    Add project
                </Link>
                <Link
                    to="explore"
                    className={`text-slate-100 text-sm sm:text-lg border-t-[1px] border-b-[1px] text-center border-stone-400 p-4 lg:p-2 mt-10 lg:mt-6 ${isLinkActive('/explore') ? 'bg-[#9290C3] text-[#1B1A55] font-bold' : 'hover:bg-[#9290C3] hover:text-[#1B1A55] hover:font-bold'
                        }`}
                >
                    Explore
                </Link>
                <Link
                    to="events"
                    className={`text-slate-100 text-sm sm:text-lg border-t-[1px] border-b-[1px] text-center border-stone-400 p-4 lg:p-2 mt-10 lg:mt-6 ${isLinkActive('/events') ? 'bg-[#9290C3] text-[#1B1A55] font-bold' : 'hover:bg-[#9290C3] hover:text-[#1B1A55] hover:font-bold'
                        }`}
                >
                    Events
                </Link>
                <Link
                    to="myprofile"
                    className={`text-slate-100 text-sm sm:text-lg border-t-[1px] border-b-[1px] text-center border-stone-400 p-4 lg:p-2 mt-10 lg:mt-6 ${isLinkActive('/myprofile') ? 'bg-[#9290C3] text-[#1B1A55] font-bold' : 'hover:bg-[#9290C3] hover:text-[#1B1A55] hover:font-bold'
                        }`}
                >
                    My Profile
                </Link>
                <p className="text-slate-100 text-sm sm:text-lg m-8 mt-auto">
                    <button className="text-pink-600" onClick={logoutBtnClickHandler}><LogoutIcon /> Log Out</button>
                </p>
            </nav>
            <div className='sm:hidden mt-2'>
                {showMenu ? (
                    null
                ) : (
                    <Link to="#" className='text-xl ml-4 text-indigo-200 rounded-xl' onClick={toggleMenu}><MenuRoundedIcon fontSize='large' /></Link>
                )}
            </div>
        </div>
    );
}

export default SideBar;
