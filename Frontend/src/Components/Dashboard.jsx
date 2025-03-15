import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const Navigate = useNavigate();
    axios.defaults.withCredentials=true;
    useEffect(()=> {
        
        axios.get('http://localhost:8000/auth/verify')
        .then(res => {
            if(res.data.status){
                console.log(res.data);

            }else{
                Navigate('/');

            }
        })
        
    },[])
  return (
    <div>Here is the Dashboard</div>
  )
}

export default Dashboard;