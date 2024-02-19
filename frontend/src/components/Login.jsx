// Login.jsx

import React, { useState } from 'react';
import topImg from '../assets/topLogin_pattern.png';
import sideImg from '../assets/side_img.png';
import ParticlesBg from './ParticlesBg';
import { Link } from 'react-router-dom';
import PageNotFound from './PageNotFound';
import Registration from './Registration';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Login = () => {

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = ((prevState) => {
        setPasswordVisible(!passwordVisible);
    });


    return (
        <>
            <div className='grid lg:grid-cols-12 grid-cols-1 overflow-hidden relative'>
                <div className='row-span-1 w-fit h-fit bg-[#070F2B] col-span-6'>
                    <img src={topImg} alt="top pattern" className=' ' />
                </div>

                <div className=' row-span-4 bg-[#070F2B] col-span-6 lg:block hidden'>
                    <img src={sideImg} alt="Side image pattern" className='h-screen w-screen' />
                </div>
                <div className='grid grid-cols-1 ml-10 col-span-5 sm:w-11/12 w-10/12 '>
                    <ParticlesBg />
                    <form action="" className='grid grid-cols-1 h-full' >
                        <h1 className='text-5xl 2xl:mt-10 mt-10 lg:mt-4 text-center lg:text-left '>Log in</h1>
                        <label htmlFor="name" className='2xl:mt-10 mt-10 lg:mt-5 sm:text-lg text-md '  >Email or username</label>
                        <input type="text" name='emailorusername' className='mt-2 p-3 rounded-lg focus:outline-none  text-black sm:w-full' placeholder='Enter your email or username' />
                        <br />

                        <label htmlFor="name" className='2xl:mt-5 mt-5 sm:text-lg text-md lg:mt-0 '>Role</label>
                        <select name="role" id="role" className=' mt-2 rounded-md p-2 w-2/5 focus:outline-none text-black 2xl:mt-2'>
                            <option value="select role" className='text-left' disabled selected hidden>Select role</option>
                            <option value="Student">Student</option>
                            <option value="Faculty">Faculty</option>
                        </select>
                        <br />

                        <label htmlFor="password" className='2xl:mt-5 sm:text-lg text-md mt-5 lg:mt-0 '>Password</label>
                        <div className='flex bg-white lg:w-full rounded-md items-center'>

                            <input type={passwordVisible ? "text" : "password"} name='password' className=' rounded-md p-2 lg:w-11/12 w-11/12 focus:outline-none text-black 2xl:mt-2' placeholder='********' />
                            <div className='cursor-pointer' onClick={togglePasswordVisibility}>
                                {passwordVisible ? <VisibilityOffIcon fontSize='large' color='action' /> : <VisibilityIcon fontSize='large' color='action' />}
                            </div>

                        </div>


                        <Link to='/resetpassword' element={<PageNotFound />} className='mt-2 ' > <span className='text-[#9290C3] hover:underline hover:scale-105 transition duration-300 inline-block'>Forgot password?</span> </Link>

                        <div className='flex justify-end mt-2 '>
                            <button className='bg-[#9290C3] text-black font-semibold sm:text-lg text-sm sm:mr-0 lg:w-1/5 w-full mt-5 px-3 lg:py-2 py-3 rounded-md hover:bg-[#535C91] hover:scale-105 transition duration-500 2xl:mt-5 lg:mt-0 '>Log in</button>
                        </div>
                        <Link to="/registration" className='mt-5 lg:block hidden  '>Don't have an account? <span className='text-[#9290C3] hover:underline hover:scale-105 transition duration-300 inline-block'>Sign up.</span></Link>
                    </form>
                    <Link to="/registration" element={<Registration />}><button className='bg-[#070F2B] lg:hidden w-full text-white border-2 border-[#9290C3] rounded-lg p-2 sm:p-4
                     mt-16 hover:bg-[#9290C3] hover:text-black hover:font-semibold tansform duration-300'>Create new account</button></Link>

                </div>
            </div>
        </>
    );
}

export default Login;