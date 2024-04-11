import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import image from '../assets/logo.png';
import { TailSpin } from 'react-loader-spinner';
import ParticlesBg from './ParticlesBg';

export default function EmailVerification() {

  const { token, id, role } = useParams();
  const navigate = useNavigate();
  console.log(role, id)

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`http://localhost:5000/user/verify/${role}/${id}/${token}`, {
        withCredentials: true
      });

      console.log(response);
      if(response.status === 200) {
        navigate('/');
      }
    }

    fetch();
  }, []);

  return (
    <>
      <div className='flex flex-col items-center justify-center mt-10 gap-4'>
        <ParticlesBg />
        <img src={image} alt="Logo" className='inline w-28 ' />
        <h1 className='text-2xl tracking-wider'>Email Verification</h1>
        <p className='mt-10'>We have sent you an email on your register email</p>
        <p>Check your email for email verification</p>
        <TailSpin
          visible={true}
          height="50"
          width="50"
          color="#535C91"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </>
  )
}
