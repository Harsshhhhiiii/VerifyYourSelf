import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom';


const Login = () => {

  const [email, setEmail] = useState("");
  const [password, SetPassword] = useState("");
  
  const navigate = useNavigate();

  axios.defaults.withCredentials=true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/auth/login", {
      
      email,
      password,
    }).then((res) => {
      if(res.data.status)
      {
           navigate('/');
      }       
    }).catch((error) => {
        console.log(error);
    })

  };

  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
     
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          autoComplete="off"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="********"
          onChange={(e) => SetPassword(e.target.value)}
        />

        <button type="submit">Login</button>
        <Link to='/forgotpassword'>Forgot Password ?</Link>
        <p>Doesn't have  an Account ? <Link to="/signup" > Sign Up</Link> </p> 
      </form>
    </div>
  );
};

export default Login;
