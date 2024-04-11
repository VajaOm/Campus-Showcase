import React, { useEffect } from 'react';
import { TailSpin } from 'react-loader-spinner';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ParticlesBg from './ParticlesBg';

export default function MidPage() {

    const { id, role, token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(`http://localhost:5000/user/verifyPasswordResetToken/${role}/${id}/${token}`, { withCredentials: true });

            console.log("mid page response :: " + response);
            if (response.status === 200) {
                navigate(`/resetPassword/${role}/${id}`);
            }
        }

        fetch();
    }, []);

    return (
        <>
            <div className='h-screen flex justify-center items-center flex-col gap-10'>
            <ParticlesBg />
            <p className='text-xl'>Password reset email has sent to your email check your email</p>
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
