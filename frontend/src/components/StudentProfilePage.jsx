//StudentProfilePage

import React, { useState, useRef, useEffect } from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ParticlesBg from './ParticlesBg';
import ProfileGeneralForm from './ProfileGeneralForm';
import ProfileAcademicForm from './ProfileAcademicForm';
import { useFormik } from "formik";
import * as Yup from 'yup';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import toast, { Toaster } from 'react-hot-toast';
import topPattern from '../assets/add_project_pattern.png';


const ProfilePage = () => {

    const [userEmail, setUserEmail] = useState("");
    const [userFullname, setUserFullname] = useState("");
    const navigate = useNavigate();
    const [isGeneralInfo, setIsGeneralInfo] = useState(true);
    const [isSubmiting, setIsSubmiting] = useState(false);
    const inputRef = useRef(null);
    const [img, setImg] = useState(null);

    const [avatar, setAvatar] = useState(null);
    const [firstTime, setFirsttime] = useState(false);
    const [generalData, setGeneralData] = useState({});
    const [academicData, setAcademicData] = useState({});

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
                username: "",
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
                username: Yup.string().required(() => (
                    <span>
                        <InfoOutlinedIcon style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                        required
                    </span>
                )),
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
                )),
            })
        }),
        onSubmit: (values) => {
            console.log(values)
        }
    })



    useEffect(() => {
        ; (async () => {
            try {
                const response = await axios.get("http://localhost:5000/user/profile", {
                    withCredentials: true,
                });

                setAvatar(response.data.data.avatar);
                setFirsttime(response.data.data.firstTime ?? false);

                if (response.data.data.role === "Faculty") {
                    navigate('/facultyProfile');
                }

            } catch (error) {
                console.log("Error in profile page:", error);
                if (error.response?.status == 401) {
                    navigate('/')
                }
            }
        })()
    }, [navigate]);


    //add btn handler
    const handleAddButtonClick = async (e) => {
        setIsSubmiting(true);

        if (img === null && avatar === null) {
            console.log("img is required")
            toast.error("Profile picture required")
        }
        else {

            if (img) {
                let validExtensions = ['jpg', 'jpeg'];
                let position_of_dot = img?.name?.lastIndexOf(".");
                let img_extension = img?.name?.substring(position_of_dot + 1);
                let result = validExtensions.includes(img_extension);
                if (result === false) {
                    toast.error("Please upload an image in either JPG or JPEG format");
                }
            }

            try {
                const formData = new FormData();

                formData.append("username", generalData.username);
                formData.append("email", generalData.email);
                formData.append("enrollmentNo", academicData.enrollmentNo);
                formData.append("year", academicData.year);
                formData.append("semester", academicData.semester);

                if (img instanceof File) {
                    formData.append("avatar", img);
                }

                const response = await axios.post("http://localhost:5000/user/updatestudentprofile", formData, {
                    headers: {
                        'Content-Type': "multipart/form-data"
                    },
                    withCredentials: true
                });

                if (response.status === 200) {
                    navigate('/dashboard/');
                }

            } catch (error) {
                console.log("error in submit  :: " + error)
            }
        }



    };

    //profile picture 
    const handleImgClick = () => {
        inputRef.current.click();
    }

    const handleImgChange = (e) => {
        setAvatar(null);
        const file = e.target?.files[0];
        console.log(file);
        setImg(file)
    }

    const receiveDataFromGeneralForm = (data) => {
        setGeneralData(data);
    };

    const receiveDataFromAcademicForm = (data) => {
        setAcademicData(data);
    };


    return (
        <>

            <div className='lg:block flex flex-col items-center h-screen' style={firstTime ? {} : { backgroundImage: `url(${topPattern})` }} >

                {firstTime ? <ParticlesBg /> : <></>}
                {/* //profile photo div */}
                <form action="" className='w-11/12 flex flex-col items-center lg:block' onSubmit={formik.handleSubmit}>
                    <div className='flex flex-col items-center mt-5 md:mt-10 xl:mt-2 2xl:mt-14' >
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

                        <input type='file' className='hidden' ref={inputRef} onChange={handleImgChange} />
                        <p className='text-md md:text-lg'>Profile photo</p>

                    </div>


                    {/* //forms div */}
                    <div className='lg:flex justify-around hidden 2xl:mt-14'>

                        {/* general form */}
                        <div className='flex flex-col w-1/4'>
                            <h1 className='text-2xl 2xl:text-2xl'>General Infromation</h1>
                            <ProfileGeneralForm formik={formik} userEmail={userEmail} userFullname={userFullname} formIdPrefix={formIdPrefixFirstForm} isSubmiting={isSubmiting}
                                sendDataToParent={receiveDataFromGeneralForm} />
                        </div>

                        {/* academic form */}
                        <div className='flex flex-col w-1/4'>
                            <h1 className='text-white text-2xl 2xl:text-2xl'>Academic Information</h1>
                            <ProfileAcademicForm formik={formik} isSubmiting={isSubmiting} formIdPrefix={formIdPrefixFirstForm} sendDataToParent={receiveDataFromAcademicForm} />
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

                            {isGeneralInfo ? <ProfileGeneralForm formIdPrefix={formIdPrefixSecondForm} formik={formik} isSubmiting={isSubmiting} sendDataToParent={receiveDataFromGeneralForm} /> : <ProfileAcademicForm formik={formik} isSubmiting={isSubmiting} formIdPrefix={formIdPrefixSecondForm}
                                sendDataToParent={receiveDataFromAcademicForm} />}
                        </div>

                    </div >
                    <div className='flex justify-end w-11/12 xl:hidden'>
                        {!isGeneralInfo ? <button type='submit' className={`bg-[#9290C3] text-black font-semibold lg:w-24 w-2/5 px-0 py-2 rounded-lg text-lg
  hover:bg-[#535C91] hover:scale-105 transition duration-500  mt-5 mb-0 2xl:mt-10`} onClick={handleAddButtonClick} >{firstTime ? 'Add' : 'Update'}</button> : ""}
                    </div>
                </form>

            </div>
        </>
    );
}

export default ProfilePage;
