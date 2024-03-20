import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import image from '../../assets/add_project_pattern.png';

const Students = () => {
    const { semester } = useParams();
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:5000/user/getstudents/${semester}`, {
                withCredentials: true,
                headers: {
                    'Accept': 'application/json',
                }
            });
            setStudents(response.data.data);
        };
        fetchData();
    }, [semester]);

    const clickHandler = (id) => {
        navigate(`/admindashboard/projects/${semester}/${id}`);
    };

    const filteredStudents = students.filter(student =>
        student.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='flex flex-col gap-8 h-screen ' style={{ backgroundImage: `url(${image})` }}>
            <div className='mt-14 text-white'>
                <Link to={`/admindashboard`} className='ml-5 lg:ml-16 text-lg p-2 rounded-md bg-[#9290C3] hover:bg-[#535C91] duration-300 text-black font-semibold'><ArrowBackIcon />Back</Link>
            </div>

            <div className=' flex flex-col items-center '>
                <div className='w-11/12 flex flex-col gap-4'>
                    <h1 className='text-xl md:text-2xl mt-5 lg:text-3xl underline text-center '>Semester {semester}</h1>
                    <h1 className='text-xl mt-5 lg:text-2xl'>Students</h1>
                    <div className='flex items-baseline gap-2'>
                        <h1 className='text-lg'>Student Name :  </h1>
                        <input
                            type="text"
                            className='lg:w-1/4 rounded-md focus:outline-none mb-5 p-2 md:p-2 text-black'
                            placeholder='Search Student'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <table className='text-center'>
                        <thead className='border-b-2'>
                            <tr className='lg:text-xl'>
                                <th>No.</th>
                                <th>Student</th>
                                <th>Projects</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map((student, index) => (
                                <tr className='hover:bg-[#535C91] duration-300 lg:text-lg' key={index} onClick={() => clickHandler(student._id)}>
                                    <td className='py-3'>{index + 1}</td>
                                    <td className='py-3'>{student.fullName}</td>
                                    <td className='py-3'>{student.projects?.length}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Students;
