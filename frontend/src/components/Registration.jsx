import React, { useState } from 'react';
import image from '../assets/registration_pattern.png';
import regImage from '../assets/registration_img_2.png';
import ParticlesBg from './ParticlesBg';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import * as Yup from 'yup';

import Login from './Login';


export default function Registration() {

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    role: "Student",
    password: "",
    confirmpassword: ""
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const togglePasswordVisibility = ((prevState) => {
    setPasswordVisible(!passwordVisible);
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formData)
  }

  //validation schema for yup
  // const validationSchema = Yup.object({

  // });

  return (<>

    <div className='relative grid lg:grid-cols-2 grid-cols-1 gap-4 w-screen h-screen overflow-hidden z-0'>
      <div className='bg-[#070F2B] z-10 lg:hidden hidden sm:block'>
        <img src={regImage} alt="Registration Image" className='h-full w-full' />
      </div>
      <div className='w-full lg:relative '>
        <form action="" onSubmit={onSubmitHandler} className='grid grid-cols-1 sm:mx-8 sm:my-8 m-5 ' >
          <h1 className='lg:text-4xl text-3xl sm:text-4xl lg:text-left mb-5 text-center lg:mb-5 2xl:mt-8'>Registration</h1>
          <label htmlFor="fullname" className='text-left text-md sm:text-lg mt-5 lg:mt-2 '>Name</label>
          <input type="text" name='fullname' id='fullname' autoComplete='fullname' className='rounded-md p-2 lg:w-3/4 w-100 focus:outline-none text-black 2xl:mt-2' placeholder='Enter your full name' value={formData.fullname} onChange={onChangeHandler} />
          <br />

          <label htmlFor="email" className='text-left text-md mt-5 sm:text-lg lg:mt-0 2xl:mt-8'>Email</label>
          <input type="text" name='email' id='email' autoComplete='email' className='rounded-md p-2 lg:w-3/4 w-100 focus:outline-none text-black 2xl:mt-2' placeholder='example@gmail.com' value={formData.email} onChange={onChangeHandler} />
          <br />

          <label htmlFor="role" className='text-left text-md mt-5 sm:text-lg lg:mt-0 2xl:mt-8'>Role</label>
          <select name="role" id="role" className='rounded-md p-2 w-2/4 focus:outline-none text-black 2xl:mt-2' autoComplete='role' onChange={onChangeHandler}>
            <option value="Student">Student</option>
            <option value="Faculty">Faculty</option>
          </select>
          <br />

          <label htmlFor="password" className='text-left text-md mt-5 sm:text-lg lg:mt-0 2xl:mt-8' >Password</label>
          <div className='flex bg-white lg:w-3/4 rounded-md items-center'>

            <input type={passwordVisible ? "text" : "password"} name='password' autoComplete='current-password' id='password' className=' rounded-md p-2 lg:w-11/12 w-11/12 focus:outline-none text-black 2xl:mt-2' placeholder='********'
              value={formData.password} onChange={onChangeHandler} />
            <div className='cursor-pointer' onClick={togglePasswordVisibility}>
              {passwordVisible ? <VisibilityOffIcon fontSize='large' color='action' /> : <VisibilityIcon fontSize='large' color='action' />}
            </div>

          </div>


          <br />

          <label htmlFor="confirmPassword" className='text-left text-md sm:text-lg mt-5 lg:mt-0 2xl:mt-8'>Confirm password</label>
          <div className='flex bg-white lg:w-3/4 rounded-md items-center'>

            <input type={passwordVisible ? "text" : "password"} name='confirmpassword' autoComplete='new-password' id='confirmPassword' className=' rounded-md p-2 lg:w-11/12 w-11/12 focus:outline-none text-black 2xl:mt-2' placeholder='********'
              value={formData.confirmpassword} onChange={onChangeHandler} />
            <div className='cursor-pointer' onClick={togglePasswordVisibility}>
              {passwordVisible ? <VisibilityOffIcon fontSize='large' color='action' /> : <VisibilityIcon fontSize='large' color='action' />}
            </div>

          </div>
          <br />

          <button className='bg-[#9290C3] text-black font-semibold lg:w-1/6 w-2/5 px-4 lg:py-2 py-3 rounded-md hover:bg-[#535C91] hover:scale-105 transition duration-500 lg:mt-0 mt-2 mb-0 2xl:mt-5'>Register</button>
          <Link to="/" className='lg:mt-4 mt-10'>Already have an account? <span className=' text-[#9290C3] hover:underline hover:scale-105 transition duration-300 inline-block  2xl:mt-8 '>Log in.</span> </Link>
        </form>
        <ParticlesBg className='absolute top-0 left-0 w-full h-full' />
      </div>
      <div className='bg-[#070F2B] z-10 lg:block hidden'>
        <img src={image} alt="Registration Image" className='h-full w-full' />
      </div>
    </div>
  </>

  )
}
