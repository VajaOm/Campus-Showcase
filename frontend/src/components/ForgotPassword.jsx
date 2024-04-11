import React, { useState } from 'react';
import { useNavigate, } from 'react-router-dom';
import axios from 'axios';
import image from '../assets/logo.png';
import ParticlesBg from './ParticlesBg';


const ForgotPassword = () => {

    const [data, setData] = useState({
        email: '',
        role: 'Student'
    });

    const navigate = useNavigate();

    const onChangeHandler = (field, value) => {
        setData((prevData) => ({
            ...prevData,
            [field]: value
        }))
    }

    const sendBtnClickHanlder = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post('http://localhost:5000/user/passwordResetEmail', data, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                withCredentials: true
            });



            if (response.status === 200) {
                navigate('/verifyPasswordResetToken');
            }

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <div className=' flex flex-col items-center justify-center mt-10 gap-4'>
                <ParticlesBg />
                <img src={image} alt="Logo" className='inline w-32 ' />
                <h1 className='text-2xl tracking-wider '>Forgot Password</h1>
                <div className='w-1/4 flex flex-col items-start mt-10 gap-3'>
                    <label htmlFor="email">Enter your email</label>
                    <input type="email" className='w-full focus:outline-none bg-[#070F2B] border-b-2 ' required onChange={(e) => onChangeHandler('email', e.target.value)} />
                    <label htmlFor="role" className='text-left text-md mt-3 sm:text-lg lg:-mt-2 2xl:mt-5'>Role</label>
                    <select name="role" id="role" className='rounded-md p-2 w-2/4 focus:outline-none text-black ' autoComplete='role' onChange={(e) => onChangeHandler('role', e.target.value)}>
                        <option value="Student">Student</option>
                        <option value="Faculty">Faculty</option>
                    </select>
                    <div className='w-full flex justify-end'>
                        <button to={'/resetPassword'} className='bg-[#9290C3] text-black p-2 px-4 rounded-lg font-bold hover:bg-[#535C91] transform duration-500' onClick={sendBtnClickHanlder}>Send</button>
                    </div>
                </div>
               
            </div>
        </>
    );
}

export default ForgotPassword;
