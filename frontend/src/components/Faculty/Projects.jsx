import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import image from '../../assets/add_project_pattern.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Projects = () => {

    const { id, semester } = useParams();
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [student, setStudent] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
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
            setFilteredProjects(response.data.projects);
        }

        fetchData();
    }, []);

    useEffect(() => {
        const filtered = projects.filter(project =>
            project.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProjects(filtered);
    }, [searchTerm, projects]);

    const projectClickHandler = (projectId) => {
        navigate(`/admindashboard/project/${semester}/${projectId}`);
    }

    return (
        <div className='h-screen flex flex-col gap-8' style={{ backgroundImage: `url(${image})` }}>

            <div className='mt-14 text-white'>
                <Link to={`/admindashboard/students/${semester}`} className='ml-5 lg:ml-16 text-lg p-2 rounded-md bg-[#9290C3] hover:bg-[#535C91] duration-300 text-black font-semibold'><ArrowBackIcon />Back</Link>
            </div>

            <div>
                <h1 className='text-center text-xl lg:text-3xl underline'>Projects</h1>
                <div className='flex flex-col '>

                    <div className='flex justify-center'>
                        <div className='w-11/12 flex flex-col gap-4 mt-5 text-lg '>
                            <h1 >Name : {student.fullName}</h1>
                            <h1>Semester : {student.semester}</h1>
                            <div className='flex items-baseline gap-2 md:gap-3'>
                                <h1>Project Name</h1>
                                <input
                                    type="text"
                                    className='lg:w-1/4 rounded-md focus:outline-none mb-5 p-2 md:p-2 text-black'
                                    placeholder='Search project'
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-center mt-10'>
                        <table className='w-11/12 text-center'>
                            <thead className='border-b-2 '>
                                <tr className='lg:text-xl'>
                                    <th>No.</th>
                                    <th>Title</th>
                                    <th>Category</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredProjects.map((project, index) => (
                                        <tr className='hover:bg-[#535C91] duration-300 lg:text-lg' key={index} onClick={() => projectClickHandler(project._id)}>
                                            <td className='py-3'>{index + 1}</td>
                                            <td className='py-3'>{project.title}</td>
                                            <td className='py-3'>{project.category}</td>
                                        </tr>
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
