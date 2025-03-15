import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Home = () => {
  const Navigate = useNavigate();
  axios.defaults.withCredentials=true;
  const handleLogout = () => {
    axios.get('http://localhost:8000/auth/logout')
    .then(res => {
      if(res.data.status){
        Navigate('/login');
      }
      
    }).catch(error => {
      console.log(error);
    })
  }
  return (
    <div>Home
      <button ><Link to='/dashboard'>Dashboard</Link></button>
      <br />
      <br />
      <button onClick={handleLogout}>Log out</button>
    </div>
  )
}

export default Home