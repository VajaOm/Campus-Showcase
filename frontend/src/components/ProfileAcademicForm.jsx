import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileAcademicForm = ({ formik, isSubmitting, formIdPrefix, sendDataToParent }) => {
    const [enrollmentNo, setEnrollmentNo] = useState('');
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('');
    const [selectedYear, setSelectedYear] = useState(1);
    const years = [1, 2, 3, 4];
    const semesters = {
        1: [1, 2],
        2: [3, 4],
        3: [5, 6],
        4: [7, 8]
    };

    const yearInputChangeHandler = (e) => {
        setSelectedYear(e.target.value);
    }

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("http://localhost:5000/user/profile", {
                    withCredentials: true,
                });
                const userData = response.data.data;

                setEnrollmentNo(userData.enrollmentNo);
                setYear(userData.year || '');
                setSemester(userData.semester || '');
            } catch (error) {
                console.log("Error in profile page:", error);
            }
        })();
    }, []);

    useEffect(() => {
        if (sendDataToParent) {
            sendDataToParent({ enrollmentNo: enrollmentNo, year: year, semester: semester });
        }
    }, [enrollmentNo, year, semester]);

    return (
        <div>
            <div className='grid grid-cols-1 mt-5 xl:mt-2 2xl:mt-10 text-lg form'>
                <label htmlFor={`${formIdPrefix}enrollmentNo`}>Enrollment No.</label>
                <input 
                    type="number" 
                    id={`${formIdPrefix}enrollmentNo`} 
                    className='bg-[#070F2B] border-b-2 w-full focus:outline-none xl:mt-0 2xl:mt-2 md:mt-2 text-md'
                    name="ProfileAcademicForm.enrollmentNo"
                    value={enrollmentNo || ''}
                    onBlur={formik.handleBlur}
                    onChange={(e) => setEnrollmentNo(e.target.value)} />
                {formik.errors.ProfileAcademicForm && isSubmitting && (
                    <div style={{ color: "red" }}>
                        <small>{formik.errors.ProfileAcademicForm.enrollmentNo}</small>
                    </div>
                )}

                <label htmlFor={`${formIdPrefix}department`} className='mt-6 xl:mt-5 2xl:mt-8'>Department</label>
                <input 
                    type="text" 
                    name='department' 
                    value={formik.values.ProfileAcademicForm.department} 
                    id={`${formIdPrefix}department`} 
                    className=' bg-[#070F2B] border-b-2 w-full focus:outline-none 2xl:mt-2 md:mt-2 xl:mt-0' 
                    disabled />

                <label htmlFor={`${formIdPrefix}year`} className='mt-6 2xl:mt-8 xl:mt-5'>Year</label>
                <select 
                    id={`${formIdPrefix}year`} 
                    className=' bg-[#070F2B] border-b-2 w-full focus:outline-none 2xl:mt-2 md:mt-2 xl:mt-0'
                    name="ProfileAcademicForm.year"
                    value={year || ''}
                    onBlur={formik.handleBlur}
                    onChange={(e) => {
                        yearInputChangeHandler(e);
                        setYear(e.target.value)
                    }} >
                    {years.map((year) => {
                        return <option value={year} key={year}>{year}</option>
                    })}
                </select>
                {formik.errors.ProfileAcademicForm && isSubmitting && (
                    <div style={{ color: "red" }}>
                        <small>{formik.errors.ProfileAcademicForm.year}</small>
                    </div>
                )}

                <label htmlFor={`${formIdPrefix}semester`} className='mt-6 xl:mt-5 2xl:mt-8'>Semester</label>
                {selectedYear && 
                <select 
                    id={`${formIdPrefix}semester`} 
                    className=' bg-[#070F2B] border-b-2 w-full focus:outline-none 2xl:mt-2 md:mt-2 xl:mt-0'
                    name="ProfileAcademicForm.semester"
                    value={semester || ''}
                    onBlur={formik.handleBlur}
                    onChange={(e) => setSemester(e.target.value)}>
                    {semesters[selectedYear].map((semester) => {
                        return <option value={semester} key={semester} >{semester}</option>
                    })}
                </select>}
                {formik.errors.ProfileAcademicForm && isSubmitting && (
                    <div style={{ color: "red" }}>
                        <small>{formik.errors.ProfileAcademicForm.semester}</small>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProfileAcademicForm;
