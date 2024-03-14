import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CloseIcon from '@mui/icons-material/Close';


export default function EditProjectPage() {
  const { projectId } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedSourcecode, setSelectedSourcecode] = useState(null);
  const [selectedSourceCodeContent, setSelectedSourceCodeContent] = useState("");
  const [projectData, setProjectData] = useState({
    title: "",
    tools: "",
    description: "",
    category: "",
    images: [],
    video: {},
    sourcecode: [],
    ppt: {}
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/project/getprojectdata/${projectId}`, {
          withCredentials: true,
          headers: {
            'Accept': 'application/json',
          }
        });
        console.log(response);
        // setTitle(response.data.data.title);
        setProjectData({
          title: response.data.data.title,
          tools: response.data.data.tools,
          description: response.data.data.description,
          category: response.data.data.category,
          images: response.data.data.images,
          video: response.data.data.video,
          sourcecode: response.data.data.sourceCode,
          ppt: response.data.data.ppt
        })

      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [])

  const handleMultipleFileChange = (name, value) => {

    if (name === "video" || name === "ppt") {
      setProjectData((prevData) => ({
        ...prevData,
        [name]: value
      }))
    }

    else {
      setProjectData((prevData) => ({
        ...prevData,
        [name]: [...prevData[name], value]
      }));
    }
  }

  const handleMultipleFileDelete = (name, index) => {
    if (name === "video" || name === "ppt") {

      setProjectData((prev) => ({
        ...prev,
        [name]: null
      }))
    }

    else {
      const updatedData = [...projectData[name]];
      updatedData.splice(index, 1);
      setProjectData((prevData) => ({
        ...prevData,
        [name]: updatedData
      }));
    }

  };

  const handlePptClick = async () => {
    const url = projectData.ppt.fileUrl;
    console.log(url);

    const link = document.createElement('a');
    link.href = url;


    link.download = projectData.ppt.fileName || projectData.ppt.name || 'presentation.pptx';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSourceCodeClick = async (index) => {
    try {

      const url = projectData.sourcecode[index].fileUrl; // Assuming fileUrl is the URL for fetching content
      console.log(url);

      // Make a request to fetch the source code content
      const response = await axios.get(url, {
        responseType: 'text',
      });


      setSelectedSourceCodeContent(response.data);
      setSelectedSourcecode(index)

    } catch (error) {
      console.error('Error fetching source code content:', error);
    }
  };

  const inputChangeHandler = (name, value) => {
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  const updateBtnClickHandler = (e) => {
    e.preventDefault();
  
    const newData = {
      ...projectData,
      images: projectData.images.filter(image => image instanceof File),
      sourcecode: projectData.sourcecode.filter(file => file instanceof File),
      video: projectData.video instanceof File ? projectData.video : null,
      ppt: projectData.ppt instanceof File ? projectData.ppt : null
    };
  
  }

  return (
    <div className={`mt-14 w-full flex flex-col ${selectedImage} relative md:text-lg`}>
      <Link to={'/dashboard/myprojects'} className='ml-5 lg:ml-0 text-lg'><ArrowBackIcon />Back</Link>

      <div className='flex flex-col ml-5 lg:ml-0'>
        <div className='w-11/12 flex flex-col items-center mt-10 gap-y-6 lg:gap-y-8'>
          <div className='w-full flex justify-between '>
            <label htmlFor="title">Project Title : </label>
            <input type="text" value={projectData.title} className='w-3/5 border-b-2 border-white bg-[#070F2B] px-1 focus:outline-none' onChange={(e) => inputChangeHandler("title", e.target.value)} />
          </div>
          <div className='w-full flex justify-between'>
            <label htmlFor="tools ">Technology : </label>
            <input id='tools' name='tools' className='w-3/5 border-b-2 border-white bg-[#070F2B] px-1 focus:outline-none' value={projectData.tools} onChange={(e) => inputChangeHandler("tools", e.target.value)} />
          </div>
          <div className='w-full flex flex-col '>
            <label htmlFor="title">Description : </label>
            <textarea
              name="description"
              id="description"
              className='resize-none mt-2 min-h-[7rem] focus:outline-none  text-sm md:text-md lg:text-lg text-justify bg-[#0a1640] rounded-md p-4'
              cols="25"
              rows="fit"
              placeholder='Tell us about your project'
              value={projectData.description}
              onChange={(e) => inputChangeHandler("description", e.target.value)}
            ></textarea>
          </div>
          <div className='w-full flex justify-between'>
            <label htmlFor="title">Category : </label>
            <select
              id='category'
              name='category'
              className=" border-b-2 border-white p-1 bg-[#070F2B] text-white focus:outline-none w-4/6 text-sm lg:text-lg "
              value={projectData.category}
              onChange={(e) => inputChangeHandler("category", e.target.value)}
            >
              <option >Web Development</option>
              <option>Mobile App Development</option>
              <option>Data Science</option>
              <option>Artificial Intelligence</option>
              <option>Machine Learning</option>
            </select>
          </div>

          {/* image container */}
          <div className='w-full flex flex-col justify-around'>
            <label htmlFor="title">Images : </label>
            {projectData.images.length > 0 ? (<>

              <div className='border-2 border-white border-dotted w-full flex flex-col  p-2 '>
                {projectData.images.map((image, index) => (
                  <div className='flex flex-col w-full items-center'>
                    <div key={index} className='flex w-full '>
                      <div className='table-cell w-5/6 py-2 '>
                        <h1 className='text-white' onClick={() => setSelectedImage(index)}>
                          {image.fileName ? image.fileName : image.name}
                        </h1>
                      </div>
                      <div className='table-cell w-2/12 py-2'>
                        <HighlightOffIcon onClick={(e) => handleMultipleFileDelete("images", index)} />
                      </div>
                    </div>
                    <div className='w-full'>
                      {selectedImage === index && (
                        <div className='w-full transform transition-opacity fade-enter-active'>
                          <div className='w-full py-2' colSpan="2">
                            <div className='flex justify-between bg-[#535C91] p-2 rounded-t-md '>
                              <h1>{projectData.images[selectedImage].fileName}</h1>
                              <CloseIcon onClick={() => setSelectedImage(null)} />
                            </div>
                            <div className='flex  flex-col items-center'>
                              {projectData.images[selectedImage] instanceof File ? (
                                <img src={URL.createObjectURL(projectData.images[selectedImage])} className='w-full h-full lg:w-1/2 lg:h-1/2' alt="img" />
                              ) : <img src={projectData.images[selectedImage]?.fileUrl} className='w-full h-full lg:w-1/2 lg:h-1/2' alt="img" />}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
            ) : (
              <div className='text-center border-2 border-white rounded-md p-2'>No file yet</div>
            )}
            <div className='flex flex-col items-end p-4'>
              <label
                htmlFor="fileInput"
                className='border-2 border-white text-white p-2 w-1/5  text-center rounded-md mt-5 hover:bg-[#9290C3] hover:text-black hover:font-semibold transform duration-200'>
                Select
              </label>
              <input
                type="file"
                id="fileInput"
                className='hidden'
                onChange={(e) => handleMultipleFileChange("images", e.target.files[0])}
                accept="image/*"
              />

            </div>
          </div>


          {/* video container */}
          <div className='w-full flex flex-col justify-around'>
            <label htmlFor="title">Video : </label>
            {projectData.video ? (
              <div className='border-2 border-white border-dotted w-full p-2 flex flex-col'>
                <div key={0} className='flex justify-center'>
                  <div className='table-cell w-5/6 py-2'>
                    <h1 className='text-white' onClick={() => setSelectedVideo(projectData.video)}>
                      {projectData.video.name || projectData.video.fileName}
                    </h1>
                  </div>
                  <div className='table-cell w-2/12 py-2'>
                    <HighlightOffIcon onClick={(e) => handleMultipleFileDelete("video", 0)} />
                  </div>
                </div>
                <div className='w-full'>

                  {selectedVideo && (
                    <div className='w-full flex flex-col items-center'>
                      <div className='flex justify-between w-full bg-[#535C91] p-2 rounded-t-md h-1/2'>
                        <h1>{projectData.video.fileName || projectData.video.name}</h1>
                        <CloseIcon onClick={() => setSelectedVideo(null)} />
                      </div>
                      <div className='h-1/3'>
                        <video src={selectedVideo?.fileUrl || URL.createObjectURL(projectData.video)} alt="video" controls />

                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className='text-center border-2 border-white rounded-md p-2'>No file yet</div>
            )}
            <div className='flex flex-col items-end p-4'>
              <label
                htmlFor="videoInput"
                className='p-2 w-1/5 border-2 border-white text-white text-center rounded-md mt-5 hover:bg-[#9290C3] hover:text-black hover:font-semibold transform duration-200'>
                Select
              </label>
              <input
                type="file"
                id="videoInput"
                className='hidden'
                onChange={(e) => handleMultipleFileChange("video", e.target.files[0])}
                accept="video/*"
              />
            </div>
          </div>


          {/* source code container */}
          <div className='w-full flex flex-col justify-around'>
            <label htmlFor="title">Source code : </label>
            {projectData.sourcecode.length > 0 ? (
              <div className='w-full border-2 border-white border-dotted p-2 flex flex-col' >
                {projectData.sourcecode.map((file, index) => (
                  <>
                    <div key={index} className='w-full flex '>
                      <div className='table-cell w-5/6 py-2'>
                        <h1 className='text-white ' onClick={() => handleSourceCodeClick(index)}>
                          {file.fileName ? file.fileName : file.name}
                        </h1>
                      </div>
                      <div className='table-cell w-2/12 py-2'>
                        <HighlightOffIcon onClick={() => handleMultipleFileDelete("sourcecode", index)} />
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
                  </>
                ))}
              </div>
            ) : (
              <div className='text-center border-2 border-white rounded-md p-2'>No file yet</div>
            )}
            <div className='flex flex-col items-end p-4'>
              <label
                htmlFor="sourceInput"
                className=' p-2 w-1/5 text-white border-2 border-white text-center rounded-md mt-5 hover:bg-[#9290C3] hover:text-black hover:font-semibold transform duration-200'>
                Select
              </label>
              <input
                type="file"
                id="sourceInput"
                className='hidden'
                onChange={(e) => handleMultipleFileChange("sourcecode", e.target.files[0])}

              />
            </div>
          </div>


          {/* ppt container */}
          <div className='w-full flex flex-col justify-around'>
            <label htmlFor="title">PPT : </label>
            {projectData.ppt ? (
              <div className='w-full border-2 border-white border-dotted table p-2'>
                <div key={0} className='table-row'>
                  <div className='table-cell w-5/6 py-2'>
                    <h1 className='text-white' onClick={handlePptClick}>
                      {projectData.ppt.name || projectData.ppt.fileName}
                    </h1>
                  </div>
                  <div className='table-cell w-2/12'>
                    <HighlightOffIcon onClick={(e) => handleMultipleFileDelete("ppt", 0)} />
                  </div>
                </div>
              </div>
            ) : (
              <div className='text-center border-2 border-white rounded-md p-2'>No file yet</div>
            )}
            <div className='flex flex-col items-end p-4'>
              <label
                htmlFor="pptInput"
                className=' p-2 w-1/5 text-white border-2 border-white text-center text-md rounded-md mt-5 hover:bg-[#9290C3] hover:text-black hover:font-semibold transform duration-200'>
                Select
              </label>
              <input
                type="file"
                id="pptInput"
                className='hidden'
                onChange={(e) => handleMultipleFileChange("ppt", e.target.files[0])}
              />
            </div>
          </div>



        </div>

      </div>

      <div className='w-full lg:w-11/12 flex justify-center'>
        <button className='lg:w-1/4 p-4 bg-[#9290C3] text-black mb-10 mt-10 w-11/12 text-lg rounded-lg hover:bg-[#535C91] font-bold' onClick={updateBtnClickHandler}>Update</button>
      </div>

    </div >
  );
}
