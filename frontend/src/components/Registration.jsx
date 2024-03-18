import React, { useState, useReducer } from 'react';
import image from '../assets/registration_pattern.png';
import regImage from '../assets/registration_img_2.png';
import ParticlesBg from './ParticlesBg';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

import Login from './Login';

// const reducer = (passwordErrors, action) => {
//   switch(action.type) {
//     case "LowercaseValidation": 
//     return {lowerValidate : true}
//     default: return passwordErrors;
//   }
// }

export default function Registration() {

  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [userAlreadyExisted, setUserAlreadyExisted] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "Student",
    password: "",
    confirmpassword: ""
  });
  const [errors, setErrors] = useState({});

  // const [passwordErrors, dispatch] = useReducer(reducer, {lowerValidate : false, upperValidate: false,
  // numberValidate: false, specialValidate: false, lengthValidate: false });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const togglePasswordVisibility = ((prevState) => {
    setPasswordVisible(!passwordVisible);
  });

  const toggleConfirmPasswordVisibility = ((prev) => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  })


  // validation schema for yup
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().required("Email id is required").email("Invalid email format"),
    role: Yup.string().required("Role is required"),
    password: Yup.string().required("Password is required")
      .min(6, "password must be 6 character or long")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one symbol"
      )
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter"),
    confirmpassword: Yup.string().required("Confirm password is required").oneOf([Yup.ref("password")], "Confirm password and password must match")
  });


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // console.log(formData)

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      console.log("Form submitted");

      try {
        const response = await axios.post("http://localhost:5000/user/register", formData, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          }
        });

        if (response.status === 201) {
          console.log(response.data.message);
          console.log("Registration successful");
          navigate('/')
          setUserAlreadyExisted("");
        }
      } catch (error) {
        console.log("Error in registering user :: ", error.response.data.message);
        setUserAlreadyExisted(error.response.data.message)
      }


    } catch (error) {
      const newErrors = {};
      error.inner?.forEach((err) => {

        newErrors[err.path] = err.message;
      });


      setErrors(newErrors);
    }
  }


  return (<>

    <div className='relative grid lg:grid-cols-2 grid-cols-1 gap-4 w-screen h-screen overflow-hidden z-0'>
      <div className='bg-[#070F2B] z-10 lg:hidden hidden sm:block'>
        <img src={regImage} alt="Registration Image" className='h-full w-full' />
      </div>
      <div className='w-full lg:relative '>
        <form action="" onSubmit={onSubmitHandler} className='grid grid-cols-1 sm:mx-8 sm:my-8 m-5 ' >
          <h1 className='lg:text-4xl text-3xl sm:text-4xl lg:text-left mb-5 text-center lg:mb-3 2xl:mt-5'>Registration</h1>
          <label htmlFor="fullName" className='text-left text-md sm:text-lg mt-5 lg:mt-0'>Name</label>
          <input type="text" name='fullName' id='fullName' autoComplete='fullName' className='rounded-md p-2 lg:w-3/4 w-100 focus:outline-none text-black 2xl:mt-2' placeholder='Enter your full name' value={formData.fullName} onChange={onChangeHandler} />
          {errors.fullName && <div className='text-red-500 text-sm sm:text-md'>{errors.fullName}</div>}
          <br />

          <label htmlFor="email" className='text-left text-md mt-3 sm:text-lg lg:-mt-2 2xl:mt-5'>Email</label>
          <input type="text" name='email' id='email' autoComplete='email' className='rounded-md p-2 lg:w-3/4 w-100 focus:outline-none text-black 2xl:mt-2' placeholder='example@gmail.com' value={formData.email} onChange={onChangeHandler} />
          {errors.email && <div className='text-red-500 text-sm sm:text-md'>{errors.email}</div>}
          <br />

          <label htmlFor="role" className='text-left text-md mt-3 sm:text-lg lg:-mt-2 2xl:mt-5'>Role</label>
          <select name="role" id="role" className='rounded-md p-2 w-2/4 focus:outline-none text-black 2xl:mt-2' autoComplete='role' onChange={onChangeHandler}>
            <option value="Student">Student</option>
            <option value="Faculty">Faculty</option>
          </select>
          <br />

          <label htmlFor="password" className='text-left text-md mt-3 sm:text-lg lg:-mt-2 2xl:mt-5' >Password</label>
          <div className='flex bg-white lg:w-3/4 rounded-md items-center'>

            <input type={passwordVisible ? "text" : "password"} name='password' autoComplete='current-password' id='password' className=' rounded-md p-2 lg:w-11/12 w-11/12 focus:outline-none text-black 2xl:mt-2' placeholder='********'
              value={formData.password} onChange={onChangeHandler} />
            <div className='cursor-pointer' onClick={togglePasswordVisibility}>
              {passwordVisible ? <VisibilityOffIcon fontSize='large' color='action' /> : <VisibilityIcon fontSize='large' color='action' />}
            </div>

          </div>
          {errors.password && <div className='text-red-500 text-sm sm:text-md'>{errors.password}</div>}
          <br />

          <label htmlFor="confirmPassword" className='text-left text-md sm:text-lg mt-3 lg:-mt-2 2xl:mt-5'>Confirm password</label>
          <div className='flex bg-white lg:w-3/4 rounded-md items-center'>

            <input type={confirmPasswordVisible ? "text" : "password"} name='confirmpassword' autoComplete='new-password' id='confirmPassword' className=' rounded-md p-2 lg:w-11/12 w-11/12 focus:outline-none text-black 2xl:mt-2' placeholder='********'
              value={formData.confirmpassword} onChange={onChangeHandler} />
            <div className='cursor-pointer' onClick={toggleConfirmPasswordVisibility}>
              {confirmPasswordVisible ? <VisibilityOffIcon fontSize='large' color='action' /> : <VisibilityIcon fontSize='large' color='action' />}
            </div>

          </div>
          {errors.confirmpassword && <div className='text-red-500 text-sm sm:text-md'>{errors.confirmpassword}</div>}
          <br />

          <button className='bg-[#9290C3] text-black font-semibold lg:w-1/6 w-2/5 px-4 lg:py-2 py-3 rounded-md hover:bg-[#535C91] hover:scale-105 transition duration-500 lg:mt-0 mt-2 mb-0 2xl:mt-5'>Register</button>
          <Link to="/" className='lg:mt-4 mt-10'>Already have an account? <span className=' text-[#9290C3] hover:underline hover:scale-105 transition duration-300 inline-block  2xl:mt-5 '>Log in.</span> </Link>
          <div className='text-red-500 text-lg w-full mt-5'>{userAlreadyExisted}</div>
        </form>
        <ParticlesBg className='absolute top-0 left-0 w-full h-full' />
      </div>
      <div className='bg-[#070F2B] z-10 lg:block hidden'>
        <img src={image} alt="Registration Image" className='h-full w-full' />
      </div>
    </div>
  </>

  )
}
