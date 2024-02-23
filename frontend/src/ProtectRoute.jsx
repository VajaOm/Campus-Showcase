// import React,{useEffect} from 'react';
// import {useNavigate} from 'react-router-dom';

// export default function ProtectRoute({Component}) {

//     const navigate = useNavigate();

//     useEffect(() => {
// console.log("useeffect running")
// document.cookie = "testCookie=value; path=/; expires=Sat, 01 Jan 2023 00:00:00 GMT";

// console.log(document.cookie)
//         const cookies = document.cookie;
//         console.log(cookies)

//         const accessTokenCookie =  cookies?.split("; ").find((cookie) => cookie?.startsWith('accessToken'));
//         const accessToken = accessTokenCookie ? accessTokenCookie.split("=")[1] : null;

//         if (!accessToken) {
//             navigate('/');
//         }
//     }, []);


//     return (
//         <div><Component /></div>
//     )
// }
