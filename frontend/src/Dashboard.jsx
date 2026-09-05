import {useState} from "react";
import {useNavigate} from "react-router-dom";

function Dashboard(){

  const [userInfo] = useState(() => {
   const data = localStorage.getItem('user-info');
   return data ? JSON.parse(data) : null;
  });

   const navigate = useNavigate();

   const handleLogout = ()=>{
    localStorage.removeItem('user-info');
    navigate('/login');
   }

    return(
      <div>
        <h1>Welcome {userInfo?.name}</h1>
        <h3>Email: {userInfo?.email}</h3>
        <img src={userInfo?.image} alt={userInfo?.email}></img>
        <br></br>
        <button onClick={handleLogout} >Logout</button>
      </div>
    )
}
export default Dashboard;