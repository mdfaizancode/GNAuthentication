import {useNavigate} from 'react-router-dom';
function PageNotFound(){
    const navigate = useNavigate();
    return(
        <>
        <h2>404 Page Not Found</h2>
        <button onClick={()=>{navigate('/login')}}>Login</button>
        </>
    )
}

export default PageNotFound;