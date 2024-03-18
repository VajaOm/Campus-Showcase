import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Projects = () => {

    const { id } = useParams();
    const [projects, setProjects] = useState([]);
    const [student, setStudent] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:5000/user/getstudentprojects/${id}`, {
                withCredentials: true,
                headers: {
                    'Accept': 'application/json',
                }
            });
            console.log(response.data)
            setStudent(response.data.user)
            setProjects(response.data.projects);
        }

        fetchData();
    }, []);

    const projectClickHandler = (projectId) => {
        navigate(`/admindashboard/project/${projectId}`);
    }

    return (
        <div className='mt-10 '>
            <div>
                <h1 className='text-center text-xl underline'>Projects</h1>
                <div className='flex flex-col '>

                    <div className='flex justify-center'>
                        <div className='w-11/12 flex flex-col gap-4 mt-5 text-lg '>
                            <h1 >Name : {student.fullName}</h1>
                            <h1>Semester : {student.semester}</h1>
                        </div>
                    </div>

                    <div className='flex justify-center mt-10'>
                        <table className='w-full text-center'>
                            <thead className='border-b-2 '>
                                <tr>
                                    <th>No.</th>
                                    <th>Title</th>
                                    <th>Category</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    projects.map((project, index) => (
                                        <>
                                            <tr className='hover:bg-[#535C91] duration-300' key={index} onClick={() => projectClickHandler(project._id)}>
                                                <td className='py-3'>{index + 1}</td>
                                                <td className='py-3'>{project.title}</td>
                                                <td className='py-3'>{project.category}</td>
                                            </tr>
                                        </>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default Projects;
