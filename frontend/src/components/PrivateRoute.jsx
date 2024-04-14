import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import axios from 'axios';
import { Triangle } from 'react-loader-spinner';

export default function PrivateRoute() {
    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchCookie = async () => {
            try {
                const response = await axios.get('http://localhost:5000/user/getCookie', { withCredentials: true });
                console.log(response);
                if (response.status === 200) {
                    setAuth(true);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        fetchCookie();
    }, []);

    if (loading) {
        return <>
            <div className='flex justify-center items-center h-screen'>
                <Triangle
                    visible={true}
                    height="100"
                    width="100"
                    color="#9290C3"
                    ariaLabel="triangle-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
        </>;
    }

    return (
        <>
            {auth ? <Outlet /> : <Navigate to={'/'} />}
        </>
    );
}
