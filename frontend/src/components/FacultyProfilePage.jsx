import React, { useState, useRef, useEffect } from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ParticlesBg from './ParticlesBg';

import { useFormik } from "formik";
import * as Yup from 'yup';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';


const FacultyProfilePage = () => {

    const [userEmail, setUserEmail] = useState("");
    const [userFullname, setUserFullname] = useState("");
    const navigate = useNavigate();
    const [isSubmiting, setIsSubmiting] = useState(false);
    const inputRef = useRef(null);
    const [errors, setErrors] = useState({});
    const [img, setImg] = useState(null)
    const [userData, setUserData] = useState({
        username: "",

    });

    const validFileExtensions = { image: ['jpg', 'jpeg'] };

    function isValidFileType(fileName, fileType) {
        return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
    }


    const validationSchema = Yup.object({
        username: Yup.string().required(() => (
            <span>
                <InfoOutlinedIcon style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                required
            </span>
        )),
    });



    useEffect(() => {
        console.log("use effect called");

        ; (async () => {
            try {
                console.log("Making request to /user/profile");
                const response = await axios.get("http://localhost:5000/user/profile", {
                    withCredentials: true,
                });
                setUserEmail(response.data.data.email)

                setUserFullname(response.data.data.fullName);

                if(response.data.data.role === "Student") {
                    navigate('/studentProfile')
                }

            } catch (error) {
                console.log("Error in profile page:", error);
                // if (error.response) {
                //     console.log("Response Status Code:", error.response.status);
                //     console.log("Response Data:", error.response.data);
                // }
                if (error.response?.status == 401) {
                    navigate('/')
                }
                // if (error.request) {
                //     console.log("Request:", error.request);
                // }
            }
        })()
    }, [navigate]);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    //profile picture 
    const handleImgClick = () => {
        inputRef.current.click();
    }

    const handleImgChange = (e) => {
        console.log(e)
        const file = e.target?.files[0];
        console.log(file);
        setImg(file)
    }

    // const avatarChangeHandlers = (e) => {
    //     handleImgChange(e);
    //     onChangeHandler(e);
    // }


    //add btn handler
    const handleAddButtonClick = async (e) => {
        e.preventDefault();
        setIsSubmiting(true);
        try {

            if (img === null) {
                console.log("img is required")
                toast.error("Profile picture required")
            }
            else {

                let validExtensions = ['jpg', 'jpeg'];
                let position_of_dot = img.name.lastIndexOf(".");
                let img_extension = img.name.substring(position_of_dot + 1);
                let result = validExtensions.includes(img_extension);
                console.log(result)
                if (result === false) {
                    toast.error("Please upload an image in either JPG or JPEG format");
                }

                else {


                    await validationSchema.validate(userData, { abortEarly: false });

                    const formData = new FormData();
                    formData.append("avatar", img);
                    formData.append("username", userData.username); // Add other form data
                    
                    try {

                        const response = await axios.post("http://localhost:5000/user/profile", formData, {
                            headers: {
                                'Content-Type': "multipart/form-data"
                            },
                            withCredentials: true
                        });
                        console.log(response)

                    } catch (error) {
                        console.log("error in submit  :: " + error)
                        // }
                    }
                }
            }
        } catch (error) {
            const newErrors = {};

            if (error) {
                error.inner?.forEach((err) => {
                    newErrors[err.path] = err.message;
                });
            }
            // console.log(error?.inner)



            setErrors(newErrors);
        }

    };




    return (
        <>

            <div className='lg:block flex flex-col items-center'>
                <ParticlesBg />

                {/* //profile photo div */}
                <form action="" className='w-11/12 flex flex-col items-center lg:block' >
                    <div className='flex flex-col items-center mt-5 md:mt-10 xl:mt-2 2xl:mt-14' onClick={handleImgClick}>
                        {img ? <Avatar src={URL.createObjectURL(img)} alt='profile picture' sx={{ width: 150, height: 150 }} className='border-2 ' />
                            : <AccountCircleOutlinedIcon sx={{ fontSize: 120, color: '#9290C3' }} />}

                        <Toaster
                            position="top-center"
                            reverseOrder={false}
                        />

                        <input type='file' className='hidden' name='avatar' value={userData.avatar} ref={inputRef} onChange={handleImgChange} />
                        <p className='text-md md:text-lg'>Profile photo</p>

                    </div>


                    {/* //forms div */}
                    <div className='lg:flex justify-around w-10/12 md:w-9/12 lg:w-full 2xl:mt-14'>

                        <div className='flex flex-col mt-10 lg:mt-10 2xl:mt-0 xl:mt-2 items-center'>
                            <h1 className='text-2xl 2xl:text-3xl'>General Infromation</h1>

                            <div className='flex flex-col justify-start w-full mt-10 xl:mt-0'>
                                <label htmlFor="fullName" className=''>Name</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    className=' bg-[#070F2B] border-b-2 w-full focus:outline-none mt-3 '
                                    name="fullName"
                                    value={userFullname}
                                    disabled
                                />


                                <label htmlFor={"username"} className='mt-8 sm:mt-6 2xl:mt-8'>Username</label>
                                <input
                                    type="text"
                                    id={"username"}
                                    className=' bg-[#070F2B] border-b-2 w-full focus:outline-none mt-3 '
                                    name="username"


                                    onChange={onChangeHandler}
                                    autoComplete="off" // Add this line
                                />
                                {errors.username && <div className='text-red-500'>{errors.username}</div>}



                                <label htmlFor={`email`} className='mt-8 2xl:mt-8 '>Email</label>
                                <input
                                    type="text"
                                    id={`email`}
                                    className=' bg-[#070F2B] border-b-2 w-full focus:outline-none  mt-3'
                                    name="email"
                                    value={userEmail}
                                    disabled
                                />

                                <label htmlFor={`department`} className='mt-8 xl:mt-5 2xl:mt-8'>Department</label>
                                <input type="text" name='department' value="Information Technology" id={`department`} className=' bg-[#070F2B] mt-3 border-b-2 w-full focus:outline-none  ' disabled />

                                <div className='flex justify-end md:mt-10 xl:mt-0'>
                                    <button type='submit' className='bg-[#9290C3] text-black font-semibold lg:w-24 w-2/5 px-0 py-2 rounded-lg text-lg
                          hover:bg-[#535C91] hover:scale-105 transition duration-500 mt-5 mb-0 2xl:mt-10' onClick={handleAddButtonClick} >Add</button>
                                </div>
                            </div>

                        </div>

                    </div>
                </form>

            </div>
        </>
    );
}

export default FacultyProfilePage;
