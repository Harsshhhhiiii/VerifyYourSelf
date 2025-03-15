import React from "react";
import "../App.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";



const ResetPassword = () => {
   
    const [password, SetPassword] = useState("");
    const {token}=useParams();
    
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post("http://localhost:8000/auth/resetpassword/"+token, {
       
        password,
      }).then((res) => {
        if(res.data.status)
  {
    navigate('/login');
  }   
  console.log(res.data);     
      }).catch((error) => {
          console.log(error);
      })
  
    };
  
    return (
      <div className="sign-up-container">
        <form className="sign-up-form" onSubmit={handleSubmit}>
          <h2>Reset Password</h2>
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            placeholder="********"
            onChange={(e) => SetPassword(e.target.value)}
          />
  
          <button type="submit">Reset</button>
          
        </form>
      </div>
    );
  };
  export default ResetPassword;