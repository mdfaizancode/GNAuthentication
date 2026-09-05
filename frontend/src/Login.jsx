import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import { handleError, handleSuccess } from "./validationError";
import {useGoogleLogin} from '@react-oauth/google';
import {googleAuth} from "./api.js";

function Login(){

    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: "" 
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        console.log(name, value);

        const copyloginInfo = { ...loginInfo };
        copyloginInfo[name] = value; 
        setLoginInfo(copyloginInfo);
    }

   const  handleLogin = async (e) =>{
    e.preventDefault();
    const { email, password } = loginInfo;
    if( !email || !password){  
        return handleError('Email , Password is Required!'); 
    }

    try{
        const url = "http://localhost:8080/auth/login";
        const response = await fetch(url,{
            method:"POST",
            headers:{
                'Content-type': 'application/json   '
            },
            body: JSON.stringify(loginInfo)
        });
        const result = await response.json();
        const {success , message , jwtToken,name,error} = result ; 
        if(success){
            handleSuccess(message);
            localStorage.setItem('user-info', JSON.stringify({
                name,
                email,      
                token: jwtToken
            }));
            setTimeout(()=>{
                navigate('/dashboard')
            },1000)

        }else if(error){
            const details = error?.details[0].message;
            handleError(details);
            
        }else if(!success){
            handleError(message);
        }
          console.log(result);
    }catch(error){
        handleError(error);
    }
  }

    const responseGoogle = async (authResult )=>{
        try{
            if(authResult["code"]){
                const result = await googleAuth(authResult['code']);
                const token = result.data.token;
                const {email, name, image} = result.data.user;
                console.log(result.data.user);
                console.log(token);
                const obj = {name, email, image, token };
                localStorage.setItem("user-info" , JSON.stringify(obj));
                navigate("/dashboard");
            }

        }catch(error){
            console.error("error is this-------" , error);
        }
    }

    const googleLogin =  useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: 'auth-code'
    })

    return(
        <div className="container">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
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
            <button>Login</button>
            <span>Don't have an account? <Link to="/SignUp">SignUp</Link></span>
            
        </form>

        <div className="App">
        <button onClick={()=>{googleLogin()}}>login with google</button>
        </div>

        <ToastContainer/>
        </div>
    )
}

export default Login;