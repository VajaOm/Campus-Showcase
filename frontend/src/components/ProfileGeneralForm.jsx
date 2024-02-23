import React, { useState } from 'react';

const ProfileGeneralForm = ({ formik, isSubmiting, userEmail, userFullname, formIdPrefix }) => {

    return (
        <div>
            <div action="" className='grid grid-cols-1 2xl:mt-10 text-lg mt-5 form'>

                <label htmlFor={`${formIdPrefix}fullName`} className=''>Name</label>
                <input
                    type="text"
                    id={`${formIdPrefix}fullName`}
                    className=' bg-[#070F2B] border-b-2 w-full focus:outline-none 2xl:mt-2'
                    name="ProfileGeneralForm.fullName"
                    value={userFullname}
                    disabled
                />

                {formik.errors.ProfileGeneralForm && isSubmiting && (
                    <div style={{ color: "red" }}>
                        <small>{formik.errors.ProfileGeneralForm.fullName}</small>
                    </div>
                )}

                <label htmlFor={`${formIdPrefix}username`} className=' mt-6 2xl:mt-8'>Username</label>
                <input
                    type="text"
                    id={`${formIdPrefix}username`}
                    className=' bg-[#070F2B] border-b-2 w-full focus:outline-none 2xl:mt-2'
                    name="ProfileGeneralForm.username"
                    value={formik.values.ProfileGeneralForm.username}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    autoComplete="off" // Add this line
                />

                {formik.errors.ProfileGeneralForm && isSubmiting && (
                    <div style={{ color: "red" }}>
                        <small>{formik.errors.ProfileGeneralForm.username}</small>
                    </div>
                )}

                <label htmlFor={`${formIdPrefix}email`} className='mt-6 2xl:mt-8'>Email</label>
                <input
                    type="text"
                    id={`${formIdPrefix}email`}
                    className=' bg-[#070F2B] border-b-2 w-full focus:outline-none 2xl:mt-2'
                    name="ProfileGeneralForm.email"
                    value={userEmail}
                    disabled
                />

                {formik.errors.ProfileGeneralForm && isSubmiting && (
                    <div style={{ color: "red" }}>
                        <small>{formik.errors.ProfileGeneralForm.email}</small>
                    </div>
                )}

            </div>

            {/* this button will show only for mobile and tablets */}
            {/* <div className='flex justify-end lg:hidden mt-4'>
                <button type='submit' className='bg-[#9290C3] text-black font-semibold lg:w-2/5 w-3/12 px-0 lg:py-2 py-3 rounded-lg
             hover:bg-[#535C91] hover:scale-105 transition duration-500  lg:mt-8 mt-5 mb-0 2xl:mt-16 '  onClick={handleFormSubmit}>Add</button>

            </div> */}
        </div>
    );
}

export default ProfileGeneralForm;
