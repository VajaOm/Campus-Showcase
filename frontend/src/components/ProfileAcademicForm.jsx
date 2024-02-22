import React from 'react';


const ProfileAcademicForm = ({ formik, isSubmiting, formIdPrefix}) => {


    //schema for yup
    


    const handleSubmit = (e) => {
        e.preventDefault();

        // console.log("academic form submitted");
        onSubmit("academic form data")
    }


    

    

    return (
        <div>
            <div className='grid grid-cols-1 mt-5 xl:mt-2 2xl:mt-10 text-lg form'>

                <label htmlFor={`${formIdPrefix}enrollmentNo`}>Enrollment No.</label>
                <input type="number" id={`${formIdPrefix}enrollmentNo`}  className='bg-[#070F2B] border-b-2 w-full focus:outline-none xl:mt-0 2xl:mt-2 md:mt-2 text-md'
                    name="ProfileAcademicForm.enrollmentNo"
                    value={formik.values.ProfileAcademicForm.enrollmentNo}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange} />
                {formik.errors.ProfileAcademicForm && isSubmiting &&(
                    <div style={{ color: "red" }}>
                        <small>{formik.errors.ProfileAcademicForm.enrollmentNo}</small>
                    </div>
                )}

                <label htmlFor={`${formIdPrefix}department`} className='mt-6 xl:mt-5 2xl:mt-8'>Department</label>
                <input type="text" name='department' value={formik.values.ProfileAcademicForm.department} id={`${formIdPrefix}department`} className=' bg-[#070F2B] border-b-2 w-full focus:outline-none 2xl:mt-2 md:mt-2 xl:mt-0' disabled />


                <label htmlFor={`${formIdPrefix}year`} className='mt-6 2xl:mt-8 xl:mt-5'>Year</label>
                <select id={`${formIdPrefix}year`} className=' bg-[#070F2B] border-b-2 w-full focus:outline-none 2xl:mt-2 md:mt-2 xl:mt-0' 
                    name="ProfileAcademicForm.year"
                    value={formik.values.ProfileAcademicForm.year}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}>
                    <option values="1">1</option>
                    <option values="2">2</option>
                    <option values="3">3</option>
                    <option values="4">4</option>
                </select>
                {formik.errors.ProfileAcademicForm && isSubmiting && (
                    <div style={{ color: "red" }}>
                        <small>{formik.errors.ProfileAcademicForm.year}</small>
                    </div>
                )}


                <label htmlFor={`${formIdPrefix}semester`} className='mt-6 xl:mt-5 2xl:mt-8'>Semester</label>
                <select id={`${formIdPrefix}semester`} className=' bg-[#070F2B] border-b-2 w-full focus:outline-none 2xl:mt-2 md:mt-2 xl:mt-0' 
                    name="ProfileAcademicForm.semester"
                    value={formik.values.ProfileAcademicForm.semester}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}>
                    <option values="1">1</option>
                    <option values="2">2</option>
                    <option values="3">3</option>
                    <option values="4">4</option>
                    <option values="4">5</option>
                    <option values="4">6</option>
                    <option values="4">7</option>
                    <option values="4">8</option>
                </select>
                {formik.errors.ProfileAcademicForm && isSubmiting && (
                    <div style={{ color: "red" }}>
                        <small>{formik.errors.ProfileAcademicForm.semester}</small>
                    </div>
                )}




                {/* <div className='flex justify-end'>
                   
                </div> */}
            </div>
            {/* <div className='flex w-full justify-end lg:hidden mt-4'>
                <button className='bg-[#9290C3] text-black font-semibold lg:w-2/5 w-3/12 px-0 lg:py-2 py-3 rounded-lg
             hover:bg-[#535C91] hover:scale-105 transition duration-500 lg:mt-8 mt-5 mb-0 2xl:mt-16 ' >Add</button>

            </div> */}
        </div>
    );
}

export default ProfileAcademicForm;
