import React, { useState, useRef, useEffect } from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import sideImg from '../assets/profile_side_img.png';
import ParticlesBg from './ParticlesBg';
import ProfileGeneralForm from './ProfileGeneralForm';
import ProfileAcademicForm from './ProfileAcademicForm';
import { useFormik } from "formik";
import * as Yup from 'yup';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Dialog } from 'primereact/dialog';
// import Avatar from 'react-avatar-edit';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const ProfilePage = () => {

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const [isGeneralInfo, setIsGeneralInfo] = useState(true);
    const [isSubmiting, setIsSubmiting] = useState(false);
    const inputRef = useRef(null);
    const [img, setImg] = useState("")

    const [userData, setUserData] = useState({});

    //issue handling releted to same id 
    const formIdPrefixFirstForm = "firstForm";
    const formIdPrefixSecondForm = "secondForm";

    const generalBtnClickHandler = () => {
        // console.log(("general btn clicked"))
        setIsGeneralInfo(true);
    };

    const academicBtnClickHandler = () => {
        // console.log(("academic btn clicked"))
        setIsGeneralInfo(false);
    };

    const formik = useFormik({
        initialValues: {
            ProfileGeneralForm: {
                fullName: "",
                username: "",
                email: ""
            },

            ProfileAcademicForm: {
                enrollmentNo: "",
                department: "Information Technology",
                year: "",
                semester: ""
            },
        },
        validationSchema: Yup.object({
            ProfileGeneralForm: Yup.object({
                fullName: Yup.string().required(() => (
                    <span>
                        <InfoOutlinedIcon style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                        required
                    </span>
                )),
                username: Yup.string().required(() => (
                    <span>
                        <InfoOutlinedIcon style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                        required
                    </span>
                )),
                email: Yup.string().required(() => (
                    <span>
                        <InfoOutlinedIcon style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                        required
                    </span>
                )).email("Invalid email format")
            }),
            ProfileAcademicForm: Yup.object({
                enrollmentNo: Yup.string().required(() => (
                    <span>
                        <InfoOutlinedIcon style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                        required
                    </span>
                )),
                year: Yup.string().required(() => (
                    <span>
                        <InfoOutlinedIcon style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                        required
                    </span>
                )),
                semester: Yup.string().required(() => (
                    <span>
                        <InfoOutlinedIcon style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                        required
                    </span>
                ))
            })
        }),
        onSubmit: (values) => {
            setUserData({ ...values, img })
        }
    })

    useEffect(() => {
        console.log("form data ::: ", userData);
    }, [userData]);





    useEffect(() => {
        console.log("use effect called");
    
        ; (async () => {
            try {
                console.log("Making request to /user/profile");
                const response = await axios.get("http://localhost:5000/user/profile", {
                    withCredentials: true,
                });
                console.log("Profile Data:", response.data.data.email);
            } catch (error) {
                console.log("Error in profile page:", error);
                // if (error.response) {
                //     console.log("Response Status Code:", error.response.status);
                //     console.log("Response Data:", error.response.data);
                // }
                if(error.response.status == 401) {
                    navigate('/')
                }
                // if (error.request) {
                //     console.log("Request:", error.request);
                // }
            }
        })()
    }, [navigate]);
    


    //add btn handler
    const handleAddButtonClick = async () => {
        setIsSubmiting(true);


    };

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

    //handling post request
    const isMobile = window.innerWidth <= 768;

    return (
        <>

            <div className='lg:block flex flex-col items-center'>
                <ParticlesBg />

                {/* //profile photo div */}
                <form action="" className='w-11/12 flex flex-col items-center lg:block' onSubmit={formik.handleSubmit}>
                    <div className='flex flex-col items-center mt-5 md:mt-10 xl:mt-2 2xl:mt-14' onClick={handleImgClick}>
                        {img ? <Avatar src={URL.createObjectURL(img)} alt='profile picture' sx={{ width: 150, height: 150 }} className='border-2 ' />
                            : <AccountCircleOutlinedIcon sx={{ fontSize: 120, color: '#9290C3' }} />}



                        <input type='file' className='hidden' ref={inputRef} onChange={handleImgChange} required />
                        <p className='text-md md:text-lg'>Profile photo</p>

                    </div>


                    {/* //forms div */}
                    <div className='lg:flex justify-around hidden 2xl:mt-14'>

                        {/* general form */}
                        <div className='flex flex-col w-1/4'>
                            <h1 className='text-2xl 2xl:text-3xl'>General Infromation</h1>
                            <ProfileGeneralForm formik={formik} formIdPrefix={formIdPrefixFirstForm} isSubmiting={isSubmiting} />
                        </div>

                        {/* academic form */}
                        <div className='flex flex-col w-1/4'>
                            <h1 className='text-white text-2xl 2xl:text-3xl'>Academic Infromation</h1>
                            <ProfileAcademicForm formik={formik} isSubmiting={isSubmiting} formIdPrefix={formIdPrefixFirstForm} />
                        </div>
                    </div>

                    {/* //add button div */}
                    <div className='lg:flex hidden justify-end w-11/12 '>
                        <button type='submit' className='bg-[#9290C3] text-black font-semibold lg:w-24 w-2/5 px-0 py-2 rounded-lg text-lg
                          hover:bg-[#535C91] hover:scale-105 transition duration-500  mt-5 mb-0 2xl:mt-10' onClick={handleAddButtonClick} >Add</button>
                    </div>



                    {/* mobile  */}
                    <div className='lg:hidden flex border-2 rounded-md border-[#9290C3] flex-col w-11/12 p-5 mt-10  '>

                        <div className='flex '>
                            <div className='inline-block w-1/2'><button type='button' className={`bg-[#9290C3] rounded-l-md w-full text-black px-4 py-2 font-semibold hover:bg-[#535C91] text-lg ${isGeneralInfo ? 'bg-[#535C91]' : ''}`} onClick={generalBtnClickHandler}>General</button></div>
                            <div className='w-1/2'><button type='button' className={`bg-[#9290C3] w-full rounded-r-md text-black px-2 py-2 font-semibold hover:bg-[#535C91] text-lg ${!isGeneralInfo ? 'bg-[#535C91]' : ''}`} onClick={academicBtnClickHandler}>Academic</button></div>
                        </div>
                        <div>
                            <p className='text-2xl mt-10 text-center'>{isGeneralInfo ? 'General Information' : 'Academic Information'}</p>

                            {isGeneralInfo ? <ProfileGeneralForm formIdPrefix={formIdPrefixSecondForm} formik={formik} isSubmiting={isSubmiting} /> : <ProfileAcademicForm formik={formik} isSubmiting={isSubmiting} formIdPrefix={formIdPrefixSecondForm} />}
                        </div>

                    </div >
                    <div className='flex justify-end w-11/12 xl:hidden'>
                        {!isGeneralInfo ? <button type='submit' className={`bg-[#9290C3] text-black font-semibold lg:w-24 w-2/5 px-0 py-2 rounded-lg text-lg
  hover:bg-[#535C91] hover:scale-105 transition duration-500  mt-5 mb-0 2xl:mt-10`} onClick={handleAddButtonClick} >Add</button> : ""}
                    </div>
                </form>

            </div>
        </>
    );
}

export default ProfilePage;
