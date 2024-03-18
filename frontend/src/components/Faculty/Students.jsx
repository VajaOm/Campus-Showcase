import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Students = () => {

    const { semester } = useParams();
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:5000/user/getstudents/${semester}`, {
                withCredentials: true,
                headers: {
                    'Accept': 'application/json',
                }
            });
            console.log(response.data.data)
            setStudents(response.data.data);
        }

        fetchData();
    }, []);

    const clickHandler = (id) => {
        navigate(`/admindashboard/projects/${id}`);
    }

    return (
        <div className='flex justify-center'>
            <div className='w-11/12 flex flex-col gap-4 mt-5'>
                <h1 className='text-xl mt-5 lg:text-3xl underline text-center'>Semester {semester}</h1>
                <h1 className='text-xl mt-5 lg:text-3xl'>Students</h1>
                <table className='text-center'>
                    <thead className='border-b-2'>
                        <tr>
                            <th>No.</th>
                            <th>Student</th>
                            <th>Projects</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            students.map((student, index) => (
                                <>
                                    <tr className='hover:bg-[#535C91] duration-300' key={index} onClick={() => clickHandler(student._id)}>
                                        <td className='py-3'>{index + 1}</td>
                                        <td className='py-3'>{student.fullName}</td>
                                        <td className='py-3'>{student.projects?.length}</td>
                                    </tr>
                                </>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Students;
