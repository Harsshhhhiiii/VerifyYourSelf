import React,{useState} from 'react'
import "../App.css";
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom';

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    
    const navigate = useNavigate();
  
    axios.defaults.withCredentials=true;
  
    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post("http://localhost:8000/auth/forgotpassword", {
        
        email

      }).then((res) => {
        if(res.data.status)
        {
            alert("Check yout Email for Password Link")
             navigate('/login');
        }  
           
      }).catch((error) => {
          console.log(error);
      })
  
    };

  return (
    <div className="sign-up-container">
    <form className="sign-up-form" onSubmit={handleSubmit}>
      <h2>Forgot Password</h2>
   
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        autoComplete="off"
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
      />
    

      <button type="submit">Send</button>
     
    </form>
  </div>
  )
}

export default ForgotPassword;