import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import { handleError, handleSuccess } from "./validationError";

function SignUp(){

    const [signupInfo, setSignupInfo] = useState({
        name: "",
        email: "",
        password: "" 
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        console.log(name, value);

        const copysignupInfo = { ...signupInfo };
        copysignupInfo[name] = value; 
        setSignupInfo(copysignupInfo);
    }

   const  handleSignup = async (e) =>{
    e.preventDefault();
    const {name, email, password } = signupInfo;
    if(!name || !email || !password){  
        return handleError('Name , Email , Password is Required!'); 
    }

    try{
        const url = "http://localhost:8080/auth/SignUp";
        const response = await fetch(url,{
            method:"POST",
            headers:{
                'Content-type': 'application/json   '
            },
            body: JSON.stringify(signupInfo)
        });
        const result = await response.json();
        const {success , message, error, jwtToken, user } = result ; 
        if(success){
            handleSuccess(message);
            localStorage.setItem('user-info', JSON.stringify({
                ...user,
                token: jwtToken
            }));
            setTimeout(()=>{
                navigate('/dashboard')
            },1000)

        }else{
            const details = error?.details?.[0]?.message || message;
            handleError(details);
        }
          console.log(result);
    }catch(error){
        handleError(error);
    }
  }

    return(
        <div className="auth-container">
        <h1>SignUp</h1>
        <form onSubmit={handleSignup}>
            <div>
                <label htmlFor="name"> Name</label>
                <input
                onChange={handleChange}
                type="text"
                placeholder="Enter your name...."
                name="name"
                autoFocus
                />
            </div>
            <div>
                <label htmlFor="email"> Email</label>
                <input
                onChange={handleChange}
                type="email"
                placeholder="Enter your email...."
                name="email"
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                onChange={handleChange}
                type="password"
                placeholder="Enter your password...."
                name="password"
                />
            </div>
            <button className="auth-button"> SignUp</button>
            <span>Already have an account? <Link to="/login">Login</Link></span>
        </form>
        <ToastContainer/>
        </div>
    )
}

export default SignUp;