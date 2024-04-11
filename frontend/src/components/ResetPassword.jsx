import React, { useState, useEffect } from 'react';
import image from '../assets/logo.png';
import ParticlesBg from './ParticlesBg';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { tuple } from 'yup';

const ResetPassword = () => {
    const [passwordVisibility, setPasswordVisibility] = useState({
        newPassword: false,
        confirmPassword: false
    });

    const { id, role } = useParams();
    const navigate = useNavigate();

    const [passwords, setPasswords] = useState({
        newPassword: '',
        confirmPassword: ''
    })

    const passwordVisibilityHandler = (field) => {
        setPasswordVisibility(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const onChangeHandler = (field, value) => {
        setPasswords((prev) => ({
            ...prev,
            [field]: value
        }))
    }

    const submitBtnClickHandler = async (e) => {
       e.preventDefault();
       try {
         const response = await axios.post(`http://localhost:5000/user/passwordeUpdate/${role}/${id}`, passwords, {
             headers: {
                 'Content-Type': 'application/x-www-form-urlencoded'
             },
             withCredentialsL: true
         });
 
         console.log('password update response : '+response);
 
         if(response.status === 200) {
             navigate('/');
         }
 
       } catch (error) {
        console.log(error)
       }
    }


    return (
        <>
            <div className='flex flex-col items-center justify-center mt-10 gap-4'>
                <ParticlesBg />
                <img src={image} alt="Logo" className='inline w-32' />
                <h1 className='text-2xl tracking-wider'>Reset Password</h1>
                <form className='w-2/6 flex flex-col mt-10 gap-5'>
                    <div className='flex justify-between'>
                        <label htmlFor="newPassword">New Password : </label>
                        <div className='w-7/12 flex border-b-2'>
                            <input type={passwordVisibility.newPassword ? 'text' : 'password'} className='w-full focus:outline-none bg-[#070F2B]' autoComplete='true' onChange={(e) => onChangeHandler('newPassword', e.target.value)} />
                            <div onClick={() => passwordVisibilityHandler('newPassword')} className='cursor-pointer'>
                                {passwordVisibility.newPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between mt-5'>
                        <label htmlFor="confirmPassword">Confirm Password : </label>
                        <div className='w-7/12 flex border-b-2'>
                            <input type={passwordVisibility.confirmPassword ? 'text' : 'password'} className='w-full focus:outline-none bg-[#070F2B]' autoComplete='true' onChange={(e) => onChangeHandler('confirmPassword', e.target.value)} />
                            <div onClick={() => passwordVisibilityHandler('confirmPassword')} className='cursor-pointer'>
                                {passwordVisibility.confirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex justify-end mt-5'>
                        <button className='bg-[#9290C3] text-black p-2 px-4 rounded-lg font-bold hover:bg-[#535C91] transform duration-500' onClick={submitBtnClickHandler}>Update</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ResetPassword;
