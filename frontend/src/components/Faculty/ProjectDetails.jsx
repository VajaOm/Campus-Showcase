import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import ImageSlider from '../ImageSlider';
import image from '../../assets/add_project_pattern.png';

const ProjectDetails = () => {

    const { projectId, semester } = useParams();
    const [projectData, setProjectData] = useState({
        title: "",
        tools: "",
        description: "",
        category: "",
        images: [],
        video: {},
        sourcecode: [],
        ppt: {},
        owner: ''
    });
    const [selectedSourcecode, setSelectedSourcecode] = useState(null);
    const [selectedSourceCodeContent, setSelectedSourceCodeContent] = useState("");
    const [suggestion, setSuggestion] = useState('');
    const navigate = useNavigate();


    useEffect(() => {

        const fetchData = async () => {
            window.scrollTo(0, 0);
            try {
                const response = await axios.get(`http://localhost:5000/project/getprojectdetails/${projectId}`, {
                    withCredentials: true,
                    headers: {
                        'Accept': 'application/json',
                    }
                });
                // console.log(response);
                // setTitle(response.data.data.title);
                setProjectData({
                    title: response.data.data.title,
                    tools: response.data.data.tools,
                    description: response.data.data.description,
                    category: response.data.data.category,
                    images: response.data.data.images,
                    video: response.data.data.video,
                    sourcecode: response.data.data.sourceCode,
                    ppt: response.data.data.ppt,
                    owner: response.data.data.owner
                })

            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [])



    const handleSourceCodeClick = async (index) => {
        try {

            const url = projectData.sourcecode[index].fileUrl;
            // console.log(url);

            const response = await axios.get(url, {
                responseType: 'text',
            });

            setSelectedSourceCodeContent(response.data);
            setSelectedSourcecode(index)

        } catch (error) {
            console.error('Error fetching source code content:', error);
        }
    };

    const urls = projectData.images.map((image, index) => image.fileUrl)

    const slides = urls.map((url, index) => ({ url }));

    const handlePptClick = async () => {
        const url = projectData.ppt.fileUrl;
        // console.log(url);

        const link = document.createElement('a');
        link.href = url;


        link.download = projectData.ppt.fileName || projectData.ppt.name || 'presentation.pptx';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const suggestionChangeHandler = (e) => {
        setSuggestion(e.target.value);
    }

    const submitBtnClickHandler = async(e) => {

        e.preventDefault();
        const response = await axios.post(`http://localhost:5000/project/${projectId}/addSuggestion`, {suggestion}, {
            withCredentials: true,
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        });
        
        if(response.status === 200) {
            navigate(`/admindashboard/projects/${semester}/${projectData.owner}`)
        }
    }

    return (
        <div className='flex flex-col items-center gap-8 max-h-max' style={{ backgroundImage: `url(${image})` }}>
            <div className='w-11/12 lg:w-8/12'>
                <div className='mt-14 text-white'>
                    <Link to={`/admindashboard/projects/${semester}/${projectData.owner}`} className='ml-5 lg:ml-0 text-lg p-2 rounded-md bg-[#9290C3] hover:bg-[#535C91] duration-300 text-black font-semibold'><ArrowBackIcon />Back</Link>
                </div>
                <div className='mt-5 lg:mt-10 w-full flex justify-center '>
                    <div className='w-11/12 flex flex-col gap-6'>
                        <h1 className='text-xl lg:text-3xl'>{projectData.title}</h1>
                        <p className='text-sm text-justify lg:text-lg'>{projectData.description}</p>
                        <p className='lg:text-lg'><span className='underline'>Technology</span> : {projectData.tools}</p>
                        <p className='lg:text-lg'><span className='underline'>category</span> : {projectData.category}</p>


                        {/* source code container */}
                        <div className='w-full flex flex-col justify-around'>
                            <label htmlFor="title" className='lg:text-xl underline '>Source code : </label>
                            {projectData.sourcecode.length > 0 ? (
                                <div className='w-full border-2 border-white border-dotted rounded-md p-2 flex flex-col mt-6'>
                                    {projectData.sourcecode.map((file, index) => (
                                        <div key={index}>
                                            <div className='w-full flex' >
                                                <div className='table-cell w-5/6 py-2'>
                                                    <h1 onClick={() => handleSourceCodeClick(index)}>
                                                        {file.fileName}
                                                    </h1>
                                                </div>
                                            </div>
                                            {/* Display selected source code content */}
                                            {selectedSourcecode === index && (
                                                <div className='h-1/2'>
                                                    <div className='flex justify-between bg-[#535C91] p-2 rounded-t-md '>
                                                        <h1>{projectData.sourcecode[selectedSourcecode].fileName}</h1>
                                                        <CloseIcon onClick={() => setSelectedSourcecode(null)} />
                                                    </div>
                                                    <div className='bg-black text-white p-4 rounded-md overflow-auto h-[50vh]'>
                                                        <pre>
                                                            <code className='text-sm md:text-md'>
                                                                {selectedSourceCodeContent}
                                                            </code>
                                                        </pre>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className='text-center border-2 border-white rounded-md p-2'>No file yet</div>
                            )}
                        </div>

                        {/* image container */}
                        <div className='w-full h-full flex flex-col '>
                            <h1 className='text-md lg:text-xl'><span className='underline'>Images</span> :</h1>
                            <div className='flex justify-center'>
                                <ImageSlider slides={slides} />
                            </div>
                        </div>

                        <div>
                            <h1 className='mb-5 lg:text-xl '><span className='underline'>Video</span> :</h1>
                            <div className='p-2 bg-black rounded-md flex justify-center'>
                                <video src={projectData?.video?.fileUrl} controls className='drop'></video>
                            </div>
                        </div>


                        <div>
                            <div className='w-full flex flex-col justify-around mb-10'>
                                <label htmlFor="title " className='lg:text-xl'><span className='underline'>PPT</span> : </label>
                                {projectData.ppt ? (
                                    <div className=' mt-5 w-full border-2 border-white rounded-md border-dotted table p-2'>
                                        <div key={0} className='table-row'>
                                            <div className='table-cell w-5/6 py-2'>
                                                <h1 className='text-white' onClick={handlePptClick}>
                                                    {projectData.ppt.name || projectData.ppt.fileName}
                                                </h1>
                                            </div>

                                        </div>
                                    </div>
                                ) : (
                                    <div className='text-center border-2 border-white rounded-md p-2'>No file yet</div>
                                )}

                            </div>
                        </div>
                        <label htmlFor="suggestions" className='text-xl'>
                            Suggestions
                        </label>
                        <textarea name="description" id="description" className='rounded-md resize-none mt-2 min-h-[7rem] focus:outline-none p-2 text-black text-sm mb-10' cols="20" rows="5" placeholder='Tell us about your project' onChange={suggestionChangeHandler}></textarea>

                        <div className='flex justify-center'>
                            <button to={`/admindashboard/projects/${semester}/${projectData.owner}`} className='w-full sm:w-1/4 ml-5 mb-10 lg:ml-0 text-lg p-2 rounded-md bg-[#9290C3] hover:bg-[#535C91] duration-300 text-black font-semibold' 
                            onClick={submitBtnClickHandler}>Send</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ProjectDetails;
