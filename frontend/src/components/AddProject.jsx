import React, { useState } from 'react';
import * as Yup from 'yup';
import UploadFields from './UploadFields';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import topPattern from '../assets/add_project_pattern.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Triangle } from 'react-loader-spinner';

function AddProject({ showMenu, setProgress }) {
    const [dragActive, setDragActive] = useState(false);
    const [errors, setErrors] = useState({});
    const [projectData, setProjectData] = useState({
        title: "",
        description: "",
        tools: "",
        category: ""
    })

    const [fileData, setFileData] = useState({
        images: [],
        video: [],
        sourceCode: [],
        ppt: []
    });

    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);

    const validationSchema = Yup.object({
        title: Yup.string().required(() => (
            <span className='text-sm'>
                <InfoOutlinedIcon style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                Project Title is required
            </span>
        )),
        description: Yup.string().required(() => (
            <span className='text-sm'>
                <InfoOutlinedIcon style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                Project Description is required
            </span>
        )),
        category: Yup.string().required(() => (
            <span className='text-sm'>
                <InfoOutlinedIcon style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                Category of the project is required
            </span>
        )),
        tools: Yup.string().required(() => (
            <span className='text-sm'>
                <InfoOutlinedIcon style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                Technology or tools are required
            </span>
        ))
    });


    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropogation();

        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        }
        else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }

    const onChangeHandler = (e) => {
        const { name, value } = e.target;

        setProjectData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    async function readAsText(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsText(file);
        });
    }




    const addProjectBtnHandler = async (e) => {
        e.preventDefault();

        try {
            await validationSchema.validate(projectData, { abortEarly: false });

            // console.log("Project data: " + JSON.stringify(projectData));

            const formData = new FormData();
            // formData.append("images", fileData.images[0]);
            // Append form fields
            formData.append("title", projectData.title);
            formData.append("description", projectData.description);
            formData.append("tools", projectData.tools);
            formData.append("category", projectData.category);

            // Append files
            fileData.images.forEach((image) => {
                formData.append(`images`, image);
            });

            fileData.video.forEach((video) => {
                formData.append("video", video);
            });


            fileData.ppt.forEach((ppt) => {
                formData.append("ppt", ppt);
            });

            // Convert and source code files into text file
            const sourceCodeUploadPromises = fileData.sourceCode.map(async (sourceCodeFile) => {
                try {

                    if (!(sourceCodeFile instanceof File)) {
                        console.error("Invalid sourceCodeFile:", sourceCodeFile);
                        return;
                    }

                    const codeContent = await readAsText(sourceCodeFile);

                    const textFileName = `${sourceCodeFile.name}`;

                    const blob = new Blob([codeContent], { type: 'text/plain' });
                    const textFile = new File([blob], textFileName, { type: 'text/plain' });

                    formData.append(`sourceCode`, textFile);
                } catch (error) {
                    console.error("Error processing source code file:", error);
                    throw error;
                }
            });

            await Promise.all(sourceCodeUploadPromises);

            try {
                setLoader(true)
                const response = await axios.post("http://localhost:5000/project/addproject", formData, {
                    headers: {
                        'Content-Type': "multipart/form-data"
                    },
                    withCredentials: true
                });
                console.log(response);

                setProgress(40)
                if (response.status === 201) {
                    setProgress(100)
                    navigate('/dashboard/');
                }

            } catch (error) {
                console.log("Error in adding a project ::: " + error);
            }

        } catch (error) {
            let newErrors = {};
            error.inner?.forEach((err) => {
                newErrors[err.path] = err.message;
            });
            setErrors(newErrors);
        }
    }

    return (
        <div
            className={` flex flex-col items-center justify-center w-full sm:justify-start sm:w-full md:w-11/12 relative  box-border overflow-y-auto flex-1 lg:w-full ${showMenu ? 'filter blur-sm' : ''} h-screen`} style={loader ? {} :{ backgroundImage: `url(${topPattern})` }}

        >


            <div className={`w-full flex justify-center items-center absolute translate-y-2/12 h-screen ${loader ? 'block' : 'hidden'}`} >
                <Triangle
                    visible={true}
                    height="100"
                    width="100"
                    color="#9290C3"
                    ariaLabel="triangle-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>

            <form action="" method='post' encType='multipart/form-data' onSubmit={addProjectBtnHandler} onDragEnter={handleDrag} className={`w-10/12 sm:w-full lg:w-9/12 md:w-full  flex justify-center ${loader ? 'blur-lg ' : ''} `}>
                <div className={`flex flex-col sm:mx-10 md:w-full sm:w-full w-full `}>
                    <p className="text-slate-100 text-2xl lg:text-3xl mt-14 2xl:text-3xl lg:mt-5 ">Add Project</p>

                    <label htmlFor="title" className='text-slate-100 text-lg mt-6 lg:mt-4'>Project Title</label>
                    <input id='title' name='title' className='rounded-md focus:outline-none mt-2 p-2 text-black text-sm' type="text" placeholder='Enter the project title' onChange={onChangeHandler} />
                    {errors.title && <div className='text-red-500'>{errors.title}</div>}

                    <label htmlFor="tools" className='text-slate-100 text-lg mt-6 lg:mt-4'>Used Technology Or Tools</label>
                    <input id='tools' name='tools' className='rounded-md focus:outline-none mt-2 p-2 text-black text-sm' type="text" placeholder='Enter the technology or tools used in the project' onChange={onChangeHandler} />
                    {errors.tools && <div className='text-red-500'>{errors.tools}</div>}

                    <label htmlFor='description' className="text-slate-100 text-lg mt-6 lg:mt-4">Description</label>
                    <textarea name="description" id="description" className='rounded-md resize-none mt-2 min-h-[7rem] focus:outline-none p-2 text-black text-sm' cols="20" rows="5" placeholder='Tell us about your project' onChange={onChangeHandler}></textarea>
                    {errors.description && <div className='text-red-500'>{errors.description}</div>}

                    <label className="text-slate-100 text-lg mt-6 lg:mt-4">Category</label>
                    <select id='category' name='category' className="rounded-md mt-2 text-black p-2 focus:outline-none w-1/2 text-sm" defaultValue="" onChange={onChangeHandler}>
                        <option disabled value="">Select category</option>
                        <option>Web Development</option>
                        <option>Mobile App Development</option>
                        <option>Data Science</option>
                        <option>Artificial Intelligence</option>
                        <option>Machine Learning</option>
                    </select>
                    {errors.category && <div className='text-red-500'>{errors.category}</div>}


                    <p className="text-slate-100 text-xl mt-6 lg:mt-4">Upload your project</p>
                    <br />

                    <UploadFields label="images" onFileChange={(files) => setFileData({ ...fileData, images: files })} />
                    <br />
                    <UploadFields label="sourceCode" onFileChange={(files) => setFileData({ ...fileData, sourceCode: files })} />
                    <br />
                    <UploadFields label="video" onFileChange={(files) => setFileData({ ...fileData, video: files })} />
                    <br />
                    <UploadFields label="ppt" onFileChange={(files) => setFileData({ ...fileData, ppt: files })} />
                    <div className='flex justify-center mt-10'>

                        <button className='rounded-md p-2 hover:bg-[#535C91] bg-[#9290C3] text-black font-bold mb-10 w-full md:w-1/2 lg:w-2/12 transform duration-200' >Add Project</button>

                    </div>
                </div>
            </form>




        </div>
    );
}

export default AddProject;
