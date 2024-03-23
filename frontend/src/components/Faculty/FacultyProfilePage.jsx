import React, { useState, useRef, useEffect } from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ParticlesBg from '../ParticlesBg';
import { useFormik } from "formik";
import * as Yup from 'yup';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import image from '../../assets/pro.svg';
import { Triangle } from 'react-loader-spinner';

const FacultyProfilePage = () => {


    const [userFullname, setUserFullname] = useState("");
    const [avatar, setAvatar] = useState();
    const navigate = useNavigate();
    const [isSubmiting, setIsSubmiting] = useState(false);
    const inputRef = useRef(null);
    const [errors, setErrors] = useState({});
    const [img, setImg] = useState(null)
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        avatar: null,
    });

    const [firstTime, setFirsttime] = useState(false);
    const [loader, setLoader] = useState(false);


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
                const response = await axios.get("http://localhost:5000/user/profile", {
                    withCredentials: true,
                });

                setUserData((prev) => ({
                    ...prev,
                    email: response.data.data.email,
                    username: response.data.data.username
                }))

                setUserFullname(response.data.data.fullName);

                setAvatar(response.data.data.avatar || null);

                setFirsttime(response.data.data.firstTime)

                if (response.data.data.role === "Student") {
                    navigate('/studentProfile')
                }

            } catch (error) {
                console.log("Error in profile page:", error);
                if (error.response?.status == 401) {
                    navigate('/')
                }

            }
        })()
    }, [navigate]);

    const onChangeHandler = (name, value) => {
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
        setAvatar(null)
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

            if (img === null && avatar === null) {
                console.log("img is required")
                toast.error("Profile picture required")
            }
            else {
                if (img) {

                    let validExtensions = ['jpg', 'jpeg'];
                    let position_of_dot = img.name.lastIndexOf(".");
                    let img_extension = img.name.substring(position_of_dot + 1);
                    let result = validExtensions.includes(img_extension);
                    console.log(result)
                    if (result === false) {
                        toast.error("Please upload an image in either JPG or JPEG format");
                    }
                }

                await validationSchema.validate(userData, { abortEarly: false });

                const formData = new FormData();

                if (img instanceof File) {
                    formData.append("avatar", img);
                }
                formData.append("username", userData.username);
                formData.append("email", userData.email);


                try {
                    setLoader(true);
                    const response = await axios.post("http://localhost:5000/user/updateprofile", formData, {
                        headers: {
                            'Content-Type': "multipart/form-data"
                        },
                        withCredentials: true
                    });

                    if (response.status === 200) {
                        setLoader(false);
                        navigate('/admindashboard?from=profile');
                    }

                } catch (error) {
                    console.log("error in submit  :: " + error)


                }
            }
        } catch (error) {
            const newErrors = {};

            if (error) {
                error.inner?.forEach((err) => {
                    newErrors[err.path] = err.message;
                });
            }

            setErrors(newErrors);
        }

    };


    useEffect(() => {
        console.log(userData.username, userData.email, firstTime)
    }, [userData])

    return (
        <>

            <div className='lg:block flex flex-col items-center  min-h-screen overflow-y-hidden lg:mb-5 bg-repeat' style={firstTime ? {} : loader ? {} : { backgroundImage: `url(${image})`, backgroundRepeat: 'repeat' }}>
                <div className={`w-full flex justify-center items-center absolute  translate-y-1/6 translate-x-1/6 h-screen ${loader ? 'block' : 'hidden'}`} >
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
                {firstTime ? <ParticlesBg /> : <></>}
                {/* //profile photo div */}
                <form action="" className={`w-11/12 flex flex-col items-center lg:block ${loader ? 'blur-lg' : '' }`} >
                    <div className='flex flex-col items-center mt-5 lg:mt-10 xl:mt-2 2xl:mt-14 gap-0' >
                        {avatar ? <>
                            <Avatar src={avatar} alt='profile picture' sx={{ width: 150, height: 150 }} className='border-2 ' onClick={handleImgClick} />
                        </> : <>
                            {img ? <Avatar src={URL.createObjectURL(img)} alt='profile picture' sx={{ width: 150, height: 150 }} className='border-2 ' onClick={handleImgClick} />
                                : <AccountCircleOutlinedIcon sx={{ fontSize: 120, color: '#9290C3' }} onClick={handleImgClick} />}
                        </>}

                        <Toaster
                            position="top-center"
                            reverseOrder={false}
                        />

                        <input type='file' className='hidden' name='avatar' value={userData.avatar} ref={inputRef} onChange={handleImgChange} />
                        <p className='text-md md:text-lg '>Profile photo</p>

                    </div>


                    {/* //forms div */}
                    <div className='lg:flex justify-around w-10/12 md:w-9/12 lg:w-full 2xl:mt-14 lg:mt-10'>

                        <div className='flex flex-col mt-10 lg:mt-12 2xl:mt-0 xl:mt-2 items-center lg:gap-5 lg:w-1/4'>
                            <h1 className='text-2xl 2xl:text-3xl'>General Infromation</h1>

                            <div className='flex flex-col justify-start w-full mt-10 xl:mt-0'>
                                <label htmlFor="fullName" className=''>Name</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    className=' bg-[#070F2B] border-b-2 w-full focus:outline-none mt-3 '
                                    name="fullName"
                                    value={userFullname || ''}
                                    disabled
                                />


                                <label htmlFor={"username"} className='mt-8 sm:mt-6 2xl:mt-8'>Username</label>
                                <input
                                    type="text"
                                    id={"username"}
                                    className=' bg-[#070F2B] border-b-2 w-full focus:outline-none mt-3 '
                                    name="username"
                                    value={userData.username || ''}
                                    onChange={(e) => onChangeHandler("username", e.target.value)}
                                    autoComplete="off" // Add this line
                                />
                                {errors.username && <div className='text-red-500'>{errors.username}</div>}



                                <label htmlFor={`email`} className='mt-8 2xl:mt-8 '>Email</label>
                                <input
                                    type="text"
                                    id={`email`}
                                    className=' bg-[#070F2B] border-b-2 w-full focus:outline-none  mt-3'
                                    name="email"
                                    value={userData.email || ' '}
                                    onChange={(e) => onChangeHandler("email", e.target.value)}
                                />

                                <label htmlFor={`department`} className='mt-8 xl:mt-5 2xl:mt-8'>Department</label>
                                <input type="text" name='department' value="Information Technology" id={`department`} className=' bg-[#070F2B] mt-3 border-b-2 w-full focus:outline-none  ' disabled />

                                <div className='flex justify-end md:mt-10 xl:mt-0'>
                                    <button type='submit' className='bg-[#9290C3] text-black font-semibold lg:w-24 w-2/5 px-0 py-2 rounded-lg text-lg
                          hover:bg-[#535C91] hover:scale-105 transition duration-500 mt-5 mb-0 2xl:mt-10' onClick={handleAddButtonClick} >{firstTime ? 'Add' : 'Update'}</button>
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
