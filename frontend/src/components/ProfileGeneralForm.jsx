//ProfileGeneralForm
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileGeneralForm = ({ formik, isSubmiting, sendDataToParent }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');

    useEffect(() => {
        ;(async () => {
            try {
                const response = await axios.get("http://localhost:5000/user/profile", {
                    withCredentials: true,
                });
                const userData = response.data.data;

                setFullName(userData.fullName);
                setEmail(userData.email);
                setUsername(userData.username);
            } catch (error) {
                console.log("Error in profile page:", error);
            }
        })();
    }, []);

    useEffect(() => {
        if (sendDataToParent) {
            sendDataToParent({email: email, username: username });
          }
        
    }, [email, username])

    return (
        <div>
            <div className='grid grid-cols-1 2xl:mt-10 text-lg mt-5 form'>
                <label htmlFor="fullName" className=''>Name</label>
                <input
                    type="text"
                    id="fullName"
                    className='bg-[#070F2B] border-b-2 w-full focus:outline-none 2xl:mt-2'
                    name="fullName"
                    value={fullName}
                    disabled
                />

                <label htmlFor="username" className='mt-6 2xl:mt-8'>Username</label>
                <input
                    type="text"
                    id="username"
                    className='bg-[#070F2B] border-b-2 w-full focus:outline-none 2xl:mt-2'
                    name="username"
                    value={username}
                    onBlur={formik.handleBlur}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="off"
                />

                {formik.touched.username && formik.errors.username && isSubmiting && (
                    <div style={{ color: "red" }}>
                        <small>{formik.errors.username}</small>
                    </div>
                )}

                <label htmlFor="email" className='mt-6 2xl:mt-8'>Email</label>
                <input
                    type="text"
                    id="email"
                    className='bg-[#070F2B] border-b-2 w-full focus:outline-none 2xl:mt-2'
                    name="email"
                    value={email}
                    onBlur={formik.handleBlur}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"
                />

                {formik.touched.email && formik.errors.email && isSubmiting && (
                    <div style={{ color: "red" }}>
                        <small>{formik.errors.email}</small>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProfileGeneralForm;
