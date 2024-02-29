import React, { useState } from 'react';
import * as Yup from 'yup';
import UploadFields from './UploadFields';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import topPattern from '../assets/add_project_pattern.png';

function AddProject({ showMenu }) {
    const [dragActive, setDragActive] = useState(false);
    const [errors, setErrors] = useState({});
    const [projectData, setProjectData] = useState({
        projectTitle: "",
        description: "",
        category: ""
    })

    const validationSchema = Yup.object({
        projectTitle: Yup.string().required(() => (
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

    const addProjectBtnHandler = async (e) => {
        e.preventDefault();

        try {
            await validationSchema.validate(projectData, { abortEarly: false });
            // console.log("Project data: " + JSON.stringify(projectData));
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
            className={`flex justify-center w-full sm:justify-start sm:w-full md:w-11/12 lg:w-9/12 box-border overflow-y-auto flex-1 ${showMenu ? 'filter blur-sm' : ''}`}

        >

            <form action="" onSubmit={addProjectBtnHandler} onDragEnter={handleDrag} className='w-10/12 sm:w-full md:w-full lg:w-full flex justify-center '>
                <div className={`flex flex-col sm:mx-10 md:w-full sm:w-full w-full `}>
                    <p className="text-slate-100 text-2xl lg:text-3xl mt-14 2xl:text-3xl lg:mt-5 ">Add Project</p>

                    <label htmlFor="projectTitle" className='text-slate-100 text-lg mt-6 lg:mt-4'>Project Title</label>
                    <input id='projectTitle' name='projectTitle' className='rounded-md focus:outline-none mt-2 p-2 text-black text-sm' type="text" placeholder='Enter the project title' onChange={onChangeHandler} />
                    {errors.projectTitle && <div className='text-red-500'>{errors.projectTitle}</div>}

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

                    <UploadFields label="Images" />
                    <br />
                    <UploadFields label="Source Code" />
                    <br />
                    <UploadFields label="Video" />
                    <br />
                    <UploadFields label="PPT" />
                    <div className='flex justify-center mt-10'>

                        <button className='rounded-md p-2 hover:bg-[#535C91] bg-[#9290C3] text-black font-bold mb-10 w-full md:w-1/2 lg:w-2/12 transform duration-200' >Add Project</button>

                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddProject;
