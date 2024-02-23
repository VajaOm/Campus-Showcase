import React,{useState} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

export default function Home() {

  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate()

  const click = async () => {
    try {
      const res = await axios.get("http://localhost:5000/user/logout", {
        withCredentials:true
      });

      console.log("log out message .............", res.data.message);

      if(res.status == 200) {
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={click}>Logout</button>
    </div>
  )
}
