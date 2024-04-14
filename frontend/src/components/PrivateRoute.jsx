import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'; 

export default function PrivateRoute() {
    const [auth, setAuth] = useState(false);

    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');

    if(accessToken && refreshToken) {
        setAuth(true);
    }

    return (
        <>
        {auth ? <Outlet /> : <Navigate to={'/'} />}
        </>
    )
}
