import React, { useEffect, useState } from 'react';
import CasesRoundedIcon from '@mui/icons-material/CasesRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import imgPattern from '../assets/Oreti.png'
import mobilePattern from '../assets/mobilePattren.png';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate, Link } from 'react-router-dom';
import topPattern from '../assets/add_project_pattern.png';


function MyProjectsPage({ showMenu }) {
  const isMobileScreen = window.innerWidth <= 768;

  const [projects, setProjects] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [open, setOpen] = useState(false);
  const [deleteProject, setDeleteProject] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/project/myprojects", {
          withCredentials: true
        });

        const projects = response.data.data;
        setProjects(projects);
      } catch (error) {
        throw new Error("Problem in fetching data .." + error)
      }
    };

    fetchData(); // Fetch initial project data

    return () => {
      // Cleanup or perform actions on component unmount if needed
    };
  }, [deleteProject]);

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchField.toLowerCase())
  );

  const handleDeleteClickOpen = (projectId) => {
    setOpen(true);
    setDeleteProject(projectId);
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteProject(null);
  };


  const deleteBtnClickHandler = async (deleteProject) => {
    handleClose();
    console.log(deleteProject)
    try {

      const response = await axios.post("http://localhost:5000/project/deleteproject", { deleteProjectId: deleteProject }, {
        headers: {
          'Content-Type': "application/x-www-form-urlencoded"
        },
        withCredentials: true
      });

      console.log(response)
      setProjects((prevProjects) =>
      prevProjects.filter((project) => project._id !== deleteProject)
    );

    } catch (error) {
      console.log("Error in deleting the project .." + error);
    }
  }

  const editBtnClickHandler = () => {
    navigate(`/dashboard/myprojects/editproject/${project._id}`)
  }

  return (
    <>

      <div className='w-full flex justify-center lg:justify-start mt-8 sm:mt-0 lg:mt-8 xl:mt-0' style={{ backgroundImage: `url(${topPattern})` }}>
        <div className={`flex flex-col lg:w-10/12 w-11/12 ${showMenu ? 'filter blur-sm' : ''}`}>
          <p className="text-slate-100 text-3xl sm:text-4xl mt-10">My Projects</p>
          <input
            type="text"
            className='rounded-md focus:outline-none mt-5 p-2 md:p-3 text-black'
            placeholder='Search Your Project'
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
          />

          <Link to="/dashboard/addproject">
            <div className='w-full h-full relative transform hover:text-4xl duration-300'>
              <img src={isMobileScreen ? mobilePattern : imgPattern} className='w-full mt-10 rounded-lg' alt="" />
              <h2 className='text-3xl text-black absolute transform translate-x-5 -translate-y-12 hover:text-4xl duration-300'>New Project</h2>
            </div>
          </Link>

          {filteredProjects.map((project, index) => (
            <div key={index}>
              <Link to={`projectdetails/${project._id}`} state={{ projectDetails: project }}>
                <div className='flex mt-6 bg-[#9290C3] p-3 lg:p-4 rounded-md justify-between hover:bg-[#535C91] transform duration-200' >
                  <div className='flex'>
                    <CasesRoundedIcon /> <p className=' text-md sm:text-lg ml-4 text-white'>{project.title}</p>
                  </div>
                  <div className='flex'>
                    <button onClick={(e) => { e.stopPropagation(); e.preventDefault(); handleDeleteClickOpen(project._id) }}><DeleteIcon className='mr-4' /></button>
                    <button onClick={editBtnClickHandler} ><AddToPhotosOutlinedIcon /></button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"

      >
        <DialogTitle id="alert-dialog-title">
          {"Project Deletion"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete this project?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose} className='border-2 border-blue-600  rounded-md px-3 py-1 text-md hover:bg-blue-600 transform duration-200 hover:text-white'>No</button>
          <button onClick={() => deleteBtnClickHandler(deleteProject)} autoFocus className='bg-red-500 p-2 rounded-md text-white hover:bg-red-800 transform duration-200'>
            Delete
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default MyProjectsPage;
