import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "./validationError";
import { ToastContainer } from "react-toastify";

function Home(){
    const [loggedInUser] = useState(() => localStorage.getItem('loggedInUser') || '');

   const navigate = useNavigate();
    const handleLogout = ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User LoggedOut ');
        setTimeout(()=>{
            navigate('/login');
        },1000)

    }
    return(
        <div>
         <h1>{loggedInUser}</h1>
         <button onClick={handleLogout}>Logout</button>
         <ToastContainer/>
        </div>
    )
}

export default Home;